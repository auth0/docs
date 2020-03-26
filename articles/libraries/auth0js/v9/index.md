---
section: libraries
toc: true
title: auth0.js v9 Reference
description: How to install, initialize and use auth0.js v9
topics:
  - libraries
  - auth0js
contentType:
  - index
  - how-to
useCase: add-login
---
# auth0.js v9 Reference

auth0.js is a client-side library for Auth0. It is recommended for use in single-page apps, preferably in conjunction with [Universal Login](/universal-login), which should be used whenever possible. Using auth0.js in your SPA makes it easier to do authentication and authorization with Auth0.

The full API documentation for the library is [here](https://auth0.github.io/auth0.js/index.html).

<%= include('../../../_includes/_embedded_login_warning') %>

## Ready-to-go example

The [example directory](https://github.com/auth0/auth0.js/tree/master/example) of the auth0.js library is a ready-to-go app that can help you to quickly and easily try out auth0.js. In order to run it, follow these quick steps:

1. If you don't have [node](http://nodejs.org/) installed, do that now
1. Download dependencies by running `npm install` from the root of this project
1. Finally, execute `npm start` from the root of this project, and then browse to your app running on the node server, presumably at `http://localhost:3000/example`.

## Setup and initialization

Now, let's get started integrating auth0.js into your project. We'll cover [methods of installation](#installation-options), [how to initialize auth0.js](#initialization), [signup](#signup), [login](#login), [logout](#logout), and more!

<%= include('../../_includes/_configure_embedded_login', { library: 'Auth0.js v9' }) %>


### Installation options

You have a few options for using auth0.js in your project. Pick one of the below depending on your needs:

Install via [npm](https://npmjs.org) or [yarn](https://yarnpkg.com):

```sh
npm install auth0-js

yarn add auth0-js
```

Include via our CDN:

```html
<script src="${auth0js_url}"></script>
```

If you are using a bundler, you will want to install with `npm i auth0-js --production --save`.

### Initialization

Initialize a new instance of the Auth0 application as follows:

```html
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
| `clientID` | required | (String) Your Auth0 client ID |
| `redirectUri` | optional* | (String)  The default `redirectUri` used. Defaults to an empty string (none). **If you do not provide a global `redirectUri` value here, you will need to provide a redirectUri value for *each* method you use.** |
| `scope` | optional | (String)  The default <dfn data-key="scope">scope(s)</dfn> used by the application. Using scopes can allow you to return specific claims for specific fields in your request. You should read our [documentation on scopes](/scopes) for further details. |
| `audience` | optional | (String)  The default audience to be used for requesting API access. |
| `responseType` | optional* | (String)  The default `responseType` used. It can be any space separated list of the values `code`, `token`, `id_token`. It defaults to `'token'`, unless a `redirectUri` is provided, then it defaults to `'code'`. **If you do not provide a global `responseType` value, you will need to provide a `responseType` value for *each* method you use.** |
| `responseMode` | optional | (String)  This option is omitted by default. Can be set to `'form_post'` in order to send the token or code to the `'redirectUri'` via POST. Supported values are `query`, `fragment` and `form_post`. |
| `leeway` | optional | (Integer) A value in seconds; leeway to allow for clock skew with regard to ID Token expiration times. |
| `_disableDeprecationWarnings` | optional | (Boolean)  Disables the deprecation warnings, defaults to `false`. |

::: note
Because of clock skew issues, you may occasionally encounter the error `The token was issued in the future`. The `leeway` parameter can be used to allow a few seconds of leeway to ID Token expiration times, to prevent that from occurring.
:::

##### Scope

The default `scope` value in auth0.js v9 is `openid profile email`.

::: panel Running auth0.js Locally
If you don't specify at least the above scope when initializing auth0.js, and you are running your website from `http://localhost` or `http://127.0.0.1`, calling the `getSSOData()` method will result in the following error in the browser console:

`Consent required. When using getSSOData, the user has to be authenticated with the following scope: openid profile email`

That will not happen when you run your application in production or if you specify the `openid profile email` scope. You can read more about this in the [User consent and third-party applications](/api-auth/user-consent#skipping-consent-for-first-party-applications) document.
:::

## Login

You can choose a method for login based on the type of auth you need in your application.

### webAuth.authorize()

The `authorize()` method can be used for logging in users via <dfn data-key="universal-login">Universal Login</dfn>, or via social connections, as exhibited in the examples below. This method invokes the [/authorize endpoint](/api/authentication?javascript#social) of the Authentication API, and can take a variety of parameters via the `options` object.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `audience` | optional | (String)  The default audience to be used for requesting API access. |
| `connection` | optional | (String) Specifies the connection to use rather than presenting all connections available to the application. |
| `scope` | optional | (String) The scopes which you want to request authorization for. These must be separated by a space. You can request any of the standard OIDC scopes about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/tokens/guides/create-namespaced-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a <dfn data-key="refresh-token">Refresh Token</dfn>. |
| `responseType` | optional | (String) It can be any space separated list of the values `code`, `token`, `id_token`.  It defaults to `'token'`, unless a `redirectUri` is provided, then it defaults to `'code'`. |
| `clientID` | optional | (String)  Your Auth0 client ID. |
| `redirectUri` | optional | (String) The URL to which Auth0 will redirect the browser after authorization has been granted for the user. |
| `state` | optional | (String)  An arbitrary value that should be maintained across redirects. It is useful to mitigate CSRF attacks and for any contextual information (for example, a return URL) that you might need after the authentication process is finished. For more information, see [State Parameter](/protocols/oauth2/oauth-state). auth0.js, when used in single-page applications, handles the state generation and validation automatically if not specified. |
| `prompt` | optional | (String) A value of `login` will force the login page to show regardless of current session. A value of `none` will attempt to bypass the login prompts if a session already exists (see the [silent authentication](/sso/current/single-page-apps#silent-authentication) documentation for more details). |

For hosted login, one must call the `authorize()` method.

```js
webAuth.authorize({
  //Any additional options can go here
});
```

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
  redirectUri: 'https://YOUR_APP/popup_response_handler.html'
  //Any additional options can go here
}, function(err, authResult) {
  //do something
});
```

And for social login with popup using `authorize`:

```js
webAuth.popup.authorize({
  redirectUri: 'https://YOUR_APP/popup_response_handler.html',
  connection: 'twitter'
}, function(err, authResult) {
  //do something
});
```

#### Handling popup authentication results

When using popup authentication, you'll have to provide a `redirectUri` where the destination page communicates the authorization results back to the <dfn data-key="callback">callback</dfn> by using the `webAuth.popup.callback` method. A simple implementation would be something like this:

```HTML
<!-- popup_response_handler.html -->
<html>
  <body>
    <script src="${auth0js_url}"></script>
    <script type="text/javascript">
      var webAuth = new auth0.WebAuth({
        domain:       'YOUR_AUTH0_DOMAIN',
        clientID:     'YOUR_CLIENT_ID'
      });
      webAuth.popup.callback();
    </script>
  </body>
</html>
```

An ideal handler would contain just this minimal functionality (i.e. avoid reloading the whole application just to handle the response). 
You will need to add the `redirectUri` to the application's **Allowed Callback URLs** list in the application configuration page on the Dashboard.

### webAuth.login()

<%= include('../../../_includes/_embedded_login_warning') %>

The `login` method allows for [cross-origin authentication](/cross-origin-authentication) for database connections, using `/co/authenticate`.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `username` | optional | (String) The username to present for authentication. **Either** `username` or `email` must be present. |
| `email` | optional | (String) The email to present for authentication. **Either** `username` or `email` must be present.|
| `password` | required | (String) The password to present for authentication. |
| `realm` | required | (String) The name of the database connection against which to authenticate. See [realm documentation](/api-auth/tutorials/password-grant#realm-support) for more information |

```js
webAuth.login({
  realm: 'tests',
  username: 'testuser',
  password: 'testpass',
});
```

### webAuth.crossOriginVerification()

The `crossOriginVerification()` method can be used to help provide cross-origin authentication to customers who have third-party cookies disabled in their browsers. Further details about its usage can be read in the [cross-origin authentication](/cross-origin-authentication#create-a-cross-origin-fallback-page) document.

### buildAuthorizeUrl(options)

The `buildAuthorizeUrl` method can be used to build the `/authorize` URL, in order to initialize a new transaction. Use this method if you want to implement browser based (passive) authentication.

```js
// Calculate URL to redirect to
var url = webAuth.client.buildAuthorizeUrl({
  clientID: '${account.clientId}', // string
  responseType: 'token id_token', // code
  redirectUri: '${account.callback}',
  state: 'YOUR_STATE',
  nonce: 'YOUR_NONCE'
});

// Redirect to url
// ...
```

::: note
The `state` parameter is an opaque value that Auth0 will send back to you. This method helps prevent CSRF attacks, and it needs to be specified if you redirect to the URL yourself instead of calling `webAuth.authorize()`. For more information, see [State Parameter](/protocols/oauth2/oauth-state).
:::

<%= include('../../_includes/_embedded_sso') %>

## Passwordless login

<dfn data-key="passwordless">Passwordless authentication</dfn> allows users to log in by receiving a one-time password via email or text message. The process will require you to start the Passwordless process, generating and dispatching a code to the user, (or a code within a link), followed by accepting their credentials via the verification method. That could happen in the form of a login screen which asks for their (email or phone number) and the code you just sent them. It could also be implemented in the form of a Passwordless link instead of a code sent to the user. They would simply click the link in their email or text and it would hit your endpoint and verify this data automatically using the same verification method (just without manual entry of a code by the user).

In order to use Passwordless, you will want to initialize auth0.js with a `redirectUri` and to set the `responseType: 'token'`.

```js
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: 'http://example.com',
  responseType: 'token id_token'
});
```

### Start passwordless

The first step in Passwordless authentication with auth0.js is the `passwordlessStart` method, which has several parameters which can be passed within its `options` object:

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

### Passwordless Login

If sending a code, you will then need to prompt the user to enter that code. You will process the code, and authenticate the user, with the `passwordlessLogin` method, which has several parameters which can be sent in its `options` object:

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `connection` | required | (String) Specifies how to send the code/link to the user. Value must be either `email` or `sms` and the same as the value passed to `passwordlessStart`. |
| `verificationCode` | required | (String) The code sent to the user, either as a code or embedded in a link. |
| `phoneNumber` | optional | (String) The user's phone number to which the code or link was delivered via SMS. |
| `email` | optional | (String) The user's email to which the code or link was delivered via email. |

As with `passwordlessStart`, exactly _one_ of the optional `phoneNumber` and `email` parameters must be sent in order to verify the Passwordless transaction.

::: note
In order to use `passwordlessLogin`, the options `redirectUri` and `responseType` must be specified when first initializing WebAuth.
:::

```js
webAuth.passwordlessLogin({
    connection: 'email',
    email: 'foo@bar.com',
    verificationCode: '389945'
  }, function (err,res) {
    // handle errors or continue
  }
);
```

## Extract the authResult and get user info

After authentication occurs, you can use the `parseHash` method to parse a URL hash fragment when the user is redirected back to your application in order to extract the result of an Auth0 authentication response. You may choose to handle this in a callback page that will then redirect to your main application, or in-page, as the situation dictates.

The `parseHash` method takes an `options` object that contains the following parameters:

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `state` | optional | (String) An opaque value the application adds to the initial request that Auth0 includes when redirecting back to the application. This value is used by auth0.js to prevent CSRF attacks. |
| <dfn data-key="nonce">`nonce`</dfn> | optional | (String) Used to verify the ID Token
| `hash` | optional | (String) The URL hash (if not provided, `window.location.hash` will be used by default) |

The contents of the authResult object returned by `parseHash` depend upon which authentication parameters were used. It can include:

| **Item** | **Description** |
| --- | --- |
| `accessToken` | An <dfn data-key="access-token">Access Token</dfn> for the API, specified by the `audience` |
| `expiresIn` |  A string containing the expiration time (in seconds) of the `accessToken` |
| `idToken` |  An ID Token JWT containing user profile information |

```js
webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
  if (err) {
    return console.log(err);
  }

  webAuth.client.userInfo(authResult.accessToken, function(err, user) {
    // Now you have the user's information
  });
});
```

As shown above, the `client.userInfo` method can be called passing the returned `accessToken`. It will make a request to the `/userinfo` endpoint and return the `user` object, which contains the user's information, formatted similarly to the below example.

```json
{
    "sub": "auth0|123456789012345678901234",
    "nickname": "johnfoo",
    "name": "johnfoo@gmail.com",
    "picture": "https://gravatar.com/avatar/example.png",
    "updated_at": "2018-05-07T14:16:52.013Z",
    "email": "johnfoo@gmail.com",
    "email_verified": "false"
}
```

You can now do something else with this information as your application needs, such as acquire the user's entire set of profile information with the Management API, as described below.

## Using nonces

By default (and if `responseType` contains `id_token`), `auth0.js` will generate a random `nonce` when you call `webAuth.authorize`, store it in local storage, and pull it out in `webAuth.parseHash`. The default behavior should work in most cases, but some use cases may require a developer to control the `nonce`.
If you want to use a developer generated `nonce`, then you must provide it as an option to both `webAuth.authorize` and `webAuth.parseHash`.

```js
webAuth.authorize({nonce: '1234', responseType: 'token id_token'});
webAuth.parseHash({nonce: '1234'}, callback);
```

If you're calling `webAuth.checkSession` instead of `webAuth.authorize`, then you only have to specify your custom `nonce` as an option to `checkSession`:

```js
webAuth.checkSession({
  nonce: '1234',
}, function (err, authResult) {
    ...
});
```

The `webAuth.checkSession` method will automatically verify that the returned ID Token's `nonce` claim is the same as the option.

<%= include('../../../_includes/_co_authenticate_errors', { library : 'Auth0.js v9'}) %>

## Logout

To log out a user, use the `logout` method. This method accepts an options object, which can include the following parameters.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `returnTo` | optional | (String) URL to redirect the user to after the logout. |
| `clientID` | optional | (String) Your Auth0 client ID |
| `federated` | optional | (Querystring parameter) Add this querystring parameter to the logout URL, to log the user out of their identity provider, as well: `https://${account.namespace}/v2/logout?federated`. |

::: panel returnTo parameter
Note that if the `clientID` parameter is included, the `returnTo` URL that is provided must be listed in the Application's **Allowed Logout URLs** in the [Auth0 dashboard](${manage_url}). However, if the `clientID` parameter _is not_ included, the `returnTo` URL must be listed in the **Allowed Logout URLs** at the *account level* in the [Auth0 dashboard](${manage_url}).
:::

```js
webAuth.logout({
  returnTo: 'some url here',
  clientID: 'some client ID here'
});
```

## Signup

To sign up a user, use the `signup` method. This method accepts an options object, which can include the following parameters.

| **Parameter** | **Required** | **Description** |
| --- | --- | --- |
| `email` | required | (String) User's email address |
| `password` | required | (String) User's desired password |
| `username` | required\* | (String) User's desired username. </br>\*Required if you use a database connection and you have enabled **Requires Username** |
| `connection` | required | (String) The database connection name on your application upon which to attempt user account creation |
| `user_metadata` | optional | (JSON object) Additional attributes used for user information. Will be stored in [user_metadata](/users/concepts/overview-user-metadata) |

Signups should be for database connections. Here is an example of the `signup` method and some sample code for a form.

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
            password: $('.signup-password').val(),
            user_metadata: { plan: 'silver', team_id: 'a111' }
        }, function (err) {
            if (err) return alert('Something went wrong: ' + err.message);
            return alert('success signup without login!')
        });
    });
