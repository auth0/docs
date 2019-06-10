---
title: View Groups Assigned to Users
description: Learn how to view groups to which a specific user is assigned using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - groups
  - users
  - user-profile
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Groups Assigned to Users

This guide will show you how to view the [groups](/authorization/concepts/rbac) to which a specific user is assigned using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/users/view-user-groups). Groups and their assigned users are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get User Groups endpoint](/api/management/v2#!/user_groups/get_user_groups). Be sure to replace `USER_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your user ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/groups",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user for whom you want to get groups. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:users` and `read:groups`. |