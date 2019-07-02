---
title: Delete Roles
description: Learn how to delete a role using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# Delete Roles

In this guide, you'll learn how to delete a role from the Auth0 Dashboard or with the Management API. Roles are used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

## From the Dashboard

To delete a role from the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/).

![Select Role](/media/articles/authorization/role-list.png)

2. Click **Delete Role**, and confirm.

![Delete Role](/media/articles/authorization/role-def-settings.png)

## Using the Management API

To delete a role with the Management API, make a `DELETE` request to the [Delete Role endpoint](/api/management/v2#!/roles/delete_role). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role you want to delete. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `delete:roles`. |