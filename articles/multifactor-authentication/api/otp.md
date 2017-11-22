---
title: Associate an OTP Authenticator
description: How to associate an OTP authenticator
---
# Associate an OTP Authenticator

In this tutorial, we will show you how you can configure your Auth0 tenant to allow the self-association of one-time password (OTP) authenticators.

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

## Step 2: Use the Access Token to Request Association of the Authenticator

Now that you have the appropriate access token, you can send the appropriate `POST` request to the `/mfa/associate` endpoint to request Association of your authenticator.

To associate an authenticator where the challenge type is an SMS message containing a code that the user is then required to provide, make the following `POST` call to the `/mfa/associate` endpoint. Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_API_ACCESS_TOKEN"
	}],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"authenticator_types\": [\"otp\"] }"
	}
}
```

If successful, you'll receive a response similar to the following:

```json
{
  "authenticator_type": "otp",
  "secret": "EN...S",
  "barcode_uri": "otpauth...period=30",
  "recovery_codes": [ "N3B...XC"]
}
```

In the next step, you'll need the one-time password (`otp`), which can be obtained by using the `barcode_uri` to generate a QR code that can be scanned by the OTP generator of your choice (such as Guardian). You might also consider displaying the `secret` in plain text so that your users can copy and paste it directly into the OTP generator (this is especially helpful for your users who are on a mobile device).

### Recovery Codes

If this is the first time you're associating an authenticator, you'll notice that your response includes `recovery_codes`. This is used to access your account in the event that you lose access to the account or device used for your second factor authentication. These are one-time usable codes, and new ones are generated as necessary.

## Step 3: Use the Authenticator to Confirm Its Association

Once you've associated an authenticator, **you must use it at least once to confirm the association.** You can check to see if an authenticator has been confirmed by calling the [`mfa/authenticators` endpoint](/multifactor-authentication/api/manage#list-authenticators). If confirmed, the value of `active` is `true`.
 
To confirm the association of an authenticator using OTP, you'll make a `POST` call to the `oauth/token` endpoint. You will be providing the `otp` (which you obtained in the previous step after you turned the `barcode_uri` into a QR code that is scannable with a tool like Guardian).

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

If the call was successful, you'll receive a response similar to the following:

```
{
  "access_token": "eyJ...d",
  "expires_in": 600,
  "scope": "enroll read:authenticators remove:authenticators",
  "token_type": "Bearer"
}
```

At this point, your authenticator is fully associated and ready to be used.