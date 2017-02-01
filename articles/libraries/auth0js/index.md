---
section: libraries
toc: true
description: How to install, initialize and use auth0.js v8
url: /libraries/auth0js
---

# Auth0.js v8 Reference

Auth0.js is a client-side library for [Auth0](http://auth0.com). Using auth0.js in your web apps makes it easier to do authentication and authorization with Auth0 in your web apps.

<div class="alert alert-info">
  This document covers the most up-to-date version of auth0.js - version 8. If you are already using version 7, you can take a look at the <a href="/libraries/auth0js/v7">v7 reference guide</a>, or take a look at the <a href="/libraries/auth0js/migration-guide">v8 migration guide</a>
</div>

## Ready-to-Go Example

The [example directory](https://github.com/auth0/auth0.js/tree/master/example) of the auth0.js library is a ready-to-go app that can help you to quickly and easily try out auth0.js. In order to run it, follow these quick steps:
1. If you don't have [node](http://nodejs.org/) installed, do that now
1. Download dependencies by running `npm install` from the root of this project
1. Finally, execute `npm start` from the root of this project, and then browse to your app running on the node server, presumably at `http://localhost:3000/example`.

## Setup and Initialization

Now, let's get started integrating auth0.js into your project. We'll cover [methods of installation](#installation-options), [how to initialize auth0.js](#initialization), [signup](#signup), [login](#login), [logout](#logout), and more!

### Installation Options

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
<script src="https://cdn.auth0.com/js/auth0/8.0.4/auth0.min.js"></script>
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

#### Available Parameters

##### Required

* **domain** {string}: Your Auth0 account domain (ex. myaccount.auth0.com)
* **client\_id** {string}: Your Auth0 client\_id

##### Optional

* **redirectUri** {string}: The default redirectUri used. Defaults to an empty string (none).
* **scope** {string}: The default scope used by the application. Using scopes can allow you to return specific claims for specific fields in your request. You should read our [documentation on scopes](/scopes) for further details about them.
* **audience** {string}: The default audience used for requesting API Access.
* **responseType** {string}: The default responseType used, 'token' or 'code'. Defaults to 'token', unless a `redirectUri` is provided, then defaults to 'code'.
* **responseMode** {string}: This option is omitted by default. Can be set to 'form_post' in order to send the token or code to the `redirectUri` via POST.
* **_disableDeprecationWarnings** {boolean}: Disables the deprecation warnings, defaults to false.

## Login

You can choose a method for login based on the type of auth you need in your application.

### webAuth.authorize()

The `authorize` method can be used for logging in users via the [Hosted Login Page](/libraries/auth0js#hosted-login-page), or via social connections, as exhibited below. 

For hosted login, one must call the `authorize` endpoint:

```js
webAuth.authorize({ 
  //Any additional options can go here 
});
```

For social logins, the connection will need to be specified:

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

```js
webAuth.client.login({
  realm: 'tests',
  username: 'testuser',
  password: 'testpass',
  scope: 'openid profile',
  audience: 'urn:test'
});
```

### Passwordless Login

Passwordless authentication allows users to log in by receiving a one-time password via email or text message. The process will require you to start the Passwordless process, generating and dispatching a code to the user, (or a code within a link), followed by accepting their credentials via the verification method. That could happen in the form of a login screen which asks for their (email or phone number) and the code you just sent them. It could also be implemented in the form of a Passwordless link instead of a code sent to the user. They would simply click the link in their email or text and it would hit your endpoint and verify this data automatically using the same verification method (just without manual entry of a code by the user).

#### Start Passwordless

The `passwordlessStart` method requires several options:

* `connection` - a string, the connection for this authentication
* `send` - a string, value must be either 'code' or 'link'

In addition, _one_ of the two following options must be sent:

* `phoneNumber` - a string containing the user's phone number for delivery of a code or link via SMS
* `email` - a string containing the user's email for delivery of a code or link via email

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

#### Verify Passwordless

The `passwordlessVerify` method requires several options:

* `connection` - a string, the connection for this authentication
* `verificationCode` - a string, the code sent to the user as a code or within a link.

In addition, _one_ of the two following options must be sent:

* `phoneNumber` - a string containing the user's phone number, to which the code or link was delivered via SMS
* `email` - a string containing the user's email, to which the code or link was delivered via email


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

## Logout

To logout a user, use the `logout` method. This accepts an options object, which can include a 'client_id', and a 'returnTo' URL. If you want to navigate the user to a specific URL after the logout, set that URL at the 'returnTo' parameter.

::: panel-info returnTo parameter
Note that if the 'client\_id' parameter _is_ included, the 'returnTo' URL that is provided must be listed in the **client's** "Allowed Logout URLs" in the Auth0 dashboard. 
However, if the 'client\_id' parameter _is not_ included, the 'returnTo' URL must be listed in the "Allowed Logout URLs" at the **account level** in the Auth0 Dashboard.
:::

```js
webAuth.logout({
  returnTo: 'some url here',
  client_id: 'some client ID here'
});
```

## Signup
 
The `signup` method accepts an 'options' object that contains parameters for your signup. Note that signups should be for database connections. Here is an example of the `signup` method and some sample code for a form. 

```html 
<h2>Signup Database Connection</h2> 
<input class="signup-username" /> 
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

## Using renewAuth to Acquire New Tokens

The `renewAuth` method allows you to acquire a new token from Auth0 for a user who is already authenticated against the hosted login page.

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

::: panel-info postMessage
This will use postMessage to comunicate between the silent callback and the SPA. When false the SDK will attempt to parse the url hash, should ignore the url hash, and no extra behaviour is needed.
:::

The callback page should be something like the following one. It will parse the url hash and post it to the parent document:

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
      var result = auth0.parseHash(window.location.hash, function(err, data) {
        parent.postMessage(err || data, "http://localhost:3000/");
      });
    </script>
  </head>
  <body></body>
</html>
```

## Password Reset Requests

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

## User Management 

The Management API provides functionality that allows you to link and unlink separate user accounts from different providers, tying them to a single profile (Read more about [Linking Accounts](/link-accounts) with Auth0). It also allows you to update user metadata.

To get started, create a new `auth0.Management` instance by passing it the account's Auth0 domain, and the token for the primary identity. In the case of linking users, this primary identity is the user profile that you want to "keep" the data for, and which you plan to link other identities to.

```js
var auth0Manage = new auth0.Management({
  domain: '${account.namespace}',
  token: "YOUR_PRIMARY_IDENTITY_TOKEN"
});
```

### Getting the User Profile

In order to get the user profile data, use the `getUser()` method, with the `userId` and a callback as parameters. The method returns the user profile.

```js
auth0Manage.getUser(userId, cb);
```

### Updating the User Profile

When updating user metadata, you will need to first create a `userMetadata` object, and then call the `patchUserMetadata` method, passing it the user id and the `userMetadata` object you created. The values in this object will overwrite existing values with the same key, or add new ones for those that don't yet exist in the user metadata. Visit the [User Metadata](/metadata) documentation for more details on user metadata.

```js
auth0Manage.patchUserMetadata(userId, userMetadata, cb);
```

### Linking Users

Linking user accounts will allow a user to authenticate from any of their accounts and no matter which one they use, still pull up the same profile upon login. Auth0 treats all of these accounts as separate profiles by default, so if you wish a user's accounts to be linked, this is the way to go.

The `linkUser` method accepts two parameters, the primary user id and the secondary user token (the token obtained after login with this identity). The user id in question is the unique identifier for this user account. If the id is in the format `facebook|1234567890`, the id required is the portion after the delimiting pipe. Visit the [Linking Accounts](/link-accounts) documentation for more details on linking accounts.

```js
auth0Manage.linkUser(userId, secondaryUserToken, cb);
```

::: panel-info Linking - Metadata
Note that when accounts are linked, the secondary account's metadata is **not** merged with the primary account's metadata, and if they are ever unlinked, the secondary account will likewise not retain the primary account's metadata when it becomes separate again.
:::
