---
section: oauth
description: This document shows how to create a Vimeo OAuth connection.
---

# Add Vimeo as an OAuth Provider to Your Management Dashboard

This document will show you how to add Vimeo as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Register and Configure Your Vimeo Application

1. Navigate to [Vimeo](https://dribbble.com/account/applications/new).
2. If you have not already registered a new Vimeo application, you will need to do so prior to continuing.
3. Copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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
		"text": "{ \"name\": \"vimeo\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR_VIMEO_CLIENT_ID\", \"client_secret\": \"YOUR_VIMEO_CLIENT_SECRET\", \"authorizationURL\": \"https://api.vimeo.com/oauth/authorize\", \"tokenURL\": \"https://api.vimeo.com/oauth/access_token\", \"scope\": [\"public\"], \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb) { request.get('https://api.vimeo.com/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.uri; cb(null, profile); });}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
