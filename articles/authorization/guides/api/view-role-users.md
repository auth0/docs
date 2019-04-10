---
description: Learn how to view users assigned to a role using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
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
# View Users Assigned to Roles

This guide will show you how to view the users assigned to a role using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/view-role-users). Roles are used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Role Users endpoint](/api/management/v2#!/roles/get_role_users). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID/users",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role for which you want to get users. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:users` and `read:roles`. |
