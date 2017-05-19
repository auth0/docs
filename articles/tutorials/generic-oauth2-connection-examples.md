---
description: This document covers generic OAuth 1.0/2.0 examples.
toc: true
---

# Generic OAuth 1.0 and 2.0 Examples

::: note
  The recommended method for creating custom Social Connections is to use Auth0's <a href="/extensions/custom-social-extensions">Custom Social Connections Extension</a>. The information in this article should be used for reference purposes only. 
:::

Adding [OAuth 1.0](/oauth1) and [OAuth 2.0](/oauth2) providers as Connections allow you to support providers that are not currently built-in to the [Auth0 Management Dashboard](${manage_url}), like [DigitalOcean](#digitalocean), [Tumblr](#tumblr), and more.

This document covers examples of OAuth 1.0/2.0 Connections that you can create by making the appropriate `POST` call to the [Auth0 APIv2's Connections endpoint](/api/v2#!/Connections/post_connections). Please note that doing so requires an [APIv2 token](/api/v2/tokens) with `create:connections` scope.

## DigitalOcean

1. Navigate to [Digital Ocean](https://cloud.digitalocean.com/login).
2. If you have not already registered a Digital Ocean application, you will need to do so prior to continuing.
3. Once available, copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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

## Dribbble

1. Navigate to [Dribble](https://dribbble.com/account/applications/new).
2. If you have not already registered a new Dribble consumer, you will need to do so prior to continuing. If you have, set the `Redirect URI` of your application to `https://${account.namespace}/login/callback`.
3. Copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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
		"text": "{ \"name\": \"dribbble\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR_DRIBBLE_CLIENT_ID\", \"client_secret\": \"YOUR_DRIBBLE_CLIENT_SECRET\", \"authorizationURL\": \"https://dribbble.com/oauth/authorize\", \"tokenURL\": \"https://dribbble.com/oauth/token\", \"scope\": [\"public\"], \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb) { request.get('https://api.dribbble.com/v1/user', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.id; profile.picture = profile.avatar_url; cb(null, profile); });}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Imgur

1. Navigate to [Imgur](https://api.imgur.com/oauth2/addclient).
2. If you have not already registered an Imgur application, you will need to do so prior to continuing.
3. Once available, copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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

## JIRA

### Step 1: Generate an RSA Keypair

Generate an RSA keypair with the following command (or any equivalent method):

```bash
$ openssl genrsa -out EXAMPLE.key 2048 && openssl rsa -pubout -in EXAMPLE.key -out EXAMPLE.pub
```

### Step 2: Create a JIRA Application Link


From JIRA, go to **Administration** > **Application** > **Application Links**, and [create an Application Link](https://confluence.atlassian.com/display/APPLINKS-050/Application+Links+Documentation) with the following settings:

* **Application URL**: Any arbitrary URL (you can ignore the `No response was received from the URL` warnings);
* **Application Name**: Any arbitrary name;
* **Application Type**: Generic Application;
* **Create incoming link**: *checked*.

Leave all other options left blank.

To create the incoming link, use the following settings:

  * **Consumer Key**: Any arbitrary URL-friendly name (for example, `auth0-jira`)
  * **Consumer Name**: Any arbitrary name
  * **Public Key**: The RSA keypair previously generated in step 1 (copy and paste the entire `.pub` file)
  * **Consumer Callback URL**: `https://${account.namespace}/login/callback`

:::panel Updating Settings
If you need to modify these settings after you've created the application link, you can do so via the **Incoming Authentication** section of the link's settings.
:::

In the JSON below, replace all instances of the following placeholders:
  * `JIRA_URL`: The root URL of your JIRA instance (for example, `https://foo.atlassian.net`)
  * `CONSUMER_KEY`: The chosen Consumer Key for your application link
  * `CONSUMER_SECRET`: The previously generated private key (as a JSON string). You can convert `EXAMPLE.key` to a valid JSON string using the following command:

```bash
node -p -e 'JSON.stringify(require("fs").readFileSync("EXAMPLE.key").toString("ascii"));'
```

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
		"text": "{ \"name\": \"jira\", \"strategy\": \"oauth1\", \"options\": { \"consumerKey\", \"CONSUMER_KEY\", \"consumerSecret\": \"CONSUMER_SECRET\", \"requestTokenURL\": \"JIRA_URL/plugins/servlet/oauth/request-token\", \"accessTokenURL\": \"JIRA_URL/plugins/servlet/oauth/access-token\", \"userAuthorizationURL\": \"JIRA_URL/plugins/servlet/oauth/authorize\", \"signatureMethod\": \"RSA-SHA1\", \"scripts\": { \"fetchUserProfile\": \"function(token, tokenSecret, ctx, cb) {\n  // Based on passport-atlassian-oauth\n  // https://github.com/tjsail33/passport-atlassian-oauth/blob/a2e444b0c3969dfd7caf4524ce4a4c379656ba2e/lib/passport-atlassian-oauth/strategy.js\n  var jiraUrl = 'JIRA_URL';\n  var OAuth = new require('oauth').OAuth;\n  var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, '1.0', null, 'RSA-SHA1');\n  function oauthRequest(url, cb) {\n    return oauth._performSecureRequest(token, tokenSecret, 'GET', url, null, '', 'application/json', cb);\n  }\n  oauthRequest(jiraUrl + '/rest/auth/1/session', function(err, body, res) {\n    if (err) return cb(err);\n    if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n    var json;\n    try {\n      json = JSON.parse(body);\n    } catch(ex) {\n      return cb(new Error('Invalid JSON returned from JIRA', ex));\n    }\n    var profileUrl = jiraUrl + '/rest/api/2/user?expand=groups&username=' + encodeURIComponent(json.name);\n    oauthRequest(profileUrl, function(err, body, res) {\n      if (err) return cb(err);\n      if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n      try {\n        json = JSON.parse(body);\n      } catch(ex) {\n        return cb(new Error('Invalid JSON returned from JIRA', ex));\n      }\n      // Auth0-specific mappings, customize as n:qeeded\n      // https:///user-profile/normalized\n      return cb(null, {\n        user_id: json.name,\n        username: json.name,\n        email: json.emailAddress,\n        name: json.displayName,\n        groups: json.groups,\n        picture: json.avatarUrls['48x48'],\n        active: json.active,\n        self: json.self,\n        timezone: json.timeZone,\n        locale: json.locale\n      });\n    });\n  });\n}\n"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Tumblr

1. Navigate to [Tumblr](https://www.tumblr.com/oauth/apps).
2. If you have not already registered a new Tumblr application, you will need to do so prior to continuing.
3. Copy the `OAuth Consumer Key` and `Secret Key` for use with your cURL `POST`.

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

## Twitch

1. Navigate to [Twitch](http://www.twitch.tv/kraken/oauth2/clients/new).
2. If you have not already registered a Twitch application, you will need to do so prior to continuing.
3. Once available, copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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
		"text": "{ \"name\": \"twitch\", \"strategy\": \"oauth2\", \"options\": { \"client_id\", \"YOUR-TWITCH-CLIENT-ID\", \"client_secret\": \"YOUR-TWITCH-CLIENT-SECRET\", \"authorizationURL\": \"https://api.twitch.tv/kraken/oauth2/authorize\", \"tokenURL\": \"https://api.twitch.tv/kraken/oauth2/token\", \"scope\": [\"user_read\"], \"scripts\": { \"fetchUserProfile\": \"function(accessToken, ctx, cb){ request.get('https://api.twitch.tv/kraken/user', { headers: { 'Authorization': 'OAuth ' + accessToken, 'Accept': 'application/vnd.twitchtv.v3+json' } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.id = profile._id; delete profile._id; profile.links=profile._links; delete profile._links; return cb(null, profile);});}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Uber

1. Navigate to [Uber Developers](https://developer.uber.com/).
2. If you have not already [registered an Uber application](https://developer.uber.com/dashboard/create), you will need to do so prior to continuing. If you have, set the `Redirect URI` of your application to 'https://${account.namespace}/login/callback'.
3. Copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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

## Vimeo

1. Navigate to [Vimeo](https://dribbble.com/account/applications/new).
2. If you have not already registered a new Vimeo application, you will need to do so prior to continuing.
3. Copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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

## Xing

1. Navigate to [Xing](https://developer.xing.com/).
2. If you have not already registered a Xing application, you will need to do so prior to continuing.
3. Once available, copy the `Client ID` and `Client Secret` for use with your cURL `POST`.

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
