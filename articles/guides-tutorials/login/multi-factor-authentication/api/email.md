---
title: Associate an Email Authenticator
description: Configure your application so users can self-associate email authenticators.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - email
contentType:
  - how-to
useCase:
  - customize-mfa
---

# Associate an Email Authenticator

In this tutorial, you'll learn how to configure your application so users can use email authenticators.

::: note
Currently, email authenticators are only supported by the <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> API or when using the [New Universal Login Experience](/universal-login/new). It's not supported in the Classic Universal Login experience.
:::

<%= include('./_includes/_authenticator-before-start') %>

## 1. Enable email authenticators with the Management API

Start by enabling email authenticators with the [Management API](/api/management). To do this, make a `PUT` request to the [/api/v2/guardian/factors/email](/api/management/v2/#!/Guardian/put_factors_by_name) endpoint. You'll need a [Management API Token](/api/management/v2/tokens) with the `update:guardian_factors` <dfn data-key="scope">scope</dfn> to perform the request:

```har
{
  "method": "PUT",
  "url": "https://${account.namespace}/api/v2/guardian/factors/email",
  "headers": [
    { "name": "Authorization", "value": "Bearer MANAGEMENT_API_TOKEN" },
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"enabled\": true }"
  }
}
```

You can also enable this factor in in the Multi-factor Authentication section in the [Auth0 Dashboard](${manage_url}/#/mfa).

## 2. Get the MFA Token

When a user begins the authorization process without an active authenticator associated with their account, they will trigger the an `mfa_required` error when calling the `/oauth/token` endpoint. For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
        {
          "name": "grant_type",
          "value": "password"
        },
        {
          "name": "username",
          "value": "user@example.com"
        },
        {
          "name": "password",
          "value": "pwd"
        },
        {
          "name": "audience",
          "value": "https://someapi.com/api"
        },
        {
          "name": "scope",
          "value": "read:sample"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "client_secret",
          "value": "YOUR_CLIENT_SECRET"
        }
    ]
  }
}
```

The `mfa_required` error will look like this:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```

In the next step, you can use the `mfa_token` value to request association of a new authenticator.

## 3. Request association of the authenticator

Next, make a `POST` request to the `/mfa/associate` endpoint to request association of your authenticator. Remember to use the MFA token from the previous step.

To associate an authenticator where the challenge type is an email containing a code the user provides, make the following `POST` request to the `/mfa/associate` endpoint. Be sure to replace the placeholder values in the example below as appropriate.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/mfa/associate",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer MFA_TOKEN"
    }],
    "postData": {
        "mimeType": "application/json",
        "text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"email\"]}"
    }
}
```

If successful, you'll receive a response like this:

```json
{
  "authenticator_type": "oob",
  "oob_channel": "email",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ]
}
```

Next the user should receive an email containing the 6-digit code, which they can provide to the application. To complete enrollment of the email authenticator, make a `POST` request to the `/oauth/token` endpoint and include the provided code as the `binding_code`. Be sure to replace the placeholder values shown below as appropriate.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "postData": {
        "mimeType": "application/x-www-form-urlencoded",
        "params": [
          {
            "name": "grant_type",
            "value": "http://auth0.com/oauth/grant-type/mfa-oob"
          },
          {
            "name": "mfa_token",
            "value": "YOUR_MFA_TOKEN"
          },
          {
            "name": "oob_code",
            "value": "ata...i0i"
          },
          {
            "name": "binding_code",
            "value": "000000"
          },
          {
            "name": "client_id",
            "value": "${account.clientId}"
          }
        ]
    }
}
```


For more information on how to customize the email template, check out [Customizing Your Emails](/email/templates).

### Recovery Codes

If this is the first time you're associating an authenticator, you'll notice your response includes `recovery_codes`. This is used to access your account in the event that you lose access to the account or device used for your second factor authentication. These are one-time usable codes, and new ones are generated as necessary.

## 4. Trigger a challenge and verify the authenticator

With the email authenticator associated, it can be used for MFA challenges during authentication.

For example, after receiving the `mfa_required` error, make a `POST` request to the `/mfa/challenge` endpoint with the `mfa_token` value:

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/mfa/challenge",
    "postData": {
        "mimeType": "application/json",
        "text": "{ \"mfa_token\": \"Fe26.2**05...\", \"challenge_type\": \"oob\", \"authenticator_id\": \"email|dev_s...O\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}" }
}
```

If successful, you'll get the following response:

```json
{
  "challenge_type": "oob",
  "oob_code": "abcd1234...",
  "binding_method": "prompt"
}
```

Next, your application needs to prompt the user for the `binding_code` and send it as part of the request. The `binding_code` is a 6-digit number included in the challenge.

Then you can verify the multifactor authentication using the `/oauth/token` endpoint:

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "postData": {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "http://auth0.com/oauth/grant-type/mfa-oob"
        },
        {
          "name": "mfa_token",
          "value": "YOUR_MFA_TOKEN"
        },
        {
          "name": "oob_code",
          "value": "ata...i0i"
        },
        {
          "name": "binding_code",
          "value": "000000"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        }
      ]
    }
}
```

After verifying the code, proceed with authentication as usual.
