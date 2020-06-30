---
title: Edit Role Definitions
description: Learn how to edit a role definition using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# Edit Role Definitions

This guide will show you how to edit a <dfn data-key="role">[role](/authorization/concepts/rbac)</dfn> definition using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/roles/edit-role-definitions). Roles are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `PATCH` call to the [Update Role endpoint](/api/management/v2#!/Roles/patch_roles_by_id). Be sure to replace `ROLE_ID`, `MGMT_API_ACCESS_TOKEN`, `ROLE_NAME`, and `ROLE_DESC` placeholder values with your role ID, Management API Access Token, role name, and role description, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"name\": \"ROLE_NAME\", \"description\": \"ROLE_DESC\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role for which you want to edit the definition. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:roles`. |
| `ROLE_NAME` | Name of the role. |
| `ROLE_DESC` | User-friendly description of the role. |