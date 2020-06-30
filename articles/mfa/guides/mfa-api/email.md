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
# Enroll and Challenge Email Authenticators

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it. 

This guide will explain how to enroll and challenge users with Email using the MFA API. Make sure that Email is [enabled as factor](/mfa/guides/configure-email) in the Dashboard or using the [Management API](/api/management/v2#!/Guardian/put_factors_by_name).


::: note
When Email is enabled as factor, all users with verified emails will be able to use them to complete MFA.

Email authenticators are not supported when using the Classic Universal Login experience.
:::

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with Email

If you want to enable users enroll additional emails, in addition of the verified email in their primary identity, you need to complete the following steps.

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

To enroll with Email, you need to use the following parameters:

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
    "oob_code" : "Fe26..nWE",
    "oob_channel": "email",
    "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ]
  }
  ```

If you get a `User is already enrolled error`, the user already has an MFA factor enrolled. Before associating another factor with the user, you need to challenge the user with the existing factor.

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the email enrollment

The user should receive an email containing the 6-digit code, which they can provide to the application.

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
            "value": "OOB_CODE"
          },
          {
            "name": "binding_code",
            "value": "USER_EMAIL_OTP_CODE"
          },
          {
            "name": "client_id",
            "value": "${account.clientId}"
          }
        ]
    }
}
```

For more information on how to customize the email that users get, check [Customizing Your Emails](/email/templates).

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with Email

To challenge a user with Email, follow the steps detailed below.

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token_challenge') %>

### 2. Challenge the user with Email

To challenge the user you first need to obtain the id of the authenticator you want to challenge using the [`/mfa/enrollments`](/mfa/guides/mfa-api/manage#list-authenticators) endpoint.

To trigger an email challenge, `POST` to the to `mfa/challenge` endpoint, using the corresponding `authenticator_id` ID and the `mfa_token`. 

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{  \"client_id\": \"YOUR_CLIENT_ID\",  \"client_secret\": \"YOUR_CLIENT_SECRET\",  \"challenge_type\": \"oob\",  \"authenticator_id\": \"email|dev_NU1Ofuw3Cw0XCt5x\", \"mfa_token\": \"MFA_TOKEN\" }"
	}
}
```

### 3. Complete authentication using the received code

If successful, you'll get the following response, and the user will get an email message containing the six-digit code:

```json
{
  "challenge_type": "oob",
  "oob_code": "abcd1234...",
  "binding_method": "prompt"
}
```

Your application needs to prompt the user for the code, and send it as part of the request, in the `binding_code` parameter, in the following call to the `/oauth/token` endpoint:

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
        "value": "USER_EMAIL_OTP_CODE"
      }
    ]
  }
}
```

<%= include('../../_includes/_successful_challenge') %>

## Keep Reading

* [Configure Email Notifications for MFA](/mfa/guides/configure-email)
* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
* [Enroll and Challenge Push Authenticators](/mfa/guides/mfa-api/push)
* [Enroll and Challenge OTP Authenticators](/mfa/guides/mfa-api/otp)
* [Enroll and Challenge SMS Authenticators](/mfa/guides/mfa-api/sms)
* [Challenge a Recovery Code](/mfa/guides/mfa-api/recovery-code)
