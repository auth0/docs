---
description: Learn how to add permissions to roles for Auth0's API Authorization core feature using the Auth0 Management API.
topics:
  - authorization
  - mgmt-api
  - roles
  - permissions
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Add Permissions to Roles

This guide will show you how to add permissions to [roles](/authorization/concepts/rbac) using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/add-permissions-roles). The roles and their permissions can be used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

1. Make a `POST` call to the [Add Role Permissions endpoint](/api/management/v2#!/roles/post_role_permissions). Be sure to replace `ROLE_ID`, `MGMT_API_ACCESS_TOKEN`, `API_AUDIENCE`, and `PERMISSION_NAME` placeholder values with your role ID, Access Token, API Identifiers (audiences), and permission name(s), respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID/permissions",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text": "{ \"permissions\": [ { \"resource_server_identifier\": \"API_AUDIENCE\", \"permission_name\": \"PERMISSION_NAME\" }, { \"resource_server_identifier\": \"API_AUDIENCE\", \"permission_name\": \"PERMISSION_NAME\" } ] }"
  }
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role for which you want to add permissions. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:roles`. |
| `API_AUDIENCE` | This is the identifier (audience) of the API(s) associated with the permission(s) you would like to add for the specified role. This is not the API_ID |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to add for the specified role. |
