---
connection: Generic OAuth2 Provider
---

# Adding a generic OAuth2 Authorization Server to Auth0

The most common [identity providers](/identityproviders) are readily available on Auth0's dashboard. However, you can add any __OAuth2 Authorization Server__ to Auth0 as an identity provider.

> Auth0 implements the standard __[Authorization Code Grant flow](/protocols#1)__.

To create an arbitrary __OAuth2__ connection, you use __[Auth0's Connections API](/api/v1#!#post--api-connections)__. The example below, creates a new __Google__ custom connection:


```
curl -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_GLOBAL_CLIENT_ACCESS_TOKEN}' -d @google-oauth-connection.json https://@@account.namespace@@/api/connections
```

```
{
  "name": "custom-google-oauth2",
  "strategy": "oauth2",
  "options": {
    "client_id": "{YOUR_GOOGLE_CLIENT_ID}",
    "client_secret": "{YOUR_GOOGLE_CLIENT_SECRET}",
    "authorizationURL": "https://accounts.google.com/o/oauth2/auth",
    "tokenURL": "https://accounts.google.com/o/oauth2/token",
    "scope": ["profile", "email"],
    "scripts": {
      "fetchUserProfile": "function(accessToken, ctx, cb) { request.get('https://www.googleapis.com/userinfo/v2/me', { headers: { 'Authorization': 'Bearer ' + accessToken } }, function(e, r, b) { if (e) return cb(e); if (r.statusCode !== 200 ) return cb(new Error('StatusCode: ' + r.statusCode)); cb(null, JSON.parse(b)); }); }"
    }
  }
}
```

The key parameters for a connection are:

* **name**: this is how the connection can be referenced later on in Auth0 or in your app.
* **strategy**: this should always be __oauth2__. It defines the protocol implemented by the provider.

The __options__ object:

* **client_id** and **client_secret** must be obtained from your provider.
* **authorizationURL**: this is the endpoint where the transaction starts. Usually looks like: `https://your.oauth2.server/oauth2/authorize`.
* **tokenURL**: Auth0 will use this URL to exchange the `code` for an `access_token`. Looks like: `https://your.oauth2.server/oauth2/token`.
* **scope**: scope parameters that you want to request consent for (e.g. `profile`, etc.).
* **fetchUserProfile**: Auth0 allows you to define a custom script that returns a JSON object with user info. What you do in the script is up to you.

The script will have the following signature:

```
function(ctx,access_token,callback){

  var profile = {
    user_id: '123',
    goiven_name: 'Eugenio',
    family_name: 'Pace',
    email: 'eugenio@mail.com'
  };

  callback(null, profile);
}

```

The `access_token` parameter will often be used for authenticating requests to the provider's API.

For example, retrieving the user profile from __GitHub__ would look like:

```
function(ctx, access_token, callback) {
  request.get('https://api.github.com/user', {
      'headers': {\
          'Authorization': 'Bearer ' + access_token,
          'User-Agent': 'Auth0'
        }
    }, function(e,r,b){
    if( e ) return cb(e);
    if( r.statusCode !== 200 ) return callback(new Error('StatusCode:'+r.statusCode));
      callback(null,JSON.parse(b));
   });
}
```

> We recommend using the field names in the [normalized profile](/user-profile).

Notice that you can manipulate the profile returned from the provider to filter/remove/add anything in it. However, we recommend you keep this script as simple as possible. More sophisticated manipulation of the user information can be achieved through [Rules](/rules).

>One advantage of using Rules is that they apply to __any__ connection.

##Using your new connection

You can use any of the Auth0 standard mechanisms to login a user with the new connection (e.g. direct links, [Auth0 Lock](/lock), [auth0.js](/auth0js), etc.).

A direct link would look like:

    https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=@@account.callback@@&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION


##Other resources

* [Custom OAuth2/OAuth1 Connections samples](/oauth2-examples)
* [Identity Providers in Auth0](/identityproviders)
* [Protocols](/protocols)
* [Custom OAuth1 Connections](/oauth1)