</script>
```

## Using checkSession to acquire new tokens

The `checkSession` method allows you to acquire a new token from Auth0 for a user who is already authenticated against Auth0 for your domain. The method accepts any valid OAuth2 parameters that would normally be sent to `authorize`. If you omit them, it will use the ones provided when initializing Auth0.

The call to `checkSession` can be used to get a new token for the API that was specified as the audience when `webAuth` was initialized:

```js
webAuth.checkSession({}, function (err, authResult) {
  // err if automatic parseHash fails
  ...
});
```

Or, the token can be acquired for a different API than the one used when initializing `webAuth` by specifying an `audience` and `scope`:

```js
webAuth.checkSession(
  {
    audience: `https://mydomain/another-api/˜`,
    scope: 'read:messages'
  }, function (err, authResult) {
  // err if automatic parseHash fails
  ...
});
```

::: note
Note that `checkSession()` triggers any [rules](/rules) you may have set up, so you should check on your rules in the [Dashboard](${manage_url}/#/rules) prior to using it.
:::

The actual redirect to `/authorize` happens inside an iframe, so it will not reload your application or redirect away from it.

However, the browser **must** have third-party cookies enabled. Otherwise, **checkSession()** is unable to access the current user's session (making it impossible to obtain a new token without displaying anything to the user). The same will happen if users have [Safari's ITP enabled](/api-auth/token-renewal-in-safari).

Remember to add the URL where the authorization request originates from, to the **Allowed Web Origins** list of your Auth0 application in the [Dashboard](${manage_url}) under your application's **Settings**.

::: warning
If the connection is a social connection and you are using Auth0 dev keys, the `checkSession` call will always return `login_required`.
:::

### Polling with checkSession()

<%= include('../../../_includes/_checksession_polling') %>

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

The Management API provides functionality that allows you to link and unlink separate user accounts from different providers, tying them to a single profile (See [User Account Linking](/users/concepts/overview-user-account-linking) for details.) It also allows you to update user metadata.

To get started, you first need to obtain a an Access Token that can be used to call the Management API. You can do it by specifying the `https://${account.namespace}/api/v2/` audience when initializing auth0.js, in which case you will get the Access Token as part of the authentication flow.

