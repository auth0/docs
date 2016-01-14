---
connection: Generic OAuth2 Provider
image:
---

# Add a generic OAuth2 Authorization Server to Auth0

The most common [identity providers](/identityproviders) are readily available on Auth0's dashboard. However, you can use [Auth0's Connections API](/api/v2#!/Connections/post_connections) to add any **OAuth2 Authorization Server** as an identity provider.

**NOTE:**  Auth0 implements the standard [Authorization Code Grant flow](/protocols#oauth-server-side).

## Create a custom connection

You will require an [API V2 token](/api/v2/tokens) with `create:connections` scope in order to invoke the  [Create Connection](/api/v2#!/Connections/post_connections) endpoint. 

The example below creates a new **Google** custom connection. 

```
curl -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_API_V2_TOKEN}' -d @google-oauth-connection.json https://${account.namespace}/api/v2/connections
```
With the **google-oauth-connection.json** file having:

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
  },
  "enabled_clients":["${account.clientId}"]
}
```

The key parameters for a connection are:

* **name**: how the connection will be referenced in Auth0 or in your app.
* **strategy**: defines the protocol implemented by the provider. This should always be `oauth2`.

You can optionally add:

* **options**: object containing:

  * **client_id** and **client_secret**: obtained from your provider.
  * **authorizationURL**: the URL where the transaction begins. Usually similar to `https://your.oauth2.server/oauth2/authorize`.
  * **tokenURL**: the URL Auth0 will use to exchange the `code` for an `access_token`. Usually similar to `https://your.oauth2.server/oauth2/token`.
  * **scope**: the scope parameters that you want to request consent for (e.g. `profile`, etc.).
  * **fetchUserProfile**: a custom script that returns a JSON object with user info.

* **enabled_clients**: array containing the identifiers of the clients for which the connection is to be enabled. If the array is empty or the property is not specified, no clients are enabled.

### Custom fetchUserProfile script

A custom `fetchUserProfile` script can be included in the `scripts` parameter to retrieve the user profile:

```js
function(access_token, ctx, callback){

  var profile = {
    user_id: '123',
    given_name: 'Eugenio',
    family_name: 'Pace',
    email: 'eugenio@mail.com'
  };

  callback(null, profile);
}
```

The `access_token` parameter can be used for authenticating requests to the provider's API.

**NOTE:** We recommend using the field names from the [normalized profile](/user-profile#normalized-user-profile).

For example, the following code will retrieve the user profile from **GitHub**:

```js
function(access_token, ctx, callback) {
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

You can filter, add or remove anything from the profile returned from the provider. However, it is recommended that you keep this script as simple as possible. More sophisticated manipulation of user information can be achieved through the use of [Rules](/rules). One advantage of using **Rules** is that they apply to *any* connection.

## Use your custom connection

You can use any of the Auth0 standard mechanisms (e.g. direct links, [Auth0 Lock](/lock), [auth0.js](/auth0js), etc.) to login a user with the your custom connection.

A direct link would look like:

    https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION

> To add a custom connection in lock, you can add a custom button following [this doc](/libraries/lock/ui-customization#adding-a-new-ui-element-using-javascript) and using this link as the button `href`.

## Other resources

* [Adding custom connections to lock](/libraries/lock/ui-customization#adding-a-new-ui-element-using-javascript)
* [Generic OAuth2 or OAuth1 examples](/oauth2-examples)
* [Identity Providers supported by Auth0](/identityproviders)
* [Identity Protocols supported by Auth0](/protocols)
* [Add a generic OAuth1 Authorization Server to Auth0](/oauth1)
