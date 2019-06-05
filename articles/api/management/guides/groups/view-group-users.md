---
title: View Group Users
description: Learn how to view users assigned to a group using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - dashboard
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
# View Group Users

This guide will show you how to view the users assigned to a group using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/view-group-users). Groups are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Group Users endpoint](/api/management/v2#!/groups/get_group_users). Be sure to replace GROUP_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your group ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/groups/GROUP_ID/users",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `GROUP_ID` | Τhe ID of the group for which you want to get users. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:users` and `read:groups`. |
