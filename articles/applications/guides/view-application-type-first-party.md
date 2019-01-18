---
title: View an Application Type: First-Party or Third-Party
description: Learn how to check whether an application is registered with Auth0 as a first-party or third-party app.
toc: true
topics:
  - applications
  - application-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# View Application Type: First-Party or Third-Party

::: note
To make calls to the Management API, you must [get and use a valid Access Token](/api/management/v2/tokens).
:::

This guide will show you how to use Auth0's Management API to check whether an application is registered with Auth0 as a first-party or third-party application.

1. Make a GET call to the [Get a Client endpoint](/api/management/v2#!/Clients/get_clients_by_id). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Access Token, respectively.

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID?fields=is_first_party&include_fields=true",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}]
}
```

If the application is first-party, the `is_first_party` field will have a value of `true`. If the application is third-party, the `is_first_party` field will have a value of `false`.
