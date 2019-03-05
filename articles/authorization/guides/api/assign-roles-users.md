---
description: Learn how to assign roles to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
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
# Assign Roles to Users

This guide will show you how to assign [roles](/authorization/concepts/rbac) to a user using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/assign-roles-users). The assigned roles can be used with the API Authorization Core feature set.

<%= include('../_includes/_enable-authz-core') %>

<%= include('../_includes/_predefine-roles') %>

1. Make a `POST` call to the [Assign User Roles endpoint](/api/management/v2#!/user_roles/post_user_roles). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, and `ROLE_ID` placeholder values with your user ID, Access Token, and role ID(s), respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/roles",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ 
			\"roles\": [ \"ROLE_ID\", "\ROLE_ID\" ] 
		}"
	}
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:roles` and `update:users`. |
| `ROLE_ID` | ID(s) of the role(s) you would like to add for the specified user. |