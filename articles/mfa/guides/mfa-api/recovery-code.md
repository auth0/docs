---
description: Use the MFA API to challenge users who lose access to their device or account using recovery codes.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - recovery-codes
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Challenge with Recovery Codes

Auth0 automatically generates recovery codes when users enroll with MFA. These codes can be used when users lost access to the device or account they used to enroll MFA.

This guide explains how to enable users to authenticate using a recovery code using the MFA API.

## 1. Prompt the user for the recovery code

When the user enrolls with MFA, Auth0 generates a recovery code, that the user should capture. That value should be entered in the application for the user to authenticate. 

::: note
Auth0 does not generate recovery codes for DUO and for the legacy `google-authenticator` factor.
:::

## 2. Authenticate using the Recovery Code

Call the `/oauth/token` endpoint with the recovery code to authenticate and generate a new recovery code. You need to specify the following parameters:

- `grant_type` : `http://auth0.com/oauth/grant-type/mfa-recovery-code`
- `recovery_code` : the recovery code provided by the user

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
        "value": "http://auth0.com/oauth/grant-type/mfa-recovery-code"
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
        "name": "recovery_code",
        "value": "RECOVERY_CODE"
      }
    ]
  }
}
```

### 3. Ask the user to capture the new Recovery Code

If the call is successful, you'll get the authentication tokens and a new recovery code:

```json
{
    "access_token": "O3...H4",
    "id_token": "eyJh...w",
    "scope": "openid profile",
    "expires_in": 86400,
    "recovery_code": "K6LGLV3RSH3VERMKET8L7QKU",
    "token_type": "Bearer"
}
```

You should let the user know that a new recovery code was generated and ask them to capture it.

* [Managing MFA Enrollments](/mfa/guides/mfa-api/manage)
* [Enroll and Challenge Push Authenticators](/mfa/guides/mfa-api/push)
* [Enroll and Challenge OTP Authenticators](/mfa/guides/mfa-api/otp)
* [Enroll and Challenge SMS Authenticators](/mfa/guides/mfa-api/sms)
* [Enroll and Challenge Email Authenticators](/mfa/guides/mfa-api/email)
