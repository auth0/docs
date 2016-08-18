---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '02-Custom-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

In the [previous step](/quickstart/spa/vanillajs/01-login), you enabled login with the Auth0 Lock widget. You can also build your application with a custom design without using Lock by including the [Auth0.js library](/libraries/auth0js). In this case we will use Auth0's CDN (you can also use npm or bower for the same purpose).

## Custom Login

First, you must add the `Auth0.js` library to your application:

```html
<!-- ===== ./index.html ===== -->
<head>
  ...
  <script src="//cdn.auth0.com/w2/auth0-7.0.3.min.js"></script>
  ...
</head>
```

You will need an `Auth0` instance. Create one using your client credentials. Include your `callbackURL` and set `callbackOnLocationHash` to `true`:

```javascript
/* ===== ./app.js ===== */
window.addEventListener('load', function() {
  var AUTH0_CLIENT_ID = '${account.clientId}';
  var AUTH0_DOMAIN = '${account.namespace}';
  auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    callbackOnLocationHash: true,
    callbackURL: '${account.callback}'
  });
  ...
});
```

In the `login` method, call the `login` function on the `auth0` instance, setting `connection` to `Username-Password-Authentication` and `responseType` to `token`:

```javascript
/* ===== ./app.js ===== */
...
document.getElementById('btn-login').addEventListener('click', function() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) {
      alert("something went wrong: " + err.message);
    } else {
      show_logged_in(username);
    }
  });
});
...
```

Since `Auth0` uses [redirect mode](https://github.com/auth0/auth0.js#redirect-mode) by default, the app will be redirected to the `callbackURL` after a successful login.

With `callbackOnLocationHash` set to `true`, the result will be appended to the URL.

Check for `hash` information using  Auth0's `parseHash` method, which will extract the `id_token`. Save it to `localStorage`:

```javascript
/* ===== ./app.js ===== */
...
var parseHash = function() {
  var token = localStorage.getItem('id_token');
  if (token) {
    show_logged_in();
  } else {
    var result = auth0.parseHash(window.location.hash);
    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      show_logged_in();
    } else if (result && result.error) {
      alert('error: ' + result.error);
      show_sign_in();
    }
  }
};

parseHash();
...
```

Now, add a form to call the login:

```html
<!-- ===== ./index.html ===== -->
...
<form class="form-signin">
  <h2 class="form-signin-heading">Please sign in</h2>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="text" id="username" class="form-control" placeholder="Email address" autofocus required>
  <label for="inputPassword" class="sr-only">Password</label>
  <input type="password" id="password" class="form-control" placeholder="Password" required>
  <button class="btn btn-lg btn-default" type="button" id="btn-login">Sign In</button>
</form>
...
```

## Sign up

To allow users to sign up, provide a `signUp` method:

```javascript
/* ===== ./app.js ===== */
...
document.getElementById('btn-register').addEventListener('click', function() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  auth0.signup({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
});
...
```

and add a **Sign Up** button to call this method:

```html
<!-- ===== ./index.html ===== -->
...
<button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button>
...
```

## Social login

To log in using a social connection, set the `connection` property of the `login` method to the identity provider you want to use:

```javascript
/* ===== ./app.js ===== */
...
document.getElementById('btn-google').addEventListener('click', function() {
  auth0.login({
    connection: 'google-oauth2'
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
});
...
```

and add a button to call this method:

```html
<!-- ===== ./index.html ===== -->
...
<button class="btn btn-lg btn-danger" type="button" id="btn-google">Google</button>
...
```

# Summary

In this guide you learned how to use `Auth0.js` library to log users into your VanillaJS projects by using user and password or using social login. Also you learned how to register new users.
