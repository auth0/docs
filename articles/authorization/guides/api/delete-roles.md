---
description: Learn how to delete a role using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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

This guide will show you how to delete a role using Auth0's Management API. This task can also be performed [using the Dashboard](/authorization/guides/dashboard/delete-roles). Roles are used with the API Authorization Core feature set.

<%= include('../../_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete Role endpoint](/api/management/v2#!/roles/delete_role). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Access Token, respectively.

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
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `delete:roles`. |