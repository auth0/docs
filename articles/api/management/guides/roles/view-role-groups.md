---
title: View Role Groups
description: Learn how to view groups to which a specific role has been assigned using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - roles
  - groups
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Role Groups

This guide will show you how to view the groups to which a specific role has been assigned using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/roles/view-role-groups). Groups and roles are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Role Groups endpoint](/api/management/v2#!/roles/get_role_groups). Be sure to replace `ROLE_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your role ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/roles/ROLE_ID/groups",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `ROLE_ID` | Τhe ID of the role for which you want to get groups. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:groups` and `read:roles`. |
