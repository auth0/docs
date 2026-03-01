---
title: Authenticate With Resource Owner Password Grant and MFA
description: Authenticate With Resource Owner Password Grant and MFA
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
# Authenticate With Resource Owner Password Grant and MFA

This guide explains how to use the MFA API to complete the authentication flow using [Resource Owner Password Grant](/api-auth/tutorials/password-grant) when MFA is enabled.

<%= include('../../_includes/_authenticator-before-start') %>

## 1. Authenticate the User

When you use the Resource Owner Password Grant to authenticate, you call the `/oauth/token` endpoint with the user's username/password: 

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
        "name": "client_id",
        "value": "${account.clientId}"
    },
    {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
    },
    {
        "name": "audience",
        "value": "https://someapi.com/api"
    },
    {
        "name": "scope",
        "value": "openid profile read:sample"
    }
    ]
}
}
```

When MFA is enabled, the response will include an `mfa_required` error and a `mfa_token`.

```json
{
    "error": "mfa_required",
    "error_description": "Multifactor authentication required",
    "mfa_token": "Fe26...Ha"
}
```

## 2. Retrieve the Enrolled Authenticators

After getting the error above, you need to find out if the user has an MFA factor enrolled or not. Call [`/mfa/authenticators`](/mfa/guides/mfa-api/manage#list-authenticators) endpoint, using the MFA token obtained in the previous step.

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

You will get an array with the available authenticators. The array will be empty if the user did not enroll any factor.

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
        "oob_channels": "email",
        "name": "email@address.com"
    }
]
```

## 3. Enroll an MFA Factor

If the user is not enrolled in MFA, use the MFA token obtained earlier, and enroll it using the `/mfa/associate` endpoint. The documents linked below explain how to implement this flow depending on the authentication factor:

- [Enrolling with SMS or Voice](/mfa/guides/mfa-api/phone#enrolling-with-sms-or-voice)
- [Enrolling with OTP](/mfa/guides/mfa-api/otp#enrolling-with-otp)
- [Enrolling with Push](/mfa/guides/mfa-api/push#enrolling-with-push)
- [Enrolling with Email](/mfa/guides/mfa-api/email#enrolling-with-email)

## 4. Challenge the User with MFA

If the user is already enrolled in MFA, you need to challenge the user with one of the existing factors. Use the `authenticator_id` returned by the `/mfa/authenticators` endpoint when calling the `/mfa/challenge` endpoint. 

After the challenge is completed, call `/oauth/token` again to finalize the authentication flow and get the authentication tokens. 

The documents linked below explain how to implement this flow depending on the authentication factor:

- [Challenging with SMS](/mfa/guides/mfa-api/phone#challenging-with-sms-or-voice)
- [Challenging with OTP](/mfa/guides/mfa-api/otp#challenging-with-otp)
- [Challenging with Push](/mfa/guides/mfa-api/push#challenging-with-push)
- [Challenging with Email](/mfa/guides/mfa-api/email#challenging-with-email)
- [Challenging with Recovery Code](/mfa/guides/mfa-api/recovery-code)

## Keep reading

* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
