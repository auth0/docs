---
title: Manage the Authenticators for Multifactor Authentication
description: How to manage your MFA authenticators
beta: true
---

::: warning
This article includes documentation on features that are still under development. These features are available to customers with early access.
:::

# Manage the Authenticators

Auth0 provides several API endpoints to help you manage the authenticators you're using with a particular tenant for multifactor authentication (MFA).

## List Authenticators

To get a list of the authenticators you've associated and can be used with your tenant, you can make the appropriate call to the `/mfa/authenticators` endpoint:

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_API_ACCESS_TOKEN"
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
    "id": "totp|dev_nELLU4PFUiTW6iWs"
  },
  {
    "authenticator_type": "oob_channel",
    "channel_type": "sms",
    "id": "sms|dev_sEe99pcpN0xp0yOO",
    "name": "+1123XXXXX"
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
		"value": "Bearer YOUR_API_ACCESS_TOKEN"
	}]
}
```

If the authenticator was deleted, a 204 response is returned.