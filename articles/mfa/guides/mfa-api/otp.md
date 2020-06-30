---
title: Enroll and Challenge OTP Authenticators
description: Build your own MFA flows using OTP as a factor.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - otp
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge OTP Authenticators

Auth0 provides a built-in MFA enrollment and authentication flow using [Universal Login](/universal-login). However, if you want to create your own user interface, you can use the MFA API to accomplish it. 

This guide explains how to enroll and challenge users with OTP using the MFA API. First, make sure that OTP is [enabled as factor](/mfa/guides/configure-otp) in the Dashboard or using the [Management API](/api/management/v2#!/Guardian/put_factors_by_name).

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with OTP

### 1. Get the MFA Token

<%= include('../../_includes/_get_mfa_token') %>

### 2. Enroll the Authenticator 

<%= include('../../_includes/_request_association') %>

To enroll with OTP you need to set the `authenticator_types` parameter to `[otp]`.

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
		"text": "{ \"authenticator_types\": [\"otp\"] }"
	}
}
```

If successful, you'll receive a response like this:

```json
{
  "authenticator_type": "otp",
  "secret": "EN...S",
  "barcode_uri": "otpauth://totp/tenant:user?secret=...&issuer=tenant&algorithm=SHA1&digits=6&period=30",
  "recovery_codes": [ "N3B...XC"]
}
```

If you get a `User is already enrolled error`, the user already has an MFA factor enrolled. Before associating another factor with the user, you need to challenge the user with the existing factor.

#### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

### 3. Confirm the OTP enrollment

To confirm the enrollment, the end user will need to enter the secret obtained in the previous step in an OTP generator application like Google Authenticator. They can enter the secret by scanning a QR code with the `barcode_uri` or by typing the `secret` code manually in that OTP application. You should provide users a way to get the `secret` as text in case they cannot scan the QR code (e.g. if they are enrolling from a mobile device, or using a desktop OTP application).

After the users enter the secret, the OTP application will display a 6-digit code, that the user should enter in your application. The application should then make a `POST` request to the `oauth/token` endpoint, including that `otp` value.

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
        "value": "http://auth0.com/oauth/grant-type/mfa-otp"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "mfa_token",
        "value": "MFA_TOKEN"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "otp",
        "value": "USER_OTP_CODE"
      }
    ]
	}
}
```

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with OTP

To challenge a user with OTP, follow the steps detailed below.

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
        "id": "recovery-code|dev_qpOkGUOxBpw6R16t",
        "authenticator_type": "recovery-code",
        "active": true
    },
    {
        "id": "totp|dev_6NWz8awwC8brh2dN",
        "authenticator_type": "otp",
        "active": true
    }
]
```

### 3. Challenge the user with OTP

To trigger an OTP challenge, `POST` to the to `mfa/challenge` endpoint, using the corresponding `authenticator_id` ID and the `mfa_token`. 

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\", \"challenge_type\": \"otp\", \"mfa_token\": \"MFA_TOKEN\", \"authenticator_id\" : \"totp|dev_6NWz8awwC8brh2dN\" }"
	}
}
```

### 4. Complete authentication using the received code

If successful, you'll receive the following response: 

```json
{
  "challenge_type": "otp"
}
```

The user will collect a one-time password, which you will then collect from them. You can the  verify the code and get authentication tokens using the `/oauth/token` endpoint, specifying the one-time password in the `otp` parameter:

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
        "value": "http://auth0.com/oauth/grant-type/mfa-otp"
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
        "name": "otp",
        "value": "USER_OTP_CODE"
      }
    ]
  }
}
```

<%= include('../../_includes/_successful_challenge') %>

## Keep Reading

* [Configure One-Time Passwords for MFA](/mfa/guides/configure-otp)
* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
* [Enroll and Challenge Push Authenticators](/mfa/guides/mfa-api/push)
* [Enroll and Challenge SMS or Voice Authenticators](/mfa/guides/mfa-api/phone)
* [Enroll and Challenge Email Authenticators](/mfa/guides/mfa-api/email)
* [Challenge a Recovery Code](/mfa/guides/mfa-api/recovery-code)
