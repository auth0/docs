---
title: Remove Users from Groups
description: Learn how to remove users assigned to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - groups
  - users
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Remove Users from Groups

This guide will show you how to remove the users assigned to a group using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/remove-group-users). Groups are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete Group Users endpoint](/api/management/v2#!/groups/delete_group_users). Be sure to replace `GROUP_ID`, `MGMT_API_ACCESS_TOKEN`, and `USER_ID` placeholder values with your group ID, Management API Access Token, and user ID(s), respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/groups/GROUP_ID/users",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"users\": [ \"USER_ID\", \"USER_ID\" ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `GROUP_ID` | Τhe ID of the group for which you want to remove roles. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:groups`. |
| `USER_ID` | ID(s) of the user(s) you would like to remove for the specified group. |