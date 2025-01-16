---
title: Retrieve Connection Options
description: Learn how to retrieve the options object for a connection using the Auth0 Management API.
topics:
  - connections
  - mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
  - customize-connections
---
# Retrieve Connection Options

This guide will show you how to retrieve the options object for a [connection](/connections) using Auth0's Management API. 

1. Make a `GET` call to the [Get Connection endpoint](/api/management/v2#!/Connections/get_connections_by_id). Be sure to replace `CONNECTION_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your connection ID and Management API Access Token, respectively.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/connections/CONNECTION-ID?fields=options",
  "headers": [
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
  ]
}
```

| Value | Description |
| - | - |
| `CONNECTION_ID` | Τhe ID of the connection for which you want to retrieve the `options` object. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:connections`. |
