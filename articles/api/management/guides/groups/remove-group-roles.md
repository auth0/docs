---
title: Remove Roles from Groups
description: Learn how to remove the roles added to a group using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# Remove Roles from Groups

This guide will show you how to remove the roles added to a group using Auth0's Management API. This task can also be performed using the Dashboard by either [removing roles from a group](/dashboard/guides/groups/remove-group-roles) or [removing groups from a role](/dashboard/guides/roles/remove-role-groups). Groups and roles are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete Group Roles endpoint](/api/management/v2#!/groups/delete_group_roles). Be sure to replace `GROUP_ID`, `MGMT_API_ACCESS_TOKEN`, and `ROLE_ID` placeholder values with your group ID, Management API Access Token, and role ID(s), respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/groups/GROUP_ID/roles",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"roles\": [ \"ROLE_ID\", \"ROLE_ID\" ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `GROUP_ID` | Τhe ID of the group for which you want to remove roles. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:groups`. |
| `ROLE_ID` | ID(s) of the role(s) you would like to remove for the specified group. |