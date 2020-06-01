---
title: Enroll and Challenge Email Authenticators
description: Build your own MFA flows using email as a factor.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - email
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge SMS Authenticators

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it. 

This guide will explain how to enroll and challenge users with Email using the MFA API. Make sure that Email is [enabled as factor](/mfa/guides/configure-email-universal-login) in the Dashboard or using the [Management API](/api/management/v2#!/Guardian/put_factors_by_name).


::: note
When Email is enabled as factor, all users with verified emails will be able to use them to complete MFA.

Email authenticators are not supported when using the Classic Universal Login experience.
:::

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with Email

If you want to enable users enroll additional emails, in addition of the one in their primary identity, you need to complete the following steps.

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

To enroll with SMS, you need to use the following parameters:

- `authentication_types` = `[oob]`
- `oob_channels` = `[email]`
- `email` = `email@address.com`, the user's email address.

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
          "text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"email\"], \"email\" : \"email@address.com\" }"
      }
  }
  ```

  If successful, you'll receive a response like this:

  ```json
  {
    "authenticator_type": "oob",
    "binding_method": "prompt",

    "oob_channel": "email",
    "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ]
  }
  ```

If you get a `User is already enrolled error`, is because the user already has an MFA factor enrolled. Before associating it another factor, you need challenge the user with the existing one.

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the email enrollment

4. The user should receive an email containing the 6-digit code, which they can provide to the application.

 To complete enrollment of the email authenticator make a `POST` request to the `oauth/token` endpoint. You need to include the `oob_code` returned in the previous response, and the `binding_code` with the value received in the email message.

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
              "value": "MFA_TOKEN"
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

  For more information on how to customize the email template, w [Customizing Your Emails](/email/templates).

::: panel Recovery Codes

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with Email

To challenge a user with Email, follow the steps detailed below.

### 1. Get the MFA token

You can get the MFA token in [the same way](#1-get-the-mfa-token) you do it for enrollment.

### 2. Retrieve the enrolled authenticators

To be able to challenge the user, you need the `authenticator_id` for the factor you want to challenge. You can list all enrolled authenticators by using the `/mfa/authenticators` endpoint:

```
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
  "headers": [
    { "name": "Authorization", "value": "Bearer MFA_TOKEN" },
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ]
}
```

You will get a list of authenticators with the format below:

```json
[
    {
        "id": "recovery-code|dev_O4KYL4FtcLAVRsCl",
        "authenticator_type": "recovery-code",
        "active": true
    },
    {
        "id": "email|dev_NU1Ofuw3Cw0XCt5x",
        "authenticator_type": "oob",
        "active": true,
        "oob_channel": "email",
        "name": "email@address.com"
    },
]
```

### 3. Challenge the user with Email

To trigger an email challenge,  `POST` to the to `mfa/challenge` endpoint, using the corresponding `authenticator_id` ID and the `mfa_token`. 

```
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\",  \"client_secret\": \"YOUR_CLIENT_SECRET\", \"challenge_type\": \"oob\", \"authenticator_id\": \"email|dev_NU1Ofuw3Cw0XCt5x\", \"mfa_token\": \"MFA_TOKEN" }"
	}
}
```

### 4. Complete authentication using the received code

If successful, you'll get the following response, and the user will get an email message containing the six-digit code:

  ```json
  {
    "challenge_type": "oob",
    "oob_code": "abcd1234...",
    "binding_method": "prompt"
  }
  ```

Your application needs to prompt the user for the `binding_code` and send it as part of the request. The `binding_code` is a 6-digit number included in the challenge.

You can then verify the code and get the authentication tokens using the `/oauth/token` endpoint:

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
        "value": "http://auth0.com/oauth/grant-type/mfa-oob"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "CLIENT_SECRET"
      },
      {
        "name": "mfa_token",
        "value": "MFA_TOKEN"
      },
      {
        "name": "oob_code",
        "value": "OOB_CODE"
      },
      {
        "name": "binding_code",
        "value": "CODE_RECEIVED_BY_THE_USER"
      }
    ]
  }
}
```
