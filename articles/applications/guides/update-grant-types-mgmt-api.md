---
title: Update an Application's Grant Types using the Management API
description: Learn how to update an application's grant types using Auth0's Management API.
topics:
  - applications
  - grant-types
contentType: how-to
useCase:
  - build-an-app
---
# Update an Application's Grant Types using the Management API

::: note
To make calls to the Management API, you must [get and use a valid Access Token](/api/management/v2/tokens).
:::

This guide will show you how to change your application's grant types using Auth0's Management API.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::

 to update the `grant_types` field.

1.Make a `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Access Token, respectively.


```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"grant_types": []
}
```

::: warning
Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
:::

