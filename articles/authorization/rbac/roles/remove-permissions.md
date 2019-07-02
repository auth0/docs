---
title: Remove Permissions from Roles
description: Learn how to remove permissions assigned to roles using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# Remove Permissions from Roles

In this guide, you'll learn how to remove permissions assigned to roles from the Auth0 Dashboard or with the Management API.

<%= include('../../_includes/_enable-authz-core') %>

## From the Dashboard

To remove permissions assigned to roles on the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Permissions** view, then click the trashcan icon next to the permission you want to remove, and confirm.

![Remove Permissions](/media/articles/authorization/role-def-permissions.png)

## Using the Management API

To remove permissions assigned to roles with the Management API, make a `DELETE` call to the [Delete Role Permissions endpoint](/api/management/v2#!/roles/delete_role_permissions). Be sure to replace `ROLE_ID`, `MGMT_API_ACCESS_TOKEN`, `API_ID`, and `PERMISSION_NAME` placeholder values with your role ID, Management API Access Token, API ID(s), and permission name(s), respectively.

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
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:roles`. |
| `API_ID` | ID(s) of the API(s) associated with the permission(s) you would like to remove for the specified role. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to remove for the specified role. |