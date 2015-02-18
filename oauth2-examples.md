# Generic OAuth2 Examples

The [OAuth2](oauth2) connection gives you the ability to support any OAuth2 provider in addition to the ones that are availble in the dashboard.

Here are a few examples of OAuth2 connections you can create through the API. Save these snippets to a file (sample-connection.json) and then use cURL to call the API:

```
curl -vX POST https://@@account.namespace@@/api/connections -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_GLOBAL_CLIENT_ACCESS_TOKEN}' -d @sample-connection.json
```

After the call completes successfuly, you will be able to login using these new providers.

## Dropbox

* [Create an application](https://www.dropbox.com/developers/apps/create)* Set `Redirect URI` to [https://@@account.namespace@@/login/callback](https://@@account.namespace@@/login/callback).
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

##Uber

* [Create an application](https://developer.uber.com/apps/new) 
* Set the `Redirect URI` to [https://@@account.namespace@@/login/callback](https://@@account.namespace@@/login/callback).
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

