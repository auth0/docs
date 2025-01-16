---
title: Remove Application
description: Learn how to remove an Auth0-registered application using the Auth0 Management API.
toc: false
topics:
  - applications
  - mgmt-api
contentType: 
  - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Remove Application

This guide will show you how to remove an application using Auth0's Management API. This task can also be performed [using the Dashboard](/dashboard/guides/applications/remove-app).

1. Make a `DELETE` call to the [Delete a Client endpoint](/api/management/v2#!/Clients/delete_clients_by_id). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Management API Access Token, respectively.

```har
{
	"method": "DELETE",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID",
	"headers": [
   	{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	]
}
```

| Value | Description |
| - | - |
| `YOUR_CLIENT_ID` | Τhe ID of the application to be deleted. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `delete:clients`. |
