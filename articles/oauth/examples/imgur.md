---
section: oauth
description: This document shows how to create an Imgur OAuth connection.
---

# Add Imgur as an OAuth Provider to Your Management Dashboard

This document will show you how to add Imgur as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Create Your Imgur Application

1. Navigate to [Imgur](https://api.imgur.com/oauth2/addclient).
2. If you have not already registered an Imgur application, you will need to do so prior to continuing.
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
		"text": "{ \"name\": \"imgur\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR-IMGUR-CLIENT-ID\", \"client_secret\": \"YOUR-IMGUR-CLIENT-SECRET\", \"authorizationURL\": \"https://api.imgur.com/oauth2/authorize\", \"tokenURL\": \"https://api.imgur.com/oauth2/token\", \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb) { request.get('https://api.imgur.com/3/account/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b).data; profile.user_id = profile.id; cb(null, profile); });}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
