---
title: Remove Permissions from Users
description: Learn how to remove permissions directly assigned to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# Remove Permissions from Users

This guide will show you how to remove the [permissions](/authorization/concepts/rbac) directly assigned to a user using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/users/remove-user-permissions). The assigned permissions are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete User Permissions endpoint](/api/management/v2#!/Users/delete_permissions). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, `API_ID`, and `PERMISSION_NAME` placeholder values with your user ID, Management API Access Token, API ID(s), and permission name(s), respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/permissions",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text": "{ \"permissions\": [ { \"resource_server_identifier\": \"API_ID\", \"permission_name\": \"PERMISSION_NAME\" }, { \"resource_server_identifier\": \"API_ID\", \"permission_name\": \"PERMISSION_NAME\" } ] }"
  }
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user to be updated. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:users`. |
| `API_ID` | ID(s) of the API(s) associated with the permission(s) you would like to remove for the specified user. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to remove for the specified user. |