---
title: Associate a One-Time Password Authenticator
description: Configure your application so users can self-associate one-time password (OTP) authenticators.
tags:
  - mfa
  - mfa-api
  - mfa-authenticators
  - otp
---

# Associate a One-Time Password Authenticator

In this tutorial, you'll learn how to configure your application so users can self-associate one-time password (OTP) authenticators.

<%= include('./_authenticator-before-start') %>

## 1. Get the MFA Token

When a user begins the authorization process without an active authenticator associated with their account, they will trigger the an `mfa_required` error when calling the `/oauth/token` endpoint. For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://someapi.com/api\", \"scope\": \"read:sample\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}"
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

In the next step, use the `mfa_token` value instead of the standard Access Token to request association of a new authenticator.

## 2. Request association of the authenticator

Next, make a `POST` request to the `/mfa/associate` endpoint to request association of your authenticator. Remember to use the `mfa_token` from the previous step.

To associate an authenticator where the challenge type is an OTP code the user provides, make the following `POST` request to the `/mfa/associate` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ACCESS_TOKEN"
	}],
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

In the next step, you'll need the one-time password (`otp`), which can be obtained by using the `barcode_uri` to generate a QR code that can be scanned by the OTP generator of your choice (such as Guardian).

You might also consider displaying the `secret` in plain text so that your users can copy and paste it directly into the OTP generator (this is especially helpful for users on desktop applications).

### Recovery Codes

If this is the first time you're associating an authenticator, you'll notice that your response includes `recovery_codes`. This is used to access your account in the event that you lose access to the account or device used for your second factor authentication. These are one-time usable codes, and new ones are generated as necessary.

## 3. Confirm the authenticator association

Once you've associated an authenticator, **you must use it at least once to confirm the association**.

You can check if an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/multifactor-authentication/api/manage#list-authenticators). If confirmed, the value of `active` is `true`.

To confirm the association of an authenticator using OTP, make a `POST` request to the `oauth/token` endpoint with the `otp` (from the previous step after turning the `barcode_uri` into a QR code).

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": [\"YOUR_CLIENT_ID\"], \"grant_type\": \"http://auth0.com/oauth/grant-type/mfa-otp\", \"mfa_token\": \"YOUR_MFA_TOKEN\", \"otp\": \"000000\" }"
	}
}
```

If the call was successful, you'll receive a response like this:

```
{
  "access_token": "eyJ...d",
  "expires_in": 600,
  "scope": "enroll read:authenticators remove:authenticators",
  "token_type": "Bearer"
}
```

At this point, your authenticator is fully associated and ready to be used.