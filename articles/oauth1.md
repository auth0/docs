# Adding a generic OAuth1 Authorization Server to Auth0

The most common [identity providers](identityproviders) are readily available on Auth0's dashboard. However, you can add any __OAuth1 Authorization Server__ to Auth0 as an identity provider.

To create an arbitrary __OAuth1__ connection, you use __[Auth0's Connections API](/api/v2#!/Connections/post_connections)__. 

This example would create a custom Twitter connection:

```
curl -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_GLOBAL_CLIENT_ACCESS_TOKEN}' -d @twitter.json https://${account.namespace}/api/connections
```

```
{
  "name": "custom-twitter",
  "strategy": "oauth1",
  "options": {
    "client_id": "{YOUR_TWITTER_CLIENT_ID}",
    "client_secret": "{YOUR_TWITTER_CLIENT_SECRET}",
    "requestTokenURL": 'https://api.twitter.com/oauth/request_token',
    "accessTokenURL": 'https://api.twitter.com/oauth/access_token',
    "userAuthorizationURL": 'https://api.twitter.com/oauth/authenticate',
    "scripts": {
      "fetchUserProfile": "function (token, tokenSecret, ctx, cb) {var OAuth = new require('oauth').OAuth;var oauth = new OAuth(ctx.requestTokenURL,ctx.accessTokenURL,ctx.client_id,ctx.client_secret,'1.0',null,'HMAC-SHA1');oauth.get('https://api.twitter.com/1.1/users/show.json?user_id=' + ctx.user_id,token,tokenSecret,function(e, b, r) {if (e) return cb(e);if (r.statusCode !== 200) return cb(new Error('StatusCode: ' + r.statusCode));cb(null, JSON.parse(b));});}"
    }
  }
}
```

The key parameters for a connection are:

* **name**: this is how the connection can be referenced later on in Auth0 or in your app.
* **strategy**: this must be __oauth1__. It defines the protocol implemented by the provider.

The __options__ object:

* **client_id** and **client_secret** must be obtained from your provider.
* **requestTokenURL**: `https://api.twitter.com/oauth/request_token`
* **accessTokenURL**: `https://api.twitter.com/oauth/access_token`
* **userAuthorizationURL**: `https://api.twitter.com/oauth/authenticate`
* **fetchUserProfile**: Auth0 allows you to define a custom script that returns a JSON object with user info. What you do in the script is up to you. For convenience, the __[OAuth](https://www.npmjs.com/package/oauth)__ module is included to simplify OAuth1 calls.

The script will have the following signature:

```
function(token, tokenSecret, ctx, callback){
  
  var profile = {
    user_id: '123',
    given_name: 'Eugenio',
    family_name: 'Pace',
    email: 'eugenio@mail.com'
  };

  callback(null, profile);
}
```

The `token` and `tokenSecret` parameters will often be used for authenticating requests to the provider's API. 

> We recommend using the field names in the [normalized profile](/user-profile).

Notice that you can manipulate the profile returned from the provider to filter/remove/add anything in it. However, we recommend you keep this script as simple as possible. More sophisticated manipulation of the user information can be achieved through [Rules](/rules). 

>One advantage of using Rules is that they apply to __any__ connection.

## Using your new connection

You can use any of the Auth0 standard mechanisms to login a user with the new connection (e.g. direct links, [Auth0 Lock](lock), [auth0.js](auth0js), etc.). 

A direct link would look like:
            
    https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION


## Other resources

* [Custom OAuth2/OAuth1 Connections samples](oauth2-examples)
* [Identity Providers in Auth0](identityproviders)
* [Protocols](protocols)
* [Custom OAuth2 Connections](oauth2)
