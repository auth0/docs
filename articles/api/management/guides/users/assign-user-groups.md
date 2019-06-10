---
title: Assign Groups to Users
description: Learn how to assign groups to a specific user using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
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
# Assign Groups to Users

This guide will show you how to assign [groups](/authorization/concepts/rbac) to a specific user using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/users/assign-user-groups). Groups can be used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../../authorization/_includes/_view-limits') %>

1. Make a `POST` call to the [Assign User Groups endpoint](/api/management/v2#!/user_groups/post_user_groups). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, and `GROUP_ID` placeholder values with your user ID, Management API Access Token, and group ID(s), respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/users/USER_ID/groups",
	"headers": [
    { "name": "Content-Type", "value": "application/json" },
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"groups\": [ \"GROUP_ID\", \"GROUP_ID\" ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:groups` and `update:users`. |
| `GROUP_ID` | ID(s) of the group(s) you would like to add for the specified user. |