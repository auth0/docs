---
title: Check Application Types
description: Learn how to check the application type for your apps registered with Auth0.
toc: true
topics:
  - applications
  - application-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# Check Application Types

You can use the Auth0 Management API's [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id) to check the application type for an application registered with Auth0. 
If the application is first party, the `is_first_party` equals `true`, else `false`. Be sure to replace `CLIENT_ID` with the ID of your application.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/clients/CLIENT_ID?fields=is_first_party&include_fields=true",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}]
}
```

::: note
See [Access Tokens for the Management API](/api/management/v2/tokens) for instructions on obtaining the Access Token required to call the Management API.
:::
