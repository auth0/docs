---
title: Create Roles
description: Learn how to create roles using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - roles
  - rbac
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Roles

In this guide, you'll learn how to create <dfn data-key="role">[roles](/authorization/rbac/about)</dfn> from the Auth0 Dashboard or with the Management API. The roles can be used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

<%= include('../../_includes/_predefine-permissions') %>

## From the Dashboard

To create roles from the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click **Create Role**.

![Click Create Role](/media/articles/authorization/role-list.png)

2. Name the role and add a description, then click **Create**.

![Add Role](/media/articles/authorization/role-name-role.png)

3. Click **Add Permissions**.

![Add Permissions](/media/articles/authorization/role-def-empty-permissions.png)

4. Select the API from which you want to add permissions, then select the permissions to add to the role, and click **Add Permissions**.

![Add Permissions to Roles](/media/articles/authorization/role-select-add-permissions.png)

## Using the Management API

To create roles with the Management API, make a `POST` request to the [Create Role endpoint](/api/management/v2#!/roles/post_role). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `ROLE_NAME`, and `ROLE_DESC` placeholder values with your Management API Access Token, role name, and role description, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/roles",
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
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:roles`. |
| `ROLE_NAME` | Name of the role you would like to create. |
| `ROLE_DESC` | User-friendly description of the role. |

