---
title: Create Groups
description: Learn how to create a group using the Auth0 Management Dashboard. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Groups

This guide will show you how to create [groups](/authorization/concepts/rbac) using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/create-groups). Groups can be used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../../authorization/_includes/_view-limits') %>

1. Make a `POST` call to the [Create Group endpoint](/api/management/v2#!/groups/post_group). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `GROUP_NAME`, `GROUP_DESC`, and `CONNECTION` placeholder values with your Management API Access Token, group name, group description, and connection name, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/groups",
  "headers": [
  	{ "name": "Content-Type", "value": "application/json" },
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"name\": \"GROUP_NAME\", \"description\": \"GROUP_DESC\", \"connection\": \"CONNECTION\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `create:groups`. |
| `GROUP_NAME` | Name of the group you would like to create. |
| `GROUP_DESC` | User-friendly description of the group. |
| `CONNECTION` | Name of the connection to which the group belongs. |