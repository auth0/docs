# Generic OAuth2 or OAuth1 Examples

The [OAuth2](oauth2) or [OAuth1](oauth1) connections give you the ability to support any OAuth2/OAuth1 providers in addition to the ones that are available in the dashboard.

Here are a few examples of OAuth2/OAuth1 connections you can create through the [Auth0 API v2](/api/v2#!/Connections/post_connections). You will require an [API V2 token](/api/v2/tokens) with `create:connections` scope to invoke the API. Save these snippets to a file (sample-connection.json) and then use cURL to call the API:

```
curl -vX POST https://${account.namespace}/api/v2/connections -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_API_V2_TOKEN}' -d @sample-connection.json
```

After the call completes successfully, you will be able to login using these new providers.

## Dropbox

* [Create an application](https://www.dropbox.com/developers/apps/create)
* Set `Redirect URI` to [https://${account.namespace}/login/callback](https://${account.namespace}/login/callback).
* Copy `App Key` and `App Secret`:

```
{
  "name": "dropbox",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR_DROPBOX_APP_KEY}",
    "client_secret": "{YOUR_DROPBOX_APP_SECRET}",
    "authorizationURL": "https://www.dropbox.com/1/oauth2/authorize",
    "tokenURL": "https://api.dropbox.com/1/oauth2/token",
    "scope": [],
    "scripts": {
      "fetchUserProfile": "function(accessToken,ctx,cb){request.get('https://api.dropbox.com/1/account/info',{headers:{'Authorization':'Bearer '+accessToken}},function(e,r,b){if(e) return cb(e);if(r.statusCode!==200) return cb(new Error('StatusCode: '+r.statusCode));var profile=JSON.parse(b);cb(null,{user_id:profile.uid,family_name:profile.name_details.surname,given_name:profile.name_details.given_name,email:profile.email,email_verified:profile.email_verified,locale:profile.locale,is_paired:profile.is_paired,country:profile.country,dropbox_team:profile.team,dropbox_referral_link:profile.referral_link});});}"
    }
  }
}
```

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

## Bitbucket

* Register a new Consumer in Bitbucket
* Set the `Redirect URI` to [https://${account.namespace}/login/callback](https://${account.namespace}/login/callback).
* Copy `Consumer Key` and `Consumer Secret` to config file below

```
{
  "name": "bitbucket",
  "strategy": "oauth1",
  "options": {
    "client_id": "{YOUR BITBUCKET CONSUMER KEY}",
    "client_secret": "{YOUR BITBUCKET CONSUMER SECRET}",
    "requestTokenURL": "https://bitbucket.org/api/1.0/oauth/request_token",
    "accessTokenURL": "https://bitbucket.org/api/1.0/oauth/access_token",
    "userAuthorizationURL": "https://bitbucket.org/api/1.0/oauth/authenticate",
    "scripts": {
      "fetchUserProfile": "function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://bitbucket.org/api/1.0/user',token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode)); var p = JSON.parse(b); var profile = p.user; profile.picture = p.user.avatar; profile.id = p.user.username; cb(null, profile); });}"
    }
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
