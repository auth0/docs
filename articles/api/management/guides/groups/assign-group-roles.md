---
title: Assign Roles to Groups
description: Learn how to assign roles to groups for Auth0's API Authorization core feature using the Auth0 Management Dashboard.
topics:
  - authorization
  - mgmt-api
  - roles
  - groups
contentType: 
    - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Assign Roles to Groups

This guide will show you how to assign roles to [groups](/authorization/concepts/rbac) using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/groups/assign-group-roles). The groups and their roles can be used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

<%= include('../../../../authorization/_includes/_view-limits') %>

1. Make a `POST` call to the [Assign Group Roles endpoint](/api/management/v2#!/groups/post_group_roles). Be sure to replace `GROUP_ID`, `MGMT_API_ACCESS_TOKEN`, and `ROLE_ID` placeholder values with your group ID, Management API Access Token, and role ID(s), respectively.

```har
{
	"method": "POST",
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
| `GROUP_ID` | Τhe ID of the group to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:groups`. |
| `ROLE_ID` | ID(s) of the role(s) you would like to add for the specified group. |