---
description: Explains how to remove an Auth0-registered application using the Auth0 Management API.
toc: false
topics:
  - applications
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---

# Remove an Application using the Management API

::: note
To make calls to the Management API, you must [get and use a valid Access Token](/api/management/v2/tokens).
:::

This guide will show you how to remove an application using Auth0's Management API.

1. Make a `DELETE` call to the [Delete a Client endpoint](/api/management/v2#!/Clients/delete_clients_by_id). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Management API Access Token, respectively.


```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

curl -X DELETE  https://khoriander.auth0.com/api/v2/clients/184248121999401


1, Make a DELETE se the [DELETE /api/v2/clients/{id} endpoint](/api/management/v2#!/Clients/delete_clients_by_id).
