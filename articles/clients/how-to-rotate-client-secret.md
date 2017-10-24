---
description: This page lists different ways of how to update your client's secret.
crews: crew-2
---

# Rotate the Client Secret

The client secret protects your resources by only granting tokens to requestors if they're authorized. Protect your client secrets; if any are ever compromised, you should rotate to a new one. Please remember that all authorized apps will therefore need to be updated with the new client secret.

## Rotate the Client Secret in the Dashboard

You can rotate your client secret under [Clients in the Dashboard](${manage_url}/#/clients). Choose the client you wish to edit by clicking on its name *or* the **Settings** gear icon associated with the client.

![](/media/articles/clients/change-client-secret/clients.png)

On the **Settings** page, the **Client Secret** will be the fourth parameter listed. To the right, click on the **rotation** icon to rotate your secret. You can view you your new secret by checking the box next to **Reveal client secret**.

Scroll to the bottom of the Settings page, and click **Save Changes**.

![](/media/articles/clients/change-client-secret/client-settings.png)

## Rotate the Client Secret Using the Management API

You can rotate your client's secret by making a `POST` call to the [Rotate a Client Secret endpoint](/api/management/v2#!/Clients/post_rotate_secret) of the Management API.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}.auth0.com/api/v2/clients/YOUR_CLIENT_ID/rotate-secret",
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

## Update Authorized Clients

Once you've rotated your client secret, you'll need to update any authorized clients with the new value. To make sure that you see as little downtime as possible when connecting your apps to your Auth0 client, we suggest you store the new client secret as a fallback to the previous secret. Then, if the connection doesn't work with the old secret, your app will use the new secret. Secrets can be stored in a list (or similar structure) to track keys until they're no longer needed. Once you're sure that an old secret is obsolete, you can remove its value from your app.