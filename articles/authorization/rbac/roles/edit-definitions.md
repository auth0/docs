---
title: Edit Role Definitions
description: Learn how to edit a role definition using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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

In this guide, you'll learn how to edit a <dfn data-key="role">[role](/authorization/rbac/about)</dfn> definition from the Auth0 Dashboard or with the Management API.

<%= include('../../_includes/_enable-authz-core') %>

<%= include('../../_includes/_predefine-permissions') %>

## From the Dashboard

To edit a role definition from the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Edit the role name and description, then click **Update Role**.

![Edit Role Definition](/media/articles/authorization/role-def-settings.png)

## Using the Management API

To edit a role definition with the Management API, make a `PATCH` request to the [Update Role endpoint](/api/management/v2#!/roles/patch_role). Be sure to replace `ROLE_ID`, `MGMT_API_ACCESS_TOKEN`, `ROLE_NAME`, and `ROLE_DESC` placeholder values with your role ID, Management API Access Token, role name, and role description, respectively.

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