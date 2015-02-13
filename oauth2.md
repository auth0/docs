# Adding a generic OAuth2 Authorization Server to Auth0

The most common [identity providers](identityproviders) are readily available on Auth0's dashboard. However, you can add any __OAuth2 Authorization Server__ to Auth0 as an identity provider.

> Auth0 implements the standard __[Authorization Code Grant flow](protocols#1)__.

##1. Name the connection and configure Authorization Server endpoints

Give the connection a unique name. It has to be unique across all connections in your Auth0 account. 

The following endpoints are mandatory:

* **Authorization URL:** this is the endpoint where the transaction starts. Usually looks like: `https://your.oauth2.server/oauth2/authorize`

* **Token URL:** Auth0 will use this URL to exchange the `code` for an `access_token`. Looks like: `https://your.oauth2.server/oauth2/token`

##2. Configure optional parameters:

Some OAuth2 servers require additional parameters like: `scope` and additional headers.

##3. Configure the **FetchUserProfile** script

An area in which many (all) providers differ is the API they use to retrieve information about the logged-in user. They often use a completely non-standard data schema for representing a user. 

To accommodate any implementation, Auth0 allows you to simply define a script whose sole responsibility is to return a JSON object with user info. What you do in the script is up to you. The script will have the following signature:


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

> We recommend using the field names in the [normalized profile](user-profile).

Notice that you can manipulate the profile returned from the provider to filter/remove/add anything in it. However, we recommend you keep this script as simple as possible. More sophisticated manipulation of the user information can be achieved through [Rules](rules). 

>One advantage of using Rules is that they apply to __any__ connection.

##4. Login

You can't use the [Auth0 Lock](lock) directly with these connections. With Lock we tightly integrate the UI with the providers logos, resize them if needed, re-scale them, etc. However you can use any of the other supported methods (e.g. direct links, [auth0.js](auth0js), etc.). 

For example:

            
    https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=@@account.callback@@&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION

##5. Creating multiple custom connections

It is possible to create any number of these custom connections. You can use the __[Connections API](api#!#post--api-connections)__ to quickly define them. Here's an example of defining your own __Google connection__ using `curl`:

###Save this to a file `google-oauth-connection.json`

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

###Run `curl` to POST to the Auth0 API

```
curl -H "Content-Type: application/json" -H 'Authorization: Bearer {YOUR_GLOBAL_CLIENT_ACCESS_TOKEN}' -d @google-oauth-connection.json https://@@account.namespace@@/api/connections

```