---
title: Add API Permissions
description: Learn how to add permissions to APIs using the Auth0 Management Dashboard or Auth0 Management API
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
# Add API Permissions

In this guide, you'll learn how to add permissions to an API from the Auth0 Dashboard or with the Management API.

::: warning
By default, any user of any application can ask for any permission defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

## From the Dashboard

To add a permission from the Dashboard:

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Permissions** tab, enter a permission name and description for the permission you want to add, and click **Add**.

![Delete Permissions](/media/articles/authorization/api-def-permissions.png)

## Using the Management API

To add a permission with the Management API, make a `PATCH` request to the [Update Resource Server](/api/management/v2#!/resource_servers/patch_resource_server) endpoint. The request body should be a JSON object that contains the permissions you want to add.

```json
{
    "scopes": [
        { 
            "value":        "create:newsletter",
            "description":  "Create newsletters"
        },
        { 
            "value":        "edit:newsletter",
            "description":  "Edit newsletters"
        }
    ]
}
```

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

- [Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Enable Role-Based Access Control for APIs](/authorization/guides/enable-rbac)