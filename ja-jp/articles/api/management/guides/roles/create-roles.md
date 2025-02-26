---
title: Create Roles
description: Learn how to create a role using the Auth0 Management API. For use with Auth0's API Authorization Core feature set.
topics:
  - authorization
  - mgmt-api
  - roles
  - rbac
contentType: 
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Create Roles

This guide will show you how to create <dfn data-key="role">[roles](/authorization/concepts/rbac)</dfn> using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/roles/create-roles). The roles can be used with the API Authorization Core feature set.

<%= include('../../../../authorization/_includes/_enable-authz-core') %>

1. Make a `POST` call to the [Create Role endpoint](/api/management/v2#!/Roles/post_roles). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `ROLE_NAME`, and `ROLE_DESC` placeholder values with your Management API Access Token, role name, and role description, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/roles",
  "headers": [
  	{ "name": "Content-Type", "value": "application/json" },
  	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
    "mimeType": "application/json",
    "text" : "{ \"name\": \"ROLE_NAME\", \"description\": \"ROLE_DESC\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:roles`. |
| `ROLE_NAME` | Name of the role you would like to create. |
| `ROLE_DESC` | User-friendly description of the role. |