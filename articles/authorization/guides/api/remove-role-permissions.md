---
description: Learn how to remove permissions added to a role using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - roles
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Permissions Assigned to Roles

This guide will show you how to remove the [permissions](/authorization/concepts/rbac) assigned to a role using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/remove-role-permissions). The assigned permissions and roles are used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete Role Permissions endpoint](/api/management/v2#!/roles/delete_role_permissions). Be sure to replace `ROLE_ID`, `MGMT_API_ACCESS_TOKEN`, `API_ID`, and `PERMISSION_NAME` placeholder values with your role ID, Access Token, API ID(s), and permission name(s), respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID/permissions",
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
| `ROLE_ID` | Τhe ID of the role for which you want to remove permissions. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:roles`. |
| `API_ID` | ID(s) of the API(s) associated with the permission(s) you would like to remove for the specified role. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to remove for the specified role. |