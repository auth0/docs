---
title: Manage the Authenticators for Multi-factor Authentication
description: Learn how to manage your MFA authenticators
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
# Manage Authenticators using the MFA API

Auth0 provides several API endpoints to help you manage the authenticators you're using with an application for <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

## Prerequisites

In order to call the MFA API to manage enrollments, you first need to obtain an MFA Access Token.

<%= include('../../_includes/_get_mfa_token') %>

## List Authenticators

To get a list of the authenticators a user has associated and can be used with your tenant, you can make the appropriate call to the `/mfa/authenticators` endpoint:

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/mfa/authenticators",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MFA_TOKEN"
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

:::note
- When a user enrolls with Push, Auth0 creates an OTP enrollment. You will see both when listing enrollments.
- When Email MFA is enabled, all verified emails will be listed as authenticators.
- When a user enrolls any factor, Auth0 creates a recovery code, that will be listed as an authenticator.
:::

## Delete Authenticators

To delete an associated authenticator, send a delete request to the `/mfa/authenticators/AUTHENTICATOR_ID` endpoint (be sure to replace `AUTHENTICATOR_ID` with the relevant authenticator ID).

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MFA_TOKEN"
	}]
}
```

If the authenticator was deleted, a 204 response is returned.

:::note
- When you enroll a Push authenticator, Auth0 also enrolls an OTP one. If you delete the Push authenticator, Auth0 will delete the OTP one too.
- If Email MFA is enabled, all verified emails will be listed as authenticators, but you can't delete them. You can only delete email authenticators that were enrolled explicitly.
- You cannot delete Recovery codes.
:::