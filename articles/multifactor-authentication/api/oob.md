---
title: Associate an OOB Authenticator
description: How to associate an OOB authenticator
---
# Associate an OOB Authenticator

Introduction

## Step 1. Obtain an Access Token to Associate the New Authenticator

To obtain an [access token](/tokens/access-token) to associate your new authenticator, you'll need to make the appropriate `POST` call to the [`/oauth/token` endpoint](/api/authentication#resource-owner-password). 

More specifically, you'll need to provide values for the following parameters:

| Parameter | Value |
| - | - |
| Client ID | The ID of your Auth0 [client](/clients) |
| Realm | [Realms](/api-auth/grant/password#realm-support) allow you to specify a specific user director to use with the token endpoint. Specify the realms you'd like to use (in Auth0, these are typically [connections](/identityproviders)) |
| Grant Type | The authorization flow you're using |
| Audience | The unique identifier of the target API you want to access. For MFA, use `https://${account.namespace}/mfa` |
| Scope | The scopes you're requesting. Include `enroll`, `read:authenticators`, and `remove:authenticators` |
| Username | The resource owner's identifier |
| Password | The resource owner's password |

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"J0...pl\", \"realm\": \"Username-Password-Authentication\", \"grant_type\": \"http://auth0.com/oauth/grant-type/password-realm\", \"audience\": \"https://${account.namespace}/mfa/\", \"scope\": \"enroll read:authenticators remove:authenticators\", \"username\": \"a...@auth0.com\", \"password\": \"YOUR_PASSWORD\" }"
	}
}
```

If you haven't already [enabled MFA using the Dashboard](${manage_url}/#/guardian), your response, which includes your standard access token, will look like this:

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"ey...Ww",
  "token_type":"Bearer",
  "expires_in":86400
}
```

However, if you've enabled MFA and are therefore attempting to request an access token where MFA is required, you'll receive the following response from the `/oauth/token` endpoint:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```

You can use the MFA token instead of the standard access token to request association of a new authenticator.

## Step 2: Use the Access Token to Request Association of the Authenticator

Now that you have the appropriate access token, you can send the appropriate `POST` request to the `/mfa/associate` endpoint to request Association of your authenticator.

To associate an authenticator where the challenge type is an SMS message containing a code that the user is then required to provide, make the following `POST` call to the `/mfa/associate` endpoint.

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

To confirm the association of an authenticator using SMS messages for the MFA challenge, you'll make a `POST` call to the `oauth/token` endpoint.

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

At this point, your authenticator is ready to be used.