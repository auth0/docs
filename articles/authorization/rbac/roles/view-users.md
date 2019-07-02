---
title: View Role Users
description: Learn how to view users assigned to a role using either the Auth0 Dashboard or the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# View Role Users

In this guide, you'll learn how to view the users assigned to a <dfn data-key="role">role</dfn> from the Auth0 Dashboard or with the Management API.

<%= include('../../_includes/_enable-authz-core') %>

## From the Dashboard

To view users assigned to a role from the Dashboard:

1. Navigate to the [Users & Roles > Roles](${manage_url}/#/roles) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the role to view.

![Select Role](/media/articles/authorization/role-list.png)

2. Click the **Users** view.

![View Users](/media/articles/authorization/role-def-users.png)

The following information is displayed for each user:

| **Attribute** | **Description** |
|---------------|-----------------|
| Picture | User's picture from the user profile. |
| Name | User's name from the user profile. |
| Email address | User's email address from the user profile. |

## Using the Management API

To retrieve users assigned to a role with the Management API, make a `GET` request to the [Get Role Users endpoint](/api/management/v2#!/roles/get_role_users). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Management API Access Token, respectively.

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
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scopes</dfn> `read:users` and `read:roles`. |
