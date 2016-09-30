---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 library to add custom authentication and authorization to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '02-Custom-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

In the [previous step](/quickstart/spa/jquery/01-login), we enabled login with the Auth0 Lock widget. You can also build your own custom UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

## Custom Login

First, you must add the `Auth0.js` library to your application:

```html
<!-- index.html -->
  ...

  <script src="${auth0js_url}"></script>

  ...
```

You will need an `Auth0` instance. Create one using your client credentials. Include your `callbackURL` and set `responseType: 'token'`:

```javascript
// app.js

$(document).ready(function() {
  var auth0 = null;
  // Configure Auth0
  auth0 = new Auth0({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    responseType: 'token',
    callbackURL: '${account.callback}'
  });
});
```

In the `login` method, call the `login` function on the `Auth0` instance, setting `connection` to `Username-Password-Authentication` and `responseType` to `token`:

```javascript
// app.js

$('#btn-login').on('click', function(ev) {
  ev.preventDefault();
  var username = $('#username').val();
  var password = $('#password').val();
  auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
});
```

Since `Auth0` uses [redirect mode](https://github.com/auth0/auth0.js#redirect-mode) by default, the app will be redirected to the `callbackURL` after a successful login.

With `responseType: 'token'`, the result will be appended to the URL.

Check for `hash` information using  Auth0's `parseHash` method, which will extract the `id_token`. Save it to `localStorage`:

```javascript
/* ===== ./app.js ===== */
...
var parseHash = function() {
  var result = auth0.parseHash(window.location.hash);
  if (result && result.idToken) {
    localStorage.setItem('id_token', result.idToken);
  } else if (result && result.error) {
    alert('error: ' + result.error);
  }
};

parseHash();
 ...
```

Now, add a form to call the login:

```html
  <!-- index.html -->

  <form class="form-signin">
    <h2 class="form-signin-heading">Please sign in</h2>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="text" id="username" class="form-control" placeholder="Email address" autofocus required>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-default" type="button" id="btn-login">Sign In</button>
  </form>
```

## Sign up

To allow users to sign up, provide a `signUp` method:

```javascript
// app.js

$('#btn-register').on('click', function(ev) {
  ev.preventDefault();
  var username = $('#username').val();
  var password = $('#password').val();
  auth0.signup({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
});
```

and add a **Sign Up** button to call this method.

```html
  <!-- index.html -->

  ...

  <button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button>

  ...
```

## Social login

To log in using a social connection, set the `connection` property of the `login` method to the identity provider you want to use:

```typescript
// app.js

$('#btn-google').on('click', function(ev) {
  ev.preventDefault();
  auth0.login({
    connection: 'google-oauth2'
  }, function(err) {
    if (err) alert("something went wrong: " + err.message);
  });
});
```

and add a button to call this method:

```html
  <!-- index.html -->

  ...

  <button class="btn btn-lg btn-danger" type="button" id="btn-google">Google</button>

  ...
```
