---
title: Enroll and Challenge Push Authenticators
description: Build your own MFA flows using Push as a factor.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge Push using Guardian

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it.

This guide explains to enroll and challenge users using Push Notifications with the Guardian Application or SDK, using the MFA API. First, make sure that Push is [enabled as factor](/mfa/guides/configure-push) in the Dashboard or using the [Management API](/api/management/v2#!/Guardian/put_factors_by_name).

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with Push

### 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

<%= include('../../_includes/_request_association') %>

To enroll with Push, you need to use the following parameters:

- `authentication_types` = `[oob]`
- `oob_channels` = `[auth0]`

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
		"text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"auth0\"] }"
	}
}
```

If successful, you'll receive a response like the one below:

```json
{
    "authenticator_type": "oob",
    "barcode_uri": "otpauth://totp/tenant:user?enrollment_tx_id=qfjn2eiNYSjU3xID7dBYeCBSrdREWJPY&base_url=tenan",
    "recovery_codes": [
        "ALKE6EJZ4853BJYLM2DM2WU7"
    ],
    "oob_channels": "auth0",
    "oob_code": "Fe26.2...SYAg"
}
```

If you get a `User is already enrolled error`, the user already has an MFA factor enrolled. Before associating another factor with the user, you need to challenge the user with the existing factor.

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the Push enrollment

To confirm the enrollment, the end user will need to scan the a QR code with the `barcode_uri` in the Guardian App. Once that is done the Guardian App will notify Auth0 that the user enrolled successfully. To know if that happened, you need to poll the `/oauth/token` endpoint with the `oob_code` returned by the `/associate` call:

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
      }
    ]
	}
}
```

If the user did has not scanned the code, it will return an `authorization_pending` response, indicating you need to call `oauth_token` again in a few seconds:

```json
{
    "error": "authorization_pending",
    "error_description": "Authorization pending: please repeat the request in a few seconds."
}
```

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with Push

To challenge a user with Push, follow the steps detailed below.

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
        "id": "recovery-code|dev_Ahb2Tb0ujX3w7ilC",
        "authenticator_type": "recovery-code",
        "active": true
    },
    {
        "id": "push|dev_ZUla9SQ6tAIHSz6y",
        "authenticator_type": "oob",
        "active": true,
        "oob_channels": "auth0",
        "name": "user's device name"
    },
    {
        "id": "totp|dev_gJ6Y6vpSrjnKeT67",
        "authenticator_type": "otp",
        "active": true
    }
]
```

Note that when users enroll with Push, they also get enrolled in OTP, as Guardian supports [challenging with OTP](/mfa/guides/mfa-api/otp/#challenging-with-otp) for scenarios where the user does not have connectivity.  

### 3. Challenge the user with Push

To trigger an Push challenge, `POST` to the to `mfa/challenge` endpoint, using the corresponding `authenticator_id` ID and the `mfa_token`. 

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\",  \"client_secret\": \"YOUR_CLIENT_SECRET\", \"challenge_type\": \"oob\", \"authenticator_id\": \"push|dev_ZUla9SQ6tAIHSz6y\", \"mfa_token\": \"MFA_TOKEN\" }"
	}
}
```

### 4. Complete authentication using the received code

If successful, you'll receive the following response, and the user will get an Push notification:

```json
{
    "challenge_type": "oob",
    "oob_code": "Fe26...jGco"
}

```

Your application needs to start polling the `/oauth/token` endpoint until the user accepts the Push notification. If the endpoint returns `

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
      }
    ]
  }
}
```

This call can return one of the following results:

- `authorization_pending` error: if the challenge has not been accepted nor rejected.
- `slow_down` error: if the polling is too frequent.
- an `access_token` and a `refresh_token`: if the challenge has been accepted; polling should be stopped at this point.
- `invalid_grant` error: if the challenge has been rejected; polling should be stopped at this point.

## Keep Reading

* [Configure Push Notifications for MFA](/mfa/guides/configure-push)
* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
* [Enroll and Challenge SMS Authenticators](/mfa/guides/mfa-api/sms)
* [Enroll and Challenge OTP Authenticators](/mfa/guides/mfa-api/otp)
* [Enroll and Challenge Email Authenticators](/mfa/guides/mfa-api/email)
* [Challenge a Recovery Code](/mfa/guides/mfa-api/recovery-code)