::: note
If you use [custom domains](/custom-domains), you will need to instantiate a new copy of `webAuth` using your Auth0 domain rather than your custom one, for use with the Management API calls, as it only works with Auth0 domains.
:::

```js
var webAuth = new auth0.WebAuth({
  clientID: '${account.clientId}',
  domain: '${account.namespace}',
  redirectUri: 'http://example.com',
  audience: `https://${account.namespace}/api/v2/`,
  scope: 'read:current_user',
  responseType: 'token id_token'
});
```

You can also do so by using `checkSession()`:

```
webAuth.checkSession(
  {
    audience: `https://${account.namespace}/api/v2/`,
    scope: 'read:current_user'
  }, function(err, result) {
     // use result.accessToken
  }
);
```

You must specify the specific scopes you need. You can ask for the following scopes:

* `read:current_user`
* `update:current_user_identities`
* `create:current_user_metadata`
* `update:current_user_metadata`
* `delete:current_user_metadata`
* `create:current_user_device_credentials`
* `delete:current_user_device_credentials`

Once you have the Access Token, you can create a new `auth0.Management` instance by passing it the account's Auth0 domain, and the Access Token.

```js
var auth0Manage = new auth0.Management({
  domain: '${account.namespace}',
  token: 'ACCESS_TOKEN'
});
```

### Getting the user profile

In order to get the user profile data, use the `getUser()` method, with the `userId` and a callback as parameters. The method returns the user profile. Note that the `userID` required here will be the same one fetched from the `client.userInfo` method.

```js
auth0Manage.getUser(userId, cb);
```

### Updating the user profile

When updating user metadata, you will need to first create a `userMetadata` object, and then call the `patchUserMetadata` method, passing it the user id and the `userMetadata` object you created. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata. See the [Metadata](/users/concepts/overview-user-metadata) documentation for more details on user metadata.

```js
auth0Manage.patchUserMetadata(userId, userMetadata, cb);
```

### Linking users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `linkUser` method accepts two parameters, the primary `userId` and the secondary user's ID Token (the token obtained after login with this identity). The user ID in question is the unique identifier for the primary user account. The ID should be passed with the provider prefix, e.g., `auth0|1234567890` or `facebook|1234567890`, when using this method. See [User Account Linking](/users/concepts/overview-user-account-linking) for details.

```js
auth0Manage.linkUser(userId, secondaryUserToken, cb);
```

After linking the accounts, the second account will no longer exist as a separate entry in the user database, and will only be accessible as part of the primary one.

::: note
Note that when accounts are linked, the secondary account's metadata is **not** merged with the primary account's metadata, and if they are ever unlinked, the secondary account will likewise not retain the primary account's metadata when it becomes separate again.
:::
