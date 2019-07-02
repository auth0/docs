---
Title: View Role Permissions
description: Learn how to view the permissions added to a role using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# View Role Permissions

In this guide, you'll learn how to view the permissions added to a role from the Auth0 Dashboard or with the Management API.

<%= include('../../_includes/_enable-authz-core') %>

## From the Dashboard

To view role permissions from the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Permissions** view.

![View Permissions](/media/articles/authorization/role-def-permissions.png)

The following information is displayed for each permission:

| **Column** | **Description** |
|----------------|-----------------|
| Name | Name of the permission from the permission definition. |
| Description | Description of the permission from the permission definition. |
| API | Name of the API to which the permission is attached. |

## Using the Management API

To retrieve role permissions with the Management API, make a `GET` request to the [Get Role Permissions endpoint](/api/management/v2#!/roles/get_role_permissions). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID/permissions",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role for which you want to get permissions. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:roles`. |