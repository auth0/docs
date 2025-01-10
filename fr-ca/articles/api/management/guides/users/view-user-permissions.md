---
title: View Permissions Assigned to Users
description: Learn how to view permissions assigned to a user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - users
  - user-profile
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# View Permissions Assigned to Users

This guide will show you how to view the [permissions](/authorization/concepts/rbac) assigned to a user using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/users/view-user-permissions). The assigned permissions are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get User Permissions endpoint](/api/management/v2#!/Users/get_permissions). Be sure to replace `USER_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your user ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/permissions",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user for whom you want to get permissions. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:users`. |