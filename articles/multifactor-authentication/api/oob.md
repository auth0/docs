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

<%= include('./_includes/_authenticator-before-start') %>

## 1. Get the MFA token

<%= include('./_includes/_get_mfa_token') %>

## 2. Request association of the authenticator

<%= include('./_includes/_request_association') %>

To associate an authenticator where the challenge type is an SMS message containing a code the user provides, make the following `POST` request to the `/mfa/associate` endpoint. This will both trigger an MFA challenge for the user and associate the new authenticator. 

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

<%= include('./_includes/_recovery_codes') %>

## 3. Confirm the authenticator association

Once the authenticator is associated, **it must be used at least once to confirm the association**.

To confirm the association of an authenticator using SMS messages for the MFA challenge, make a `POST` request to the `oauth/token` endpoint. Now, you can add the `oob_code` retrieved previously as a parameter in the request. 

Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
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
        "name": "mfa_token",
        "value": "YOUR_MFA_TOKEN"
      },
      {
        "name": "oob_code",
        "value": "ata...i0i"
      },
      {
        "name": "binding_code",
        "value": "000000"
      }
    ]
	}
}
```

<%= include('./_includes/_successful_confirmation') %>