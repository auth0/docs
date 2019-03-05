---
description: Learn how to view permissions added to a role using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# View Permissions Added to Roles

This guide will show you how to view the [permissions](/authorization/concepts/rbac) added to a role using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/view-role-permissions). The added permissions and roles are used with the API Authorization Core feature set.

<%= include('../_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Role Permissions endpoint](/api/management/v2#!/roles/get_role_permissions). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Access Token, respectively.

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
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scope `read:roles`. |