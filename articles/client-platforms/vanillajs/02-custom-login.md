---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 library to add custom authentication and authorization to your web app
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

In the [previous step](/quickstart/spa/vanillajs/01-login), we enabled login with the Auth0 Lock widget. You can also build your own custom UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).


## Add Custom Login

First, add the `auth0.js` library to your application:

```html
<!-- index.html -->

<head>

  ...

  <script src="${auth0js_url}"></script>

  ...
</head>
```

Create an `Auth0` instance and pass in your client credentials. Include your `callbackURL`, and set `responseType` to `token`:

```js
// app.js

window.addEventListener('load', function() {
  auth0 = new Auth0({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: '<%= account.callback %>',
    responseType: 'token'
  });

  ...
});
```

In the `login` method, call the `login` function on the `auth0` instance, setting `connection` to `Username-Password-Authentication` and `responseType` to `token`:

```js
// app.js

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

> **Note:** This example uses `Username-Password-Authentication`, but there are other connection types. Find out more about other connection options [here](https://auth0.com/docs/libraries/auth0js#login).

Since `Auth0` uses [redirect mode](https://github.com/auth0/auth0.js#redirect-mode) by default, the app will be redirected to the `callbackURL` after a successful login.

With `responseType` set to `token`, the access token will be appended to the URL.

Check for `hash` information using Auth0's `parseHash` method, which will extract the `id_token`. Save it to `localStorage`:

```js
// app.js

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

Add a form to call the login:

```html
<!-- index.html -->

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

## Add Sign Up

To allow users to sign up, provide a `signup` method:

```js
// app.js

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

Add a **Sign Up** button to call this method:

```html
<!-- index.html -->

...

<button class="btn btn-lg btn-primary" type="button" id="btn-register">Sign Up</button>

...
```

## Add Social Login

To log in using a social connection, set the `connection` property of the `login` method to the identity provider you want to use:

```js
// app.js

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

Add a button to call this method:

```html
<!-- index.html -->

...

<button class="btn btn-lg btn-danger" type="button" id="btn-google">Google</button>

...
```