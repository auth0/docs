---
description: Learn how to view roles assigned to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - roles
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Roles Assigned to Users

This guide will show you how to view the [roles](/authorization/concepts/rbac) assigned to a user using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/view-user-roles). The assigned roles are used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get User Roles endpoint](/api/management/v2#!/user_roles/get_user_roles). Be sure to replace `USER_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your user ID and Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/roles",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user for whom you want to get roles. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:users` and `read:roles`. |