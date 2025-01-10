---
title: View Application Ownership
description: Learn how to check whether an application is registered with Auth0 as a first-party or third-party app using the Auth0 Management API.
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
# View Application Ownership

This guide will show you how to use Auth0's Management API to check whether an application is registered with Auth0 as a first-party or third-party application.

1. Make a `GET` call to the [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Management API Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID?fields=is_first_party&include_fields=true",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| Value | Description |
| - | - |
| `YOUR_CLIENT_ID` | Τhe ID of the application to be updated. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `read:clients`. |

If the application is first-party, the `is_first_party` field will have a value of `true`. If the application is third-party, the `is_first_party` field will have a value of `false`.
