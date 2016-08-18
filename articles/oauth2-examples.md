# Generic OAuth2 or OAuth1 Examples

The [OAuth2](oauth2) or [OAuth1](oauth1) connections give you the ability to support any OAuth2/OAuth1 providers in addition to the ones that are available in the dashboard.

Here are a few examples of OAuth2/OAuth1 connections you can create through the [Management Auth0 API v2](/api/v2#!/Connections/post_connections). You will require a [Management API V2 token](/api/v2/tokens) with `create:connections` scope to invoke the API. Save these snippets to a file (sample-connection.json) and then use cURL to call the Management API:

```
curl -vX POST https://${account.namespace}/api/v2/connections -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_API_V2_TOKEN}' -d @sample-connection.json
```

After the call completes successfully, you will be able to login using these new providers.

## Uber

* [Create an application](https://developer.uber.com/apps/new)
* Set the `Redirect URI` to [https://${account.namespace}/login/callback](https://${account.namespace}/login/callback).
* Copy `Client ID` and `Secret` to config file below

```
{
  "name": "uber",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR_UBER_APP_KEY}",
    "client_secret": "{YOUR_UBER_APP_SECRET}",
    "authorizationURL": "https://login.uber.com/oauth/authorize",
    "tokenURL": "https://login.uber.com/oauth/token",
    "scope": ["profile"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://api.uber.com/v1/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.uuid; cb(null, profile); });}"
    }
  }
}
```
## DigitalOcean

* [Create an application](https://cloud.digitalocean.com/settings/applications/new)
* Copy `Client Id` and `Client Secret` to config file below

```
{
  "name": "digitalocean",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR-DIGITAL-OCEAN-CLIENT-ID}",
    "client_secret": "{YOUR-DIGITAL-OCEAN-CLIENT-SECRET}",
    "authorizationURL": "https://cloud.digitalocean.com/v1/oauth/authorize",
    "tokenURL": "https://cloud.digitalocean.com/v1/oauth/token",
    "scope": ["read"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://api.digitalocean.com/v2/account', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b).account; profile.user_id = profile.uuid; cb(null, profile); });}"
    }
  }
}
```

## Imgur

* [Create an application](https://api.imgur.com/oauth2/addclient)
* Copy `Client ID` and `Client Secret` to config file below


```
{
  "name": "imgur",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR-IMGUR-CLIENT-ID}",
    "client_secret": "{YOUR-IMGUR-CLIENT-SECRET}",
    "authorizationURL": "https://api.imgur.com/oauth2/authorize",
    "tokenURL": "https://api.imgur.com/oauth2/token",
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://api.imgur.com/3/account/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b).data; profile.user_id = profile.id; cb(null, profile); });}"
    }
  }
}
```

## Xing

* [Create an application](https://developer.xing.com/applications/dashboard)
* Copy `Consumer Key` and `Consumer Secret` to config file below

```
{
  "name": "xing",
  "strategy": "oauth1",
  "options": {
    "client_id": "{YOUR-XING-CONSUMER-KEY}",
    "client_secret": "{YOUR-XING-CONSUMER-SECRET}",
    "requestTokenURL": "https://api.xing.com/v1/request_token",
    "accessTokenURL": "https://api.xing.com/v1/access_token",
    "userAuthorizationURL": "https://api.xing.com/v1/authorize",
    "scripts": {
      "fetchUserProfile": "function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://api.xing.com/v1/users/me.json',token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode)); var p = JSON.parse(b); var profile = p.users[0]; cb(null, profile); });}"
    }
  }
}
```

## Twitch

* [Create an application](http://www.twitch.tv/kraken/oauth2/clients/new)
* Copy `Client ID` and `Client Secret` to config file below

```
{
  "name": "twitch",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR-TWITCH-CLIENTID}",
    "client_secret": "{YOUR-TWITCH-CLIENTSECRET}",
    "authorizationURL": "https://api.twitch.tv/kraken/oauth2/authorize",
    "tokenURL": "https://api.twitch.tv/kraken/oauth2/token",
    "scope": ["user_read"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb){ request.get('https://api.twitch.tv/kraken/user', { headers: { 'Authorization': 'OAuth ' + accessToken, 'Accept': 'application/vnd.twitchtv.v3+json' } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.id = profile._id; delete profile._id; profile.links=profile._links; delete profile._links; return cb(null, profile);});}"
    }
  }
```

## Dribbble

* [Register a new Consumer in Dribbble](https://dribbble.com/account/applications/new)
* Set the `Redirect URI` to [https://${account.namespace}/login/callback](https://${account.namespace}/login/callback).
* Copy `Client ID` and `Client Secret` to config file below

```
{
  "name": "dribbble",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR DRIBBLE CLIENT ID}",
    "client_secret": "{YOUT DRIBBBLE CLIENT SECRET}",
    "authorizationURL": "https://dribbble.com/oauth/authorize",
    "tokenURL": "https://dribbble.com/oauth/token",
    "scope": ["public"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://api.dribbble.com/v1/user', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.id; profile.picture = profile.avatar_url; cb(null, profile); });}"
    }
  }
}
```

## Vimeo

* [Create an application](https://developer.vimeo.com/apps/new)
* Copy `Client Identifier` and `Client Secrets` to config file below

```
{
  "name": "vimeo",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR-VIMEO-CLIENT-IDENTIFIER}",
    "client_secret": "{YOUR-VIMEO-CLIENT-SECRET}",
    "authorizationURL": "https://api.vimeo.com/oauth/authorize",
    "tokenURL": "https://api.vimeo.com/oauth/access_token",
    "scope": ["public"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://api.vimeo.com/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); var profile = JSON.parse(b); profile.user_id = profile.uri; cb(null, profile); });}"
    }
  }
}
```

## Tumblr

* [Create an application](https://www.tumblr.com/oauth/apps)
* Copy `OAuth Consumer Key` and `Secret Key` to config file below

```
{
  "name": "tumblr",
  "strategy": "oauth1",
  "options": {
    "client_id": "{YOUR-TUMBLR-CONSUMER-KEY}",
    "client_secret": "{YOUR-TUMBLR-SECRET-KEY}",
    "requestTokenURL": "https://www.tumblr.com/oauth/request_token",
    "accessTokenURL": "https://www.tumblr.com/oauth/access_token",
    "userAuthorizationURL": "https://www.tumblr.com/oauth/authorize",
    "scripts": {
        "fetchUserProfile": "function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://api.tumblr.com/v2/user/info',token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));var user = JSON.parse(b).response.user; user.user_id = user.name; cb(null, user);});}"
    }
  }
}
```

## Atlassian JIRA

Generate an RSA keypair with the following command or any equivalent method:

```bash
$ openssl genrsa -out EXAMPLE.key 2048 && openssl rsa -pubout -in EXAMPLE.key -out EXAMPLE.pub
```

From JIRA, create an [Application Link](https://confluence.atlassian.com/display/APPLINKS-050/Application+Links+Documentation) (under Administration > Applications > Application links) with the following settings:
  * Application URL: arbitrary URL, e.g. `https://${account.namespace}` (ignore warnings about "No response was received from the URL")
  * Application Name: arbitrary name, e.g. `Auth0`
  * Application Type: Generic Application
  * Create incoming link: checked
  * All other options left blank

When creating the incoming link, use the following settings:
  * Consumer Key: arbitrary URL-friendly name, e.g. `auth0-jira`
  * Consumer Name: arbitrary name, e.g. `Auth0`
  * Public Key: the previously generated public key (copy and paste entire `.pub` file)
  * Consumer Callback URL: `https://${account.namespace}/login/callback`

> Note: If you need to modify these settings on JIRA after having created the application link, they can be found in the "Incoming Authentication" section of the link's settings.

In the JSON below, replace all instances of the following placeholders:
  * `{JIRA_URL}`: The root URL of your JIRA instance, e.g. `https://foo.atlassian.net`
  * `{CONSUMER_KEY}`: The chosen Consumer Key for your application link
  * `{CONSUMER_SECRET}`: The previously generated private key, as a JSON string. You can convert `EXAMPLE.key` to a valid JSON string using the following command:

```bash
node -p -e 'JSON.stringify(require("fs").readFileSync("EXAMPLE.key").toString("ascii"));'
```

```
{
  "options": {
    "name": "jira",
    "strategy": "oauth1",
    "consumerKey": "{CONSUMER_KEY}"  ,
    "consumerSecret": "{CONSUMER_SECRET}",
    "requestTokenURL": "{JIRA_URL}/plugins/servlet/oauth/request-token",
    "accessTokenURL": "{JIRA_URL}/plugins/servlet/oauth/access-token",
    "userAuthorizationURL": "{JIRA_URL}/plugins/servlet/oauth/authorize",
    "signatureMethod": "RSA-SHA1",
    "scripts": {
    "fetchUserProfile": "function(token, tokenSecret, ctx, cb) {\n  // Based on passport-atlassian-oauth\n  // https://github.com/tjsail33/passport-atlassian-oauth/blob/a2e444b0c3969dfd7caf4524ce4a4c379656ba2e/lib/passport-atlassian-oauth/strategy.js\n  var jiraUrl = '{JIRA_URL}';\n  var OAuth = new require('oauth').OAuth;\n  var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, '1.0', null, 'RSA-SHA1');\n  function oauthRequest(url, cb) {\n    return oauth._performSecureRequest(token, tokenSecret, 'GET', url, null, '', 'application/json', cb);\n  }\n  oauthRequest(jiraUrl + '/rest/auth/1/session', function(err, body, res) {\n    if (err) return cb(err);\n    if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n    var json;\n    try {\n      json = JSON.parse(body);\n    } catch(ex) {\n      return cb(new Error('Invalid JSON returned from JIRA', ex));\n    }\n    var profileUrl = jiraUrl + '/rest/api/2/user?expand=groups&username=' + encodeURIComponent(json.name);\n    oauthRequest(profileUrl, function(err, body, res) {\n      if (err) return cb(err);\n      if (res.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));\n      try {\n        json = JSON.parse(body);\n      } catch(ex) {\n        return cb(new Error('Invalid JSON returned from JIRA', ex));\n      }\n      // Auth0-specific mappings, customize as n:qeeded\n      // https:///user-profile/normalized\n      return cb(null, {\n        user_id: json.name,\n        username: json.name,\n        email: json.emailAddress,\n        name: json.displayName,\n        groups: json.groups,\n        picture: json.avatarUrls['48x48'],\n        active: json.active,\n        self: json.self,\n        timezone: json.timeZone,\n        locale: json.locale\n      });\n    });\n  });\n}\n"
    }
  }
}
```
