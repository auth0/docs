---
title: Assign Permissions to Users
description: Learn how to assign permissions to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Permissions to Users

This guide will show you how to assign [permissions](/authorization/concepts/rbac) to a user using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/users/assign-permissions-users). The assigned permissions can be used with the API Authorization Core feature set.

::: note
Adding permissions directly to a user circumvents the benefits of [role-based access control (RBAC)](/authorization/concepts/rbac) and is not typically recommended.
:::

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `POST` call to the [Assign User Permissions endpoint](/api/management/v2#!/Users/post_permissions). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, `API_IDENTIFIER`, and `PERMISSION_NAME` placeholder values with your user ID, Management API Access Token, API Identifier(s), and permission name(s), respectively.

```har
{
  "method": "POST",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/permissions",
    "headers": [
    	{ "name": "Content-Type", "value": "application/json" },
   		{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text": "{ \"permissions\": [ { \"resource_server_identifier\": \"API_IDENTIFIER\", \"permission_name\": \"PERMISSION_NAME\" }, { \"resource_server_identifier\": \"API_IDENTIFIER\", \"permission_name\": \"PERMISSION_NAME\" } ] }"
  }
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user for whom you want to assign permissions. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:users`. |
| `API_IDENTIFIER` | Identifier(s) of the API(s) associated with the permission(s) you would like to assign for the specified user. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to assign for the specified user. |
