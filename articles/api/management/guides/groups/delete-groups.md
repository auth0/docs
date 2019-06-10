---
title: Delete Groups
description: Learn how to delete a group using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - permissions
  - groups
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Delete Groups

This guide will show you how to delete a group using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/delete-groups). Groups are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `DELETE` call to the [Delete Group endpoint](/api/management/v2#!/groups/delete_group). Be sure to replace `GROUP_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your group ID and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/groups/GROUP_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `GROUP_ID` | Τhe ID of the group you want to delete. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `delete:groups`. |