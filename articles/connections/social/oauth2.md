---
connection: Generic OAuth2 Provider
image: /media/connections/oauth2.png
seo_alias: oauth2
index: 13
description: You can add any OAuth2 provider using the Auth0 Custom Social Connections extension.
---

# Add a generic OAuth2 Authorization Server to Auth0

The most common [identity providers](/identityproviders) are readily available on Auth0's dashboard. However, you can add any other OAuth2 provider using the **Custom Social Connections** [extension](${manage_url}/#/extensions).

![](/media/articles/connections/social/oauth2/custom-social-connections.png)

### The fetchUserProfile script

A custom `fetchUserProfile` script will be called after the user has logged in with the OAuth2 provider. Auth0 will execute this script to call the OAuth2 provider API and get the user profile:

```js
function(access_token, ctx, callback){
  // call the oauth2 provider and return a profile
  // here we are returning a "mock" profile, you can use this to start with to test the flow.
  var profile = {
    user_id: '123',
    given_name: 'Eugenio',
    family_name: 'Pace',
    email: 'eugenio@mail.com'
  };

  callback(null, profile);
}
```

The `access_token` parameter is used for authenticating requests to the provider's API.

**NOTE:** We recommend using the field names from the [normalized profile](/user-profile#normalized-user-profile).

For example, the following code will retrieve the user profile from the **GitHub** API:

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

You can filter, add or remove anything from the profile returned from the provider. However, it is recommended that you keep this script as simple as possible. More sophisticated manipulation of user information can be achieved through the use of [Rules](/rules). One advantage of using Rules is that they apply to *any* connection.

## Login using the custom connection

You can use any of the Auth0 standard mechanisms (e.g. direct links, [Auth0 Lock](/libraries/lock), [auth0.js](/libraries/auth0js), etc.) to login a user with the your custom connection.

A direct link would look like:

    https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=THE_NAME_OF_THE_CONNECTION

To add a custom connection in Lock, you can add a custom button by following the instructions at [Adding custom connections to lock](/libraries/lock/v9/ui-customization#adding-a-new-ui-element-using-javascript) and using this link as the button `href`.

## Other resources

* [Adding custom connections to lock](/libraries/lock/v9/ui-customization#adding-a-new-ui-element-using-javascript)
* [Generic OAuth2 or OAuth1 examples](/oauth2-examples)
* [Identity Providers supported by Auth0](/identityproviders)
* [Identity Protocols supported by Auth0](/protocols)
* [Add a generic OAuth1 Authorization Server to Auth0](/oauth1)
