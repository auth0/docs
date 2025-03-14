---
title: Enable Role-Based Access Control for APIs
description: Learn how to enable role-based access control (RBAC) for an API using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - roles
  - rbac
  - apis
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Enable Role-Based Access Control for APIs

This guide will show you how to enable [role-based access control (RBAC)](/authorization/concepts/rbac) using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/apis/enable-rbac). This effectively enables the API Authorization Core feature set.

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
    "text" : "{ \"enforce_policies\": \"true\", \"token_dialect\": \"TOKEN_DIALECT\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to enable RBAC. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |
| `TOKEN_DIALECT` | Dialect of the <dfn data-key="access-token">Access Token</dfn> for the specified API.|

## Token Dialect Options

Available options include:

| Value | Description |
|-------|-------------|
|  `access_token` | In the `scope` claim of the Access Token, includes an intersection of the requested permissions and the permissions assigned to the user. No `permissions` claim is passed. |
| `access_token_authz` | In the `scope` claim of the Access Token, includes an intersection of the requested permissions and the permissions assigned to the user. In the `permissions` claim of the Access Token, includes all permissions assigned to the user. Allows you to make minimal calls to retrieve permissions, but increases token size. |

When RBAC is _disabled_, default behavior is observed; an application can request any permission defined for the API, and the `scope` claim will include all requested permissions.

::: warning
Remember that any configured [rules](/authorization/concepts/authz-rules) run _after_ the RBAC-based authorization decisions are made, so they may override default behavior.
:::
