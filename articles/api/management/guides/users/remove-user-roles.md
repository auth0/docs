---
title: Remove Roles from Users
description: Learn how to remove the roles assigned to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - roles
  - users
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Roles from Users

This guide will show you how to remove the <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> assigned to a user using Auth0's Management API. This task can also be performed using the Dashboard by either [removing users from a role](/dashboard/guides/users/remove-role-users) or [removing roles from a user](/dashboard/guides/users/remove-user-roles). Roles are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete User Roles endpoint](/api/management/v2#!/Users/delete_user_roles). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, and `ROLE_ID` placeholder values with your user ID, Management API Access Token, and role ID(s), respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/roles",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"roles\": [ \"ROLE_ID\", \"ROLE_ID\" ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:users`. |
| `ROLE_ID` | ID(s) of the role(s) you would like to remove for the specified user. |