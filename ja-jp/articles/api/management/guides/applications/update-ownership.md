---
title: Update Application Ownership
description: Learn how to update application ownership using the Auth0 Management API. This will let you specify whether an application is registered with Auth0 as a first-party or third-party application.
toc: true
topics:
  - applications
  - application-types
  - mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
---
# Update Application Ownership

This guide will show you how to use Auth0's Management API to update application ownership, which allows you to specify whether an application is registered with Auth0 as a first-party or third-party application.

Make a `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id). Be sure to replace `YOUR_CLIENT_ID`,`MGMT_API_ACCESS_TOKEN`, and `OWNERSHIP_BOOLEAN` placeholder values with your client ID, Management API Access Token, and boolean representing the application's ownership, respectively.

```har
{
  "method": "PATCH",
  "url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID",
  "headers": [
    { "name": "Content-Type", "value": "application/json" },
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text" : "{ \"is_first_party\": \"OWNERSHIP_BOOLEAN\" }"
  }
}
```

| Value | Description |
| - | - |
| `YOUR_CLIENT_ID` | Τhe ID of the application to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:clients`. |
| `OWNERSHIP_BOOLEAN` | The ownership you would like to specify for the application. If the application is first-party, `is_first_party` should have a value of `true`. If the application is third-party, `is_first_party` should have a value of `false`. |
