---
title: Manage the Authenticators for Multifactor Authentication
description: How to manage your MFA authenticators
beta: true
tags:
  - mfa
  - mfa-api
  - mfa-authenticators
---

# Manage the Authenticators

Auth0 provides several API endpoints to help you manage the authenticators you're using with an application for multifactor authentication (MFA).

## Before you start

The MFA endpoints require an [Access Token](/tokens/access-token) with:

- `audience`: Set to `https://${account.namespace}/mfa/`
- `scope`: Include `enroll` for enrollment, `read:authenticators` to list authenticators, and `remove:authenticators` to delete authenticators.

For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{
    "name": "Content-Type", "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://${account.namespace}/mfa/\", \"scope\": \"enroll read:authenticators remove:authenticators\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}"
  }
}
```

## List Authenticators

To get a list of the authenticators you've associated and can be used with your tenant, you can make the appropriate call to the `/mfa/authenticators` endpoint:

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ACCESS_TOKEN"
	}]
}
```

You should receive information about the authenticator type(s) in the response:

```json
[
  {
    "authenticator_type": "recovery-code",
    "id": "recovery-code|dev_IsBj5j3H12VAdOIj",
    "active": true
  },
  {
    "authenticator_type": "otp",
    "id": "totp|dev_nELLU4PFUiTW6iWs",
    "active": true,
  },
  {
    "authenticator_type": "oob",
    "oob_channel": "sms",
    "id": "sms|dev_sEe99pcpN0xp0yOO",
    "name": "+1123XXXXX",
    "active": true
  }
]
```

## Delete Authenticators

To delete an authenticator you've associated, send a delete request to the `/mfa/authenticators/AUTHENTICATOR_ID` endpoint (be sure to replace `AUTHENTICATOR_ID` with your authenticator ID).

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ACCESS_TOKEN"
	}]
}
```

If the authenticator was deleted, a 204 response is returned.
