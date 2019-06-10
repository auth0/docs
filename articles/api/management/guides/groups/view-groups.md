---
title: View Groups
description: Learn how to view groups using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
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
# View Groups

This guide will show you how to view groups using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/groups/view-groups). Groups are used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `GET` call to the [Get Groups endpoint](/api/management/v2#!/groups/get_groups). Be sure to replace the `MGMT_API_ACCESS_TOKEN` placeholder value with your Management API Access Token.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/groups",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the scopes `read:groups`. |