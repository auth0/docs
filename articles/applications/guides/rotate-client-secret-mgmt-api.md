---
title: Rotate a Client Secret using the Management API
description: Learn how to change your application's client secret using the Management API.
topics:
  - applications
  - client-secrets
contentType: how-to
useCase:
  - build-an-app
---

# Rotate a Client Secret using the Management API

::: note
To make calls to the Management API, you must [get and use a valid Access Token](/api/management/v2/tokens).
:::

This guide will show you how to change your application's client secret using Auth0's Management API.

::: warning 
New secrets may be delayed while rotating. To make sure that you see as little downtime as possible, we suggest you store the new client secret in your application's code as a fallback to the previous secret. This way, if the connection doesn't work with the old secret, your app will use the new secret.

Secrets can be stored in a list (or similar structure) to track keys until they're no longer needed. Once you're sure that an old secret is obsolete, you can remove its value from your app's code.
:::


1. Make a `POST` call to the [Rotate a Client Secret endpoint](/api/management/v2#!/Clients/post_rotate_secret). Be sure to replace `YOUR_CLIENT_ID` and `MGMT_API_ACCESS_TOKEN` placeholder values with your client ID and Access Token, respectively.


```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/clients/YOUR_CLIENT_ID/rotate-secret",
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


2. Update authorized applications

When you rotate a client secret, you must update any authorized applications with the new value. 
