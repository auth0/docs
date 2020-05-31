---
title: Enroll and Challenge SMS Authenticators
description: Build your own enrollment flow with SMS messages.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - oob
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge SMS Authenticators

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it. 

This guide will explain how to enroll and challenge users with SMS.

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with SMS

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

<%= include('../../_includes/_request_association') %>

To enroll with SMS, you need to use the following parameters:

- `authentication_types` = `[oob]`
- `oob_channels` = `[sms]`
- `phone_number` = `+11...9`, the phone number [E.164 format](https://en.wikipedia.org/wiki/E.164)

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
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
  "oob_channel": "<message_type>",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ],
  "oob_code": "ata6daXAiOi..."
}
```

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the authenticator enrollment

To confirm the association of an phone messaging authenticator, make a `POST` request to the `oauth/token` endpoint. You need to include the `oob_code` returned previously as a parameter in the request, and the `binding_code` with the value received by in the SMS message.

Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
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

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with SMS

To challenge a user with SMS, follow the steps detailed below.

### 1. Get the MFA token

You can get the MFA token in [the same way](#1-get-the-mfa-token) you do it for enrollment.

### 2. Retrieve the enrolled authenticators

To be able to challenge the user, you need the `authenticator_id` for the factor you want to challenge. You can list all enrolled authenticators by using the `/mfa/authenticators` endpoint:

```
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
  "headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
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
        "oob_channel": "sms",
        "name": "XXXXXXXX8730"
    },
]
```

### 2. Challenge the user with SMS

To trigger an OOB challenge, make the appropriate `POST` call to `mfa/challenge`, using the corresponding `authenticator_id` ID and the `mfa_token`. The `client_secret` is required for server-side applications.

```
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\",  \"client_secret\": \"YOUR_CLIENT_SECRET\", \"challenge_type\": \"oob\", \"authenticator_id\": \"sms|dev_NU1Ofuw3Cw0XCt5x\", \"mfa_token\": \"MFA_TOKEN" }"
	}
}
```

### 3. Complete authentication using the received code

If successful, you'll receive the following response, as well as an SMS message containing the required six-digit code:

```json
{
  "challenge_type": "oob",
  "oob_code": "asdae35fdt5...oob_code_redacted",
  "binding_method": "prompt"
}
```

Proceed with the authentication process using `/oauth/token` as usual, sending the `oob_code` as a parameter in the request.

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