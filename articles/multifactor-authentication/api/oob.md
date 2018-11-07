---
title: Associate an Out-of-Band Authenticator
description: Configure your application so users can self-associate out-of-band (OOB) authenticators.
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

# Associate an Out-of-Band Authenticator

In this tutorial, you'll learn how to configure your application so users can self-associate out-of-band (OOB) authenticators.

<%= include('./_authenticator-before-start') %>

## 1. Get the MFA token

When a user begins the authorization process without an active authenticator associated with their account, they will trigger the following MFA response when calling the `/oauth/token` endpoint:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```

In the next step, use the MFA token (`mfa_token`) instead of the standard Access Token to request association of a new authenticator.

## 2. Request association of the authenticator

Next, make a `POST` request to the `/mfa/associate` endpoint to request association of your authenticator. Remember to use the MFA token from the previous step.

To associate an authenticator where the challenge type is an SMS message containing a code the user provides, make the following `POST` request to the `/mfa/associate` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MFA_API_ACCESS_TOKEN"
	}],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"sms\"], \"phone_number\": \"+11...9\" }"
	}
}
```

If successful, you'll receive a response like this:

```json
{
  "authenticator_type": "oob",
  "oob_channel": "sms",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ],
  "oob_code": "ata6daXAiOi..."
}
```

### Recovery Codes

If this is the first time you're associating an authenticator, you'll notice your response includes `recovery_codes`. This is used to access your account in the event that you lose access to the account or device used for your second factor authentication. These are one-time usable codes, and new ones are generated as necessary.

## 3. Confirm the authenticator association

Once you've associated an authenticator, **you must use it at least once to confirm the association**.

You can check if an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/multifactor-authentication/api/manage#list-authenticators). If confirmed, the value of `active` is `true`.

To confirm the association of an authenticator using SMS messages for the MFA challenge, make a `POST` request to the `oauth/token` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": [\"YOUR_CLIENT_ID\"], \"grant_type\": \"http://auth0.com/oauth/grant-type/mfa-oob\", \"mfa_token\": \"YOUR_MFA_TOKEN\", \"oob_code\": \"ata...i0i\", \"binding_code\": \"000000\" }"
	}
}
```

If your call was successful, you'll receive a response like this:

```
{
  "access_token": "eyJ...i",
  "expires_in": 600,
  "scope": "enroll read:authenticators remove:authenticators",
  "token_type": "Bearer"
}
```

At this point, your authenticator is fully associated and ready to be used.
