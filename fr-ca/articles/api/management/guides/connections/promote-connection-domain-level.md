---
title: Promote Connection to Domain Level
description: Learn how to promote a connection to domain level using the Auth0 Management API.
topics:
  - connections
  - third-party-app
  - mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Promote Connection to Domain Level

This guide will show you how to promote connections to domain level using Auth0's Management API. 

1. Make a `PATCH` call to the [Update a Connection endpoint](/api/management/v2#!/Connections/patch_connections_by_id). Be sure to replace `CONNECTION_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your connection ID and Management API Access Token, respectively.

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
      "text" : "{ \"is_domain_connection\": true }"
  }
}
```

| Value | Description |
| - | - |
| `CONNECTION_ID` | Τhe ID of the connection to be promoted. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:connections`. |