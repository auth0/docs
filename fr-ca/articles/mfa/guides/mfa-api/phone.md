---
title: Enroll and Challenge SMS or Voice Authenticators
description: Build your own MFA flows using SMS or Voice as a factor.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - sms
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge SMS or Voice Authenticators

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it. 

::: warning
Voice MFA is currently a Beta feature. It should not be used in production environments.
::: 

This guide explains how to enroll and challenge users with SMS or a voice call using the MFA API. First, make sure that Phone is [enabled as factor](/mfa/guides/configure-phone) in the Dashboard or using the [Management API](/api/management/v2#!/Guardian/put_factors_by_name).

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with SMS or Voice

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

<%= include('../../_includes/_request_association') %>

When a user enrolls with Voice or SMS, they are actually enrolling a phone number that can be challenged either with SMS or Voice.

You need to specify the parameters below to call the endpoint. The `oob_channels` parameter indicates how you want to send the code to the user (SMS or Voice):

- `authentication_types` = `[oob]`
- `oob_channels` = `[sms]` or `[voice]`.
- `phone_number` = `+11...9`, the phone number [E.164 format](https://en.wikipedia.org/wiki/E.164)

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [
    { "name": "Authorization", "value": "Bearer MFA_TOKEN" },
    { "name": "Content-Type", "value": "application/json" }
  ],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"sms\"], \"phone_number\": \"+11...9\" }"
	}
}
```

If successful, you'll receive a response like the one below:

```json
{
  "authenticator_type": "oob",
  "binding_method": "prompt",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ],
  "oob_channels": "sms",
  "oob_code": "ata6daXAiOi..."
}
```

If you get a `User is already enrolled error`, it is because the user already has an MFA factor enrolled. Before associating it with another factor, you need to challenge the user with the existing one.

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the SMS or Voice enrollment

Users should receive an message with a 6-digit code that they need to provide to the application.

To complete enrollment, make a `POST` request to the `oauth/token` endpoint. You need to include the `oob_code` returned in the previous response, and the `binding_code` with the value received in the message.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Authorization", "value": "Bearer MFA_TOKEN" },
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
        "value": "YOUR_CLIENT_SECRET"
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
        "value": "USER_OTP_CODE"
      }
    ]
	}
}
```

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with SMS or Voice

To challenge a user with SMS or Voice, follow the steps detailed below.

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token_challenge') %>

### 2. Retrieve the enrolled authenticators

To be able to challenge the user, you need the `authenticator_id` for the factor you want to challenge. You can list all enrolled authenticators by using the `/mfa/authenticators` endpoint:

```har
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
        "id": "sms|dev_NU1Ofuw3Cw0XCt5x",
        "authenticator_type": "oob",
        "active": true,
        "oob_channels": "sms",
        "name": "XXXXXXXX8730"
    },
        {
        "id": "voice|dev_NU1Ofuw3Cw0XCt5x",
        "authenticator_type": "oob",
        "active": true,
        "oob_channels": "voice",
        "name": "XXXXXXXX8730"
    }
]
```

Note that you have two authenticators with different `authenticator_id` for Voice or SMS. 

### 3. Challenge the user with SMS or Voice

To trigger the challenge, `POST` to the to `mfa/challenge` endpoint, using the corresponding `authenticator_id` and the MFA Access Token.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\",  \"client_secret\": \"YOUR_CLIENT_SECRET\", \"challenge_type\": \"oob\", \"authenticator_id\": \"sms|dev_NU1Ofuw3Cw0XCt5x\", \"mfa_token\": \"MFA_TOKEN\" }"
	}
}
```

### 4. Complete authentication using the received code

If successful, you'll receive the following response, and the user will get a message containing the required six-digit code:

```json
{
  "challenge_type": "oob",
  "oob_code": "asdae35fdt5...",
  "binding_method": "prompt"
}
```

Your application needs to prompt the user for 6-digit code sent in the message, and should be set in the `binding_code` parameter.

You can then verify the code and get the authentication tokens using the `/oauth/token` endpoint, using the `binding_code` and the `oob_code` returned by the previous call:

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
        "value": "YOUR_CLIENT_SECRET"
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
        "value": "USER_OTP_CODE"
      }
    ]
  }
}
```

<%= include('../../_includes/_successful_challenge') %>

## Keep reading

* [Configure SMS or Voice Notifications for MFA](/mfa/guides/configure-phone)
* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
* [Enroll and Challenge Push Authenticators](/mfa/guides/mfa-api/push)
* [Enroll and Challenge OTP Authenticators](/mfa/guides/mfa-api/otp)
* [Enroll and Challenge Email Authenticators](/mfa/guides/mfa-api/email)
* [Challenge a Recovery Code](/mfa/guides/mfa-api/recovery-code)
