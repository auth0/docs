---
title: Associate a One-Time Password Authenticator
description: Configure your application so users can self-associate one-time password (OTP) authenticators.
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

# Associate a One-Time Password Authenticator

In this tutorial, you'll learn how to configure your application so users can self-associate one-time password (OTP) authenticators.

<%= include('./_includes/_authenticator-before-start') %>

## 1. Get the MFA Token

<%= include('./_includes/_get_mfa_token') %>

## 2. Request association of the authenticator

<%= include('./_includes/_request_association') %>

To associate an authenticator where the challenge type is an OTP code the user provides, make the following `POST` request to the `/mfa/associate` endpoint. This will both trigger an MFA challenge for the user and associate the new authenticator. 

Be sure to replace the placeholder values in the payload body shown below as appropriate.

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
		"text": "{ \"authenticator_types\": [\"otp\"] }"
	}
}
```

If successful, you'll receive a response like this:

```json
{
  "authenticator_type": "otp",
  "secret": "EN...S",
  "barcode_uri": "otpauth...period=30",
  "recovery_codes": [ "N3B...XC"]
}
```

In the next step, you'll need the one-time password (`otp`), which can be obtained by using the `barcode_uri` to generate a QR code that can be scanned by the OTP generator of your choice (such as Google Authenticator). Once the user scans that QR code, they will be able to obtain the OTP code.

You might also consider displaying the `secret` in plain text so that your users can copy and paste it directly into the OTP generator (this is especially helpful for users on desktop applications).

### Recovery Codes

<%= include('./_includes/_recovery_codes') %>

## 3. Confirm the authenticator association

Once the authenticator is associated, **it must be used at least once to confirm the association**.

To confirm the association of an authenticator using OTP, make a `POST` request to the `oauth/token` endpoint, including the `otp` value that is collected from the user after they have set up their OTP generator. 

Be sure to replace the placeholder values in the payload body shown below as appropriate.

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
        "value": "YOUR_MFA_TOKEN"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      },
      {
        "name": "otp",
        "value": "000000"
      }
    ]
	}
}
```

<%= include('./_includes/_successful_confirmation') %>