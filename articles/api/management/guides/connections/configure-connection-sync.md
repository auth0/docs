---
title: Configure Connection Sync with Auth0
description: Learn how to update connection preferences for an upstream identity provider to control when updates to user profile root attributes will be allowed using the Auth0 Management API.
topics:
  - connections
  - identity-providers
  - user-profile
  - mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
  - customize-connections
  - manage-users
---
# Configure Connection Sync with Auth0

This guide will show you how to update connection preferences for an upstream [Identity Provider](/connections) to control when updates to user profile root attributes will be allowed using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/connections/configure-connection-sync).

::: warning
Before completing this step, you should first [retrieve the existing values of the connection's `options` object](/api/management/guides/retrieve-connection-options) to avoid overriding the current values. If you do not, any missing parameters from the original object will be lost after you update.
:::

1. Make a `PATCH` call to the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id). Make sure you include the original options values in the call to avoid overriding the current values. Also, be sure to replace `CONNECTION_ID`, `MGMT_API_ACCESS_TOKEN`, and `ATTRIBUTE_UPDATE_VALUE` placeholder values with your connection ID, Management API Access Token, and attribute update value, respectively.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"options\":{\"set_user_root_attributes\": \"ATTRIBUTE_UPDATE_VALUE\"}}"
  }
}
```

| Value | Description |
| - | - |
| `CONNECTION_ID` | ID of the connection for which you want to allow updates to root attributes. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:connections`. |
| `ATTRIBUTE_UPDATE_VALUE` | Indicates when you want to allow updates to user profile root attributes. Valid values are `on_first_login` and `on_each_login`. Defaults to `on_each_login` for new connections. |