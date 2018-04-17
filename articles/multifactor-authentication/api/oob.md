---
title: Associate an OOB Authenticator
description: How to associate an OOB authenticator
---

# Associate an OOB Authenticator

In this tutorial, we will show you how you can configure your Auth0 tenant to allow the self-association of out-of-band (OOB) authenticators.

## Before You Start

...

## Step 1. Trigger the MFA Error and Use the MFA Token to Associate the New Authenticator

Whenever a user begins the authorization process and they do not have an active authenticator associated with their account, they will trigger the following MFA response when calling the `/oauth/token` endpoint:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```

You will use the MFA token instead of the standard access token to request association of a new authenticator.

## Step 2: Use the MFA Token to Request Association of the Authenticator

Now that you have the appropriate MFA token, you can send the appropriate `POST` request to the `/mfa/associate` endpoint to request Association of your authenticator.

To associate an authenticator where the challenge type is an SMS message containing a code that the user is then required to provide, make the following `POST` call to the `/mfa/associate` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

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

If successful, you'll receive a response similar to the following:

```json
{
  "authenticator_type": "oob",
  "oob_channel": "sms",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ],
  "oob_code": "ata6daXAiOi..."
}
```

### Recovery Codes

If this is the first time you're associating an authenticator, you'll notice that your response includes `recovery_codes`. This is used to access your account in the event that you lose access to the account or device used for your second factor authentication. These are one-time usable codes, and new ones are generated as necessary.

## Step 3: Use the Authenticator to Confirm Its Association

Once you've associated an authenticator, **you must use it at least once to confirm the association**. You can check to see if an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/multifactor-authentication/api/manage#list-authenticators). If confirmed, the value of `active` is `true`.

To confirm the association of an authenticator using SMS messages for the MFA challenge, you'll make a `POST` call to the `oauth/token` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

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

If your call was successful, you'll receive a response similar to the following:

```
{
  "access_token": "eyJ...i",
  "expires_in": 600,
  "scope": "enroll read:authenticators remove:authenticators",
  "token_type": "Bearer"
}
```

At this point, your authenticator is fully associated and ready to be used.