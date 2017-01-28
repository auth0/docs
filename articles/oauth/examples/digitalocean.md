---
section: oauth
description: This document shows how to create a Digital Ocean OAuth connection.
---

# Add Digital Ocean as an OAuth Provider to Your Management Dashboard

This document will show you how to add Digital Ocean as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Create Your Digital Ocean Application

1. Navigate to [Digital Ocean](https://cloud.digitalocean.com/login).
2. If you have not already registered a Digital Ocean application, you will need to do so prior to continuing.
3. Once available, copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

### Step 2: Add the Connection to the Auth0 Dashboard

You can do this by making the appropriate `POST` call to the [Auth0 APIv2's Connections endpoint](/api/v2#!/Connections/post_connections). Please note that doing so requires an [APIv2 token](/api/v2/tokens) with `create:connections` scope.

```har
{
	"method": "POST",
	"url": "https://YOURACCOUNT.auth0.com/api/v2/connections",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer ABCD"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"name\": \"digitalocean\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR-DIGITAL-OCEAN-CLIENT-ID\", \"client_secret\": \"YOUR-DIGITAL-OCEAN-CLIENT-SECRET\", \"authorizationURL\": \"https://cloud.digitalocean.com/v1/oauth/authorize\", \"tokenURL\": \"https://cloud.digitalocean.com/v1/oauth/token\", \"scope\": [\"read\"], \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb) { request.get('https://api.digitalocean.com/v2/account', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b).account; profile.user_id = profile.uuid; cb(null, profile); });}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
