---
title: Assign Users to Groups
description: Learn how to assign users to a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - groups
  - users
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Users to Groups

This guide will show you how to assign users to a [group](/authorization/concepts/rbac) using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/assign-group-users). Groups can be used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../../authorization/_includes/_view-limits') %>

1. Make a `POST` call to the [Assign Group Users endpoint](/api/management/v2#!/groups/post_group_users). Be sure to replace `GROUP_ID`, `MGMT_API_ACCESS_TOKEN`, and `USER_ID` placeholder values with your group ID, Management API Access Token, and user ID(s), respectively.

```har
{
	"method": "POST",
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
| `GROUP_ID` | Τhe ID of the group to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:groups`. |
| `USER_ID` | ID(s) of the user(s) you would like to assign to the specified group. |