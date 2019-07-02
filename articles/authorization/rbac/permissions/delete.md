---
title: Delete API Permissions
description: Learn how to delete permissions from APIs using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - RBAC
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Delete API Permissions

In this guide, you'll learn how to delete API permissions from the Auth0 Dashboard or with the Management API.

## From the Dashboard

To delete a permission from the Dashboard:

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Permissions** tab, then click the trashcan icon next to the permission you want to remove, and confirm.

![Delete Permissions](/media/articles/authorization/api-def-permissions.png)

## Using the Management API

To delete a permission with the Management API, make a `PATCH` request to the [Update Resource Server](/api/management/v2#!/resource_servers/patch_resource_server) endpoint. The request body should be a JSON object that contains all the permissions you want to keep, with the permission to delete omitted.

::: note
Patching the permissions with an empty object removes the permissions completely.
:::

In the following example, be sure to replace `API_ID`, `MGMT_API_ACCESS_TOKEN`, `PERMISSION_NAME`, and `PERMISSION_DESC` placeholder values with your API ID, Management API Access Token, permission name(s), and permission description(s), respectively.

```har
{
    "method": "PATCH",
    "url": "https://${account.namespace}/api/v2/resource-servers/API_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
    ],
    "postData": {
    "mimeType": "application/json",
    "text" : "{ \"scopes\": [ { \"value\": \"PERMISSION_NAME\", \"description\": \"PERMISSION_DESC\" }, { \"value\": \"PERMISSION_NAME\", \"description\": \"PERMISSION_DESC\" } ] }"
    }
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to add permissions. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |
| `PERMISSION_NAME` | Name(s) of the permission(s) you would like to add for the specified API. | 
| `PERMISSION_DESC` | User-friendly description(s) of the permission(s) you would like to add for the specified API. |

## Keep reading

- [How to Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [How to Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Enable Role-Based Access Control for APIs](/dashboard/guides/apis/enable-rbac)