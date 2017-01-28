---
section: oauth
description: This document shows how to create a Tumblr OAuth connection.
---

# Add Tumblr as an OAuth Provider to Your Management Dashboard

This document will show you how to add Tumblr as a Connection in you [Auth0 Management Dashboard](${manage_url}).

### Step 1: Register and Configure Your Tumblr Application

1. Navigate to [Tumblr](https://www.tumblr.com/oauth/apps).
2. If you have not already registered a new Tumblr application, you will need to do so prior to continuing.
3. Copy the `OAuth Consumer Key` and `Secret Key` for use with your cURL `POST`.

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
		"text": "{ \"name\": \"tumblr\", \"strategy\": \"oauth1\", \"options\": { \"client_id\", \"YOUR-TUMBLR-CONSUMER-KEY\", \"client_secret\": \"YOUR-TUMBLR-SECRET-KEY\", \"requestTokenURL\": \"https://www.tumblr.com/oauth/request_token\", \"accessTokenURL\": \"https://www.tumblr.com/oauth/access_token\", \"userAuthorizationURL\": \"https://www.tumblr.com/oauth/authorize\", \"scripts\": { \"fetchUserProfile\": \"function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://api.tumblr.com/v2/user/info',token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));var user = JSON.parse(b).response.user; user.user_id = user.name; cb(null, user);});}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```
