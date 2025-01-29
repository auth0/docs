---
title: Update API Permissions
description: Learn how to update permissions for APIs using the Auth0 Management API.
topics:
  - authorization
  - mgmt-api
  - RBAC
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Update API Permissions

This guide will show you how to update permissions for an API using Auth0's Management API. This task can also be performed using the Dashboard, but first you will need to [delete the permission](/dashboard/guides/apis/delete-permissions-apis) and then [add the permission](/dashboard/guides/roles/apis/add-permissions-apis) again.

::: warning
By default, any user of any application can ask for any permission defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

::: note
Patching the permissions with an empty object removes the permissions completely.
:::

1. Make a `PATCH` call to the [Update Resource Server endpoint](/api/management/v2#!/resource_servers/patch_resource_server). Be sure to replace `API_ID`, `MGMT_API_ACCESS_TOKEN`, `PERMISSION_NAME`, and `PERMISSION_DESC` placeholder values with your API ID, Management API Access Token, permission name(s), and permission description(s), respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/resource-servers/API_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"scopes\": [ { \"value\": \"PERMISSION_NAME\", \"description\": \"PERMISSION_DESC\" }, { \"value\": \"PERMISSION_NAME\", \"description\": \"PERMISSION_DESC\" } ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to add permissions. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to add for the specified API. | 
| `PERMISSION_DESC` | User-friendly description(s) of the permission(s) you would like to add for the specified API. |