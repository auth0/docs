---
title: Rotate Client Secret
description: Learn how to change your application's client secret using the Auth0 Management API.
topics:
  - applications
	- client-secrets
	- mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Rotate Client Secret

This guide will show you how to change your application's client secret using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/applications/rotate-client-secret).

::: warning 
New secrets may be delayed while rotating. To minimize downtime, we suggest you store the new client secret in your application's code as a fallback to the previous secret. This way, if the connection doesn't work with the old secret, your app will use the new secret.

Secrets can be stored in a list (or similar structure) until they're no longer needed. Once you're sure that an old secret is obsolete, you can remove its value from your app's code.
:::

1. Make a `POST` call to the [Rotate a Client Secret endpoint](/api/management/v2#!/Clients/post_rotate_secret). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Management API Access Token, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID/rotate-secret",
	"headers": [
   	   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| Value | Description |
| - | - |
| `YOUR_CLIENT_ID` | Τhe ID of the application to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:client_keys`. |

2. Update authorized applications

When you rotate a client secret, you must update any authorized applications with the new value. 
