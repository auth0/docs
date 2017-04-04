---
section: libraries
toc: true
description: How to install, initialize and use auth0.js v8
---
<div class="alert alert-info">
This document covers the most up-to-date version of auth0.js - version 8. We recommend using this version, but if you are already using version 7, you can access it using the dropdown at the top of this document. If you are interested in upgrading to this version, take a look at the <a href="/libraries/auth0js/v8/migration-guide">v8 migration guide</a>.
</div>
 
# Auth0.js v8 Reference

Auth0.js is a client-side library for Auth0. Using auth0.js in your web apps makes it easier to do authentication and authorization with Auth0 in your web apps.

## Ready-to-go example

The [example directory](https://github.com/auth0/auth0.js/tree/master/example) of the auth0.js library is a ready-to-go app that can help you to quickly and easily try out auth0.js. In order to run it, follow these quick steps:
1. If you don't have [node](http://nodejs.org/) installed, do that now
1. Download dependencies by running `npm install` from the root of this project
1. Finally, execute `npm start` from the root of this project, and then browse to your app running on the node server, presumably at `http://localhost:3000/example`.

## Setup and initialization

Now, let's get started integrating auth0.js into your project. We'll cover [methods of installation](#installation-options), [how to initialize auth0.js](#initialization), [signup](#signup), [login](#login), [logout](#logout), and more!

### Installation options

You have a few options for using auth0.js in your project. Pick one of the below depending on your needs:

Install via [npm](https://npmjs.org):

```sh
npm install auth0-js
```

Install via [bower](http://bower.io):

```sh
bower install auth0.js
```
```html
<script src="bower_components/auth0.js/build/auth0.min.js"></script>
```

Include via our CDN:

```html
<script src="${auth0js_urlv8}"></script>
```

>Note that for production use, the latest patch release (for example, 8.0.0) is recommended, rather than the latest minor release indicated above.

If you are using a bundler, you will want to install with `npm i auth0-js --production --save`.

### Initialization

Initialize a new instance of the Auth0 client as follows:

```html
<script src="https://cdn.auth0.com/js/auth0/8.0.4/auth0.min.js"></script>
<script type="text/javascript">
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });
</script>
```

#### Available parameters

There are two required parameters that must be passed in the `options` object when instantiating `webAuth`, and more that are optional.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `domain` | required | (String) Your Auth0 account domain (ex. myaccount.auth0.com) |
| `client_id` | required | (String) Your Auth0 client\_id |
| `redirectUri` | optional | (String)  The default `redirectUri` used. Defaults to an empty string (none). |
| `scope` | optional | (String)  The default scope(s) used by the application. Using scopes can allow you to return specific claims for specific fields in your request. You should read our [documentation on scopes](/scopes) for further details. |
| `audience` | optional | (String)  The default audience used for requesting API access. |
| `responseType` | optional | (String)  The default `responseType` used. The value must be `'token'` or `'code'`. It defaults to `'token'`, unless a `redirectUri` is provided, then it defaults to `'code'`. |
| `responseMode` | optional | (String)  This option is omitted by default. Can be set to `'form_post'` in order to send the token or code to the `'redirectUri'` via POST. |
| `_disableDeprecationWarnings` | optional | (Boolean)  Disables the deprecation warnings, defaults to `false`. |

## Login

You can choose a method for login based on the type of auth you need in your application.

### webAuth.authorize()

The `authorize` method can be used for logging in users via the [Hosted Login Page](/libraries/auth0js#hosted-login-page), or via social connections, as exhibited in the examples below. This method can take a variety of parameters via the `options` object. 

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `audience` | required | (String) Your Auth0 account domain (ex. myaccount.auth0.com). |
| `scope` | required | (String) The scopes which you want to request authorization for. These must be separated by a space. You can request any of the standard OIDC scopes about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a refresh token. |
| `response_type` | required | (String) The value must be `'token'` or `'code'`. It defaults to `'token'`, unless a `redirectUri` is provided, then it defaults to `'code'`. |
| `client_id` | optional | (String)  Your Auth0 client ID. |
| `state` | recommended | (String)  An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | optional | (String) The URL to which Auth0 will redirect the browser after authorization has been granted for the user. |

For hosted login, one must call the `authorize` endpoint:

```js
webAuth.authorize({ 
  //Any additional options can go here 
});
```

If `authorize` is called without any parameters, it will use those which were set when `webAuth` was instantiated. The first required parameter, `client_id`, will be thus passed into `authorize`. The second required parameter is `response_type`, and this will either be acquired from the same place, or, if it was never set, default to `token` in most cases.

For social logins, the `connection` parameter will need to be specified:

```js
webAuth.authorize({
  connection: 'twitter'
});
```

### webAuth.popup.authorize()

For popup authentication the `popup.authorize` method can be used. 

Hosted login with popup:

```js
webAuth.popup.authorize({ 
  //Any additional options can go here 
});
```

And for social login with popup using `authorize`:

```js
webAuth.popup.authorize({
  connection: 'twitter'
});
```

### webAuth.redirect.loginWithCredentials()

To login using redirect with credentials to enterprise connections, the `redirect.loginWithCredentials` method is used.


```js
webAuth.redirect.loginWithCredentials({
  connection: 'Username-Password-Authentication',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid'
});
```

### webAuth.popup.loginWithCredentials()

To login using popup mode with credentials to enterprise connections, the `popup.loginWithCredentials` method is used.


```js
webAuth.popup.loginWithCredentials({
  connection: 'Username-Password-Authentication',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid'
});
```

### webAuth.client.login()

The `client.login` method allows for non redirect auth using custom database connections, using /`oauth/token`.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `username` | required | (String) The username to present for authentication |
| `password` | required | (String) The password to prevent for authentication |
| `realm` | required | (String) The name of the database connection against which to authenticate. |
| `scope` | optional | (String) The scopes which you want to request authorization for. These must be separated by a space. You can request any of the standard OIDC scopes about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a refresh token. |
| `audience` | optional | (String) Your Auth0 account domain (ex. myaccount.auth0.com). |

```js
webAuth.client.login({
  realm: 'tests',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid profile',
  audience: 'urn:test'
});
```

### buildAuthorizeUrl(options)

The `buildAuthorizeUrl` method can be used to build the `/authorize` URL, in order to initialize a new transaction. Use this method if you want to implement browser based (passive) authentication.

```js
// Calculate URL to redirect to
  var url = webAuth.client.buildAuthorizeUrl({
    clientID: '${account.clientId}', // string
    responseType: 'token', // code or token
    redirectUri: '${account.callback}',
    state: 'YOUR_STATE'
  });
  
  // Redirect to url
  // ...
```  

__NOTE__: The `state` parameter, is not required, but it is recommended. It is an opaque value that Auth0 will send back to you. This method helps prevent CSRF attacks.

### Passwordless login

Passwordless authentication allows users to log in by receiving a one-time password via email or text message. The process will require you to start the Passwordless process, generating and dispatching a code to the user, (or a code within a link), followed by accepting their credentials via the verification method. That could happen in the form of a login screen which asks for their (email or phone number) and the code you just sent them. It could also be implemented in the form of a Passwordless link instead of a code sent to the user. They would simply click the link in their email or text and it would hit your endpoint and verify this data automatically using the same verification method (just without manual entry of a code by the user).

#### Start passwordless

The `passwordlessStart` method requires several parameters to be passed within its `options` object:

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `connection` | required | (String) Specifies how to send the code/link to the user. Value must be either `email` or `sms`. |
| `send` | required | (String) Value must be either `code` or `link`. If `null`, a link will be sent. |
| `phoneNumber` | optional | (String) The user's phone number for delivery of a code or link via SMS. |
| `email` | optional | (String) The user's email for delivery of a code or link via email. |

Note that exactly _one_ of the optional `phoneNumber` and `email` parameters must be sent in order to start the Passwordless transaction. 

```js
webAuth.passwordlessStart({
    connection: 'email',
    send: 'code',
    email: 'foo@bar.com'
  }, function (err,res) {
    // handle errors or continue
  }
);
```

#### Verify passwordless

The `passwordlessVerify` method requires several paramters to be sent in its `options` object:

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `connection` | required | (String) Specifies how to send the code/link to the user. Value must be either `email` or `sms` and the same as the value passed to `passwordlessStart`. |
| `verificationCode` | required | (String) The code sent to the user, either as a code or embedded in a link. |
| `phoneNumber` | optional | (String) The user's phone number to which the code or link was delivered via SMS. |
| `email` | optional | (String) The user's email to which the code or link was delivered via email. |

Note that, as with `passwordlessStart`, exactly _one_ of the optional `phoneNumber` and `email` parameters must be sent in order to verify the Passwordless transaction. 

::: panel-info passwordlessVerify required WebAuth options
In order to use `passwordlessVerify`, the options `redirectUri` and `responseType: 'token'` must be specified when first initializing WebAuth.
:::

```js
webAuth.passwordlessVerify({
    connection: 'email',
    email: 'foo@bar.com',
    verificationCode: '389945'
  }, function (err,res) {
    // handle errors or continue
  }
);
```

## Extract the authResult and get user info

After authentication occurs, the `parseHash` method parses a URL hash fragment to extract the result of an Auth0 authentication response. 

The `parseHash` method takes an `options` object that contains the following parameters:

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `state` | optional | (String) An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks. |
| `nonce` | optional | (String) Used to verify the `id_token`
| `hash` | optional | (String) The URL hash (if not provided, `window.location.hash` will be used by default) |

::: panel-info RS256 Requirement
This method requires that your tokens are signed with RS256 rather than HS256. For more information about this, check the [Auth0.js v8 Migration Guide](/libraries/auth0js/migration-guide#the-parsehash-method).
:::

The contents of the authResult object returned by `parseHash` depend upon which authentication parameters were used. It can include:

| **Item** | **Description** |
| --- | --- | 
| `accessToken` | An access token for the API, specified by the `audience` |
| `expiresIn` |  A string containing the expiration time (in seconds) of the `accessToken` |
| `idToken` |  An id token JWT containing user profile information |

```js
auth0.parseHash(window.location.hash, function(err, authResult) {
  if (err) {
    return console.log(err);
  }

  auth0.client.userInfo(authResult.accessToken, function(err, user) {
    // Now you have the user's information
  });
});
```

As shown above, the `client.userInfo` method can be called passing the returned `authResult.accessToken`. It will make a request to the `/userinfo` endpoint and return the `user` object, which contains the user's information, similar to the below example.

```json
{
    "email_verified": "false",
    "email": "test@example.com",
    "clientID": "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH",
    "updated_at": "2017-02-07T20:50:33.563Z",
    "name": "tester9@example.com",
    "picture": "https://gravatar.com/avatar/example.png",
    "user_id": "auth0|123456789012345678901234",
    "nickname": "tester9",
    "identities": [
        {
            "user_id": "123456789012345678901234",
            "provider": "auth0",
            "connection": "Username-Password-Authentication",
            "isSocial": "false"
        }
    ],
    "created_at": "2017-01-20T20:06:05.008Z",
    "sub": "auth0|123456789012345678901234"
}
```

You can now do something else with this information as your application needs, such as acquire the user's entire set of profile information with the Management API, as described below.

## Using `nonce`

By default, `auth0.js` will generate a random `nonce` when you call `auth0.authorize`, store it in local storage, and pull it out in `auth0.parseHash`. The default behavior should work in most cases, but some use cases may require a developer to control the `nonce`.
If you want to use a developer generated `nonce`, then you must provide it as an option to both `auth0.authorize` and `auth0.parseHash`.

```js
  auth0.authorize({nonce: '1234'});
  auth0.parseHash({nonce:'1234'}, callback);
```

## Logout

To log out a user, use the `logout` method. This method accepts an options object, which can include the following parameters.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `returnTo` | optional | (String) URL to redirect the user to after the logout. |
| `client_id` | optional | (String) Your Auth0 client ID |
| `federated` | optional | (Querystring parameter) Add this querystring parameter to the logout URL, to log the user out of their identity provider, as well: `https://${account.namespace}/v2/logout?federated`. |

::: panel-info returnTo parameter
Note that if the `client_id` parameter _is_ included, the `returnTo` URL that is provided must be listed in the Client's **Allowed Logout URLs** in the [Auth0 dashboard](${manage_url}). 
However, if the `client_id` parameter _is not_ included, the `returnTo` URL must be listed in the **Allowed Logout URLs** at the *account level* in the [Auth0 dashboard](${manage_url}).
:::

```js
webAuth.logout({
  returnTo: 'some url here',
  client_id: 'some client ID here'
});
```

## Sign up
 
To sign up a user, use the `signup` method. This method accepts an options object, which can include the following parameters.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `client_id` | required | (String) Your Auth0 client ID |
| `email` | required | (String) User's email address |
| `password` | required | (String) User's desired password |
| `connection` | required | (String) The database connection name on your client upon which to attempt user account creation |

Note that signups should be for database connections. Here is an example of the `signup` method and some sample code for a form. 

```html 
<h2>Signup Database Connection</h2> 
<input class="signup-email" /> 
<input type="password" class="signup-password" /> 
<input type="button" class="signup-db" value="Signup!" /> 
<script type="text/javascript"> 
    $('.signup-db').click(function (e) { 
        e.preventDefault(); 
        webAuth.signup({ 
            connection: 'Username-Password-Authentication', 
            email: $('.signup-email').val(), 
            password: $('.signup-password').val()
        }, function (err) { 
            if (err) return alert('Something went wrong: ' + err.message); 
            return alert('success signup without login!') 
        }); 
    }); 
</script> 
``` 

## Using renewAuth to acquire new tokens

The `renewAuth` method allows you to acquire a new token from Auth0 for a user who is already authenticated against the [hosted login page](/hosted-pages/login) for your domain. The method accepts any valid OAuth2 parameters that would normally be sent to `authorize`.


```js
webAuth.renewAuth({
  audience: 'https://example.com/api/v2',
  scope: 'read:something write:otherthing',
  redirectUri: 'https://example.com/auth/silent-callback',
  usePostMessage: true
}, function (err, authResult) {
    ...
});
```

::: panel-info postMessage Parameter
This will use postMessage to comunicate between the silent callback and the SPA. When false, the SDK will attempt to parse the URL hash, should ignore the URL hash, and no extra behaviour is needed.
:::

The actual redirect to `/authorize` happens inside an iframe, so it will not reload your application or redirect away from it. However, it is strongly recommended to have a dedicated callback page for silent authentication in order to avoid the delay of loading your entire application again inside an iframe. 

This callback page should only parse the URL hash and post it to the parent document, so that your application can take action depending on the outcome of the silent authentication attempt. The callback page should be something like the following one. It will parse the URL hash and post it to the parent document:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.auth0.com/js/auth0/8.0.4/auth0.min.js"></script>
    <script type="text/javascript">
      var webAuth = new auth0.WebAuth({
        domain: '${account.namespace}',
        clientID: '...'
      });
      var result = webAuth.parseHash(window.location.hash, function(err, data) {
        parent.postMessage(err || data, "https://example.com/");
      });
    </script>
  </head>
  <body></body>
</html>
```

Remember to add the URL of the silent authentication callback page that you create to the **Allowed Callback URLs** list of your Auth0 client in the [Auth0 Dashboard](${manage_url}) under your client's *Settings*.

## Password reset requests

If attempting to set up a password reset functionality, you'll use the `changePassword` method and pass in an "options" object, with a "connection" parameter and an "email" parameter.

```js
  $('.change_password').click(function () {
    webAuth.changePassword({
      connection: 'db-conn',
      email:   'foo@bar.com'
    }, function (err, resp) {
      if(err){
        console.log(err.message);
      }else{
        console.log(resp);
      }
    });
  });
```

The user will then receive an email which will contain a link that they can follow to reset their password.

## User management 

The Management API provides functionality that allows you to link and unlink separate user accounts from different providers, tying them to a single profile (Read more about [Linking Accounts](/link-accounts) with Auth0). It also allows you to update user metadata.

To get started, create a new `auth0.Management` instance by passing it the account's Auth0 domain, and the token for the primary identity. In the case of linking users, this primary identity is the user profile that you want to "keep" the data for, and which you plan to link other identities to.

```js
var auth0Manage = new auth0.Management({
  domain: '${account.namespace}',
  token: "YOUR_PRIMARY_IDENTITY_TOKEN"
});
```

### Getting the user profile

In order to get the user profile data, use the `getUser()` method, with the `userId` and a callback as parameters. The method returns the user profile. Note that the `userID` required here will be the part after the delimiter if using the `user_id` fetched from the `client.userInfo` method.

```js
auth0Manage.getUser(userId, cb);
```

### Updating the user profile

When updating user metadata, you will need to first create a `userMetadata` object, and then call the `patchUserMetadata` method, passing it the user id and the `userMetadata` object you created. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata. Visit the [User Metadata](/metadata) documentation for more details on user metadata.

```js
auth0Manage.patchUserMetadata(userId, userMetadata, cb);
```

### Linking users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `linkUser` method accepts two parameters, the primary user id and the secondary user token (the token obtained after login with this identity). The user id in question is the unique identifier for this user account. If the id is in the format `facebook|1234567890`, the id required is the portion after the delimiting pipe. Visit the [Linking Accounts](/link-accounts) documentation for more details on linking accounts.

```js
auth0Manage.linkUser(userId, secondaryUserToken, cb);
```

::: panel-info Linking - Metadata
Note that when accounts are linked, the secondary account's metadata is **not** merged with the primary account's metadata, and if they are ever unlinked, the secondary account will likewise not retain the primary account's metadata when it becomes separate again.
:::
