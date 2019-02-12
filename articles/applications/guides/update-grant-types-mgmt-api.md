---
title: Update an Application's Grant Types using the Management API
description: Learn how to update an application's grant types using Auth0's Management API.
topics:
  - applications
  - grant-types
contentType: how-to
useCase:
  - build-an-app
---
# Update an Application's Grant Types using the Management API

This guide will show you how to change your application's grant types using Auth0's Management API.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::

::: warning
Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
:::

1. Make a `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id). Be sure to replace `YOUR_CLIENT_ID`, `MGMT_API_ACCESS_TOKEN`, and GRANT_TYPE placeholder values with your client ID, Access Token, and desired grant type, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID",
	"headers": [
    	   { "name": "Content-Type", "value": "application/json" },
   	   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	   { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
      	   "mimeType": "application/json",
      	   "text" : "{ \"grant_types\": \"GRANT_TYPES\" }"
	}
}
```

| Value | Description |
| - | - |
| `YOUR_CLIENT_ID` | Τhe ID of the application to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the scope `update:clients`. |
| `GRANT_TYPES` | The grant types you would like to enable for the specified application. |
