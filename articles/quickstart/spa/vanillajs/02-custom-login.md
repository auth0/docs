---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 library to add custom authentication and authorization to your web app
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '02-Custom-Login'
}) %>

In the [previous step](/quickstart/spa/vanillajs/01-login), we enabled login with the Auth0 Lock widget. You can also build your own custom UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

::: panel Version Requirements
This quickstart and the accompanying sample demonstrate custom login with auth0.js version 8. If you are using auth0.js version 7, please see the [reference guide](https://auth0.com/docs/libraries/auth0js/v7) for the library, as well as the [legacy JavaScript custom login sample](https://github.com/auth0-samples/auth0-javascript-spa/tree/auth0js-v7/02-Custom-Login).
:::


## Getting Started

Include the auth0.js library in your application. It can be retrieved from Auth0's CDN.

```html
<!-- index.html -->

<script src="${auth0js_urlv8}"></script>
```

## Create a Login Template

Create a template which has a `form` for users to submit their credentials. The form should include fields for the user's `username` and `password`, as well as controls for triggering either a login, signup, or social authentication transaction. A button for allowing the user to log out can also be included.

```html
<!-- index.html -->

<form class="form-signin">
  <h2 class="form-signin-heading">Please Log In</h2>

  <input
    type="text"
    id="username"
    class="form-control"
    placeholder="Email address"
    autofocus
    required>

  <input
    type="password"
    id="password"
    class="form-control"
    placeholder="Password"
    required>

  <button
    class="btn btn-lg btn-default"
    type="button"
    id="btn-login">
    Log In
  </button>

  <button
    class="btn btn-lg btn-primary"
    type="button"
    id="btn-register">
      Sign Up
  </button>

  <button
    class="btn btn-lg btn-danger"
    type="button"
    id="btn-google">
      Log In with Google
  </button>

</form>

<div class="form-signin logged-in">
  <button
    class="bton btn-lg btn-default btn-block"
    type="button"
    id="btn-logout">
      Log out
  </button>
</div>
```

The buttons in this template will have event listeners registered from an `app.js` file. This will be the file from which authentication transaction methods will be called from auth0.js.

## Create the Authentication Functions

All authentication transactions should be handled from a single JavaScript file which can act as a service. The service requires functions named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL (as the redirect URI) for your client. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` functions should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `redirect.loginWithCredentials` method, and for `signup`, they are passed to `redirect.signupAndLogin`.

These methods are redirect-based and the authentication result is handled by the `parseHash` function. This function looks for an access token and ID token in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the UI changes to reflect that the user has logged in.

```js
// app.js

window.addEventListener('load', function() {

  var auth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: window.location.href,
    responseType: 'token id_token'
  });

  document.getElementById('btn-login').addEventListener('click', login);
  document.getElementById('btn-register').addEventListener('click', signup);
  document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
  document.getElementById('btn-logout').addEventListener('click', logout);

  function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    auth.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username: username,
      password: password,
    }, function(err) {
      if (err) return alert(err.description);
    });
  }

  function signup() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    auth.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email: username,
      password: password,
    }, function(err) {
      if (err) return alert(err.description);
    });
  }

  function loginWithGoogle() {
    auth.authorize({
      connection: 'google-oauth2'
    });
  }

  function logout() {
     localStorage.removeItem('access_token');
     localStorage.removeItem('id_token');
     window.location.href = "/";
  }

  function show_logged_in(username) {
    document.querySelector('form.form-signin').style.display = "none";
    document.querySelector('div.logged-in').style.display = "block";
  }

  function show_sign_in() {
    document.querySelector('div.logged-in').style.display = "none";
    document.querySelector('form.form-signin').style.display = "block";
  }

  function parseHash() {
    var token = localStorage.getItem('id_token');
    if (token) {
      show_logged_in();
    } else {
      auth.parseHash({ _idTokenVerification: false }, function(err, authResult) {
        if (err) {
          alert('Error: ' + err.errorDescription);
          show_sign_in();
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setUser(authResult);
          show_logged_in();
        }
      });      
    }
  }

  function setUser(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  parseHash();

});
```

The service has several other utility functions that are necessary to complete authentication transactions.

* The `parseHash` function is necessary to get the authentication result from the URL in redirect-based authentication transactions.
* The `logout` function removes the user's tokens from local storage which effectively logs them out of the application.
* The `setUser` function takes an authentication result object and sets the access token and ID token values into local storage
* The `show_logged_in` function hides the login form and displays the **Log Out** button. This is called after the user authenticates to reflect that they are logged in.
* The `show_sign_in` function does the opposite of `show_logged_in` and is called when the user logs out.

With the login form and the authentication functions in place, users can now authenticate with a custom UI.
