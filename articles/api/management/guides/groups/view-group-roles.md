---
title: View Roles Added to Groups
description: Learn how to view roles added to a group using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# View Roles Added to Groups

This guide will show you how to view the [roles](/authorization/concepts/rbac) added to a group using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/view-group-roles). Groups and roles are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Group Roles endpoint](/api/management/v2#!/groups/get_group_roles). Be sure to replace `GROUP_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your group ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/groups/GROUP_ID/roles",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `GROUP_ID` | Τhe ID of the group for which you want to get roles. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:groups` and `read:roles`. |