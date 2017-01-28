---
section: oauth
description: This document shows how to create a Xing OAuth connection.
---

# Add Xing as an OAuth Provider to Your Management Dashboard

This document will show you how to add Xing as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Create Your Xing Application

1. Navigate to [Xing](https://developer.xing.com/).
2. If you have not already registered a Xing application, you will need to do so prior to continuing.
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
		"text": "{ \"name\": \"xing\", \"strategy\": \"oauth1\", \"options\": { \"client_id\", \"YOUR-XING-CLIENT-ID\", \"client_secret\": \"YOUR-XING-CLIENT-SECRET\", \"requestTokenURL\": \"https://api.xing.com/v1/request_token\", \"accessTokenURL\": \"https://api.xing.com/v1/access_token\", \"userAuthorizationURL\": \"https://api.xing.com/v1/authorize\", \"scripts\": { \"fetchUserProfile\": \"function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://api.xing.com/v1/users/me.json',token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode)); var p = JSON.parse(b); var profile = p.users[0]; cb(null, profile); });}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
