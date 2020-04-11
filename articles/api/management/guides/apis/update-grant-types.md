---
title: Update Grant Types for APIs
description: Learn how to update grant types for an API using the Auth0 Management API. For use with Auth0's On-Behalf-Of Flow.
topics:
  - authorization
  - mgmt-api
  - on-behalf-of
  - token-exchange
  - apis
contentType: 
    - how-to
useCase:
  - call-api
  - secure-api
---
# Update Grant Types for APIs

This guide will show you how to update grant types for an API using Auth0's Management API.

When the `refresh_token` grant type is set for an API acting as a client and using the [On-Behalf-Of Flow](/flows/concepts/on-behalf-of), the API will be able to exchange [Refresh Tokens](/tokens/refresh-token) for [Access Tokens](/tokens/access-tokens). For this to work, you will also need to [enable offline access](/dashboard/guides/apis/enable-offline-access) for the target API.

1. Make a `PATCH` call to the [Update Resource Server endpoint](/api/management/v2#!/resource_servers/patch_resource_server). Be sure to replace `API_ID`, `MGMT_API_ACCESS_TOKEN`, and `GRANT_TYPE_NAME` placeholder values with your API ID, Management API Access Token, and grant type name(s), respectively.

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
    "text" : "{ \"client\": [ { \"grant_types\": \"GRANT_TYPE_NAME\" } ] }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `API_ID` | Τhe ID of the API for which you want to update grant types. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `update:resource_servers`. |
| `GRANT_TYPE_NAME` | Name(s) of the [grant type(s)](/applications/reference/grant-types-available) you would like to add for the specified API. |