---
title: Manage the Authenticators for Multi-factor Authentication
description: How to manage your MFA authenticators
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---

# Manage the Authenticators

Auth0 provides several API endpoints to help you manage the authenticators you're using with an application for <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

## Before you start

The MFA endpoints require an <dfn data-key="access-token">Access Token</dfn> with:

- `audience`: Set to `https://${account.namespace}/mfa/`
- <dfn data-key="scope">`scope`</dfn>: Include `enroll` for enrollment, `read:authenticators` to list authenticators, and `remove:authenticators` to delete authenticators.

For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{
    "name": "Content-Type", "value": "application/x-www-form-urlencoded"
  }],
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
        "name": "audience",
        "value": "https://${account.namespace}/mfa/"
      },
      {
        "name": "scope",
        "value": "enroll read:authenticators remove:authenticators"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "client_secret",
        "value": "YOUR_CLIENT_SECRET"
      }
    ]
  }
}
```

## List Authenticators

To get a list of the authenticators a user has associated and can be used with your tenant, you can make the appropriate call to the `/mfa/authenticators` endpoint:

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

To delete an associated authenticator, send a delete request to the `/mfa/authenticators/AUTHENTICATOR_ID` endpoint (be sure to replace `AUTHENTICATOR_ID` with the relevant authenticator ID).

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
