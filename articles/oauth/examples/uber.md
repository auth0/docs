---
section: oauth
description: This document shows how to create an Uber OAuth connection.
---

# Add Uber as an OAuth Provider to Your Management Dashboard

This document will show you how to add Uber as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Create Your Uber Application

1. Navigate to [Uber Developers](https://developer.uber.com/).
2. If you have not already [registered an Uber application](https://developer.uber.com/dashboard/create), you will need to do so prior to continuing. If you have, set the `Redirect URI` of your application to 'https://${account.namespace}/login/callback'.
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
		"text": "{ \"name\": \"uber\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR_UBER_APP_KEY\", \"client_secret\": \"YOUR_UBER_APP_SECRET\", \"authorizationURL\": \"https://login.uber.com/oauth/authorize\", \"tokenURL\": \"https://login.uber.com/oauth/token\", \"scope\": [\"profile\"], \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb) { request.get('https://api.uber.com/v1/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.uuid; cb(null, profile); });}\" } }, \"enabled_clients\": [\"\"] }"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
