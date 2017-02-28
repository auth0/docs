---
title: Custom Login Form
description: This tutorial demonstrates how to add a custom login form to a JavaScript application with Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-samples',
  path: '02-Custom-Login-Form',
  requirements: [
    'ECMAScript 5'
  ]
}) %>

<%= include('../_includes/_custom_login_preamble') %>

## Create an Application File

For this example, all of the authentication-related functions can be implemented in an `app.js` file. The file requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL for your client. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `client.login` method. Since `client.login` is an XHR-based transaction, the authentication result is handled in a callback and the `setSession` method is called to set the user's `access_token`, `id_token`, and `access_token` expiry time in local storage if the transaction is successful.

The `signup` method is a redirect-based flow and the authentication result is handled by the `handleAuthentication` method. This method looks for an `access_token` and `id_token` in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the user is redirected to the home route.

```js
// app.js

window.addEventListener('load', function() {
  
  var webAuth = new auth0.WebAuth({
    domain: ${account.namespcae},
    clientID: ${account.clientId},
    redirectUri: 'http://localhost:3000',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'token id_token'
  });

  var loginStatus = document.querySelector('.container h4');
  var loginView = document.getElementById('login-view');
  var homeView = document.getElementById('home-view');

  // buttons and event listeners
  var homeViewBtn = document.getElementById('btn-home-view');
  var loginViewBtn = document.getElementById('btn-login-view');
  var logoutBtn = document.getElementById('btn-logout');

  var loginBtn = document.getElementById('btn-login');
  var signupBtn = document.getElementById('btn-signup');
  var googleLoginBtn = document.getElementById('btn-google-login');

  var authForm = document.getElementById('auth-form');

  homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';
  });

  loginViewBtn.addEventListener('click', function() {
    loginView.style.display = 'inline-block';
    homeView.style.display = 'none';
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    login(email, password);
  });

  signupBtn.addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    signup(email, password);
  });

  logoutBtn.addEventListener('click', logout);

  googleLoginBtn.addEventListener('click', loginWithGoogle);

  function login(username, password) {
    webAuth.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      },
      function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        setSession(data);
        authForm.reset();
        loginView.style.display = 'none';
        homeView.style.display = 'inline-block';
        displayButtons();
      }
    );
  }

  function signup(email, password) {
    webAuth.redirect.signupAndLogin(
      {
        connection: 'Username-Password-Authentication',
        email: email,
        password: password
      },
      function(err) {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  function loginWithGoogle() {
    webAuth.authorize(
      {
        connection: 'google-oauth2'
      },
      function(err) {
        if (err) {
          console.log('Error:' + err);
        }
      }
    );
  }

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginViewBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginViewBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      loginStatus.innerHTML = 'You are not logged in! Please log in to continue.';
    }
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        authForm.reset();
        loginView.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        alert('Error: ' + err.error);
      }
      displayButtons();
    });
  }

  handleAuthentication();
});
```

An `authResult` is assigned by calling the `parseHash` method from auth0.js. This is necessary for redirect-based authentication transactions which, in this example, include `signup` and `loginWithGoogle`. This method needs to be called when the app starts so that the authentication result (which comes back in the hash of a redirection) is properly handled.

The file has several other utility methods that are necessary to complete authentication transactions.

* `logout` - removes the user's tokens from local storage which effectively logs them out of the application.
* `setSession` - takes an authentication result object and sets the `access_token`, `id_token`, and calculated `access_token` expiry time values into local storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has already passed. This is the primary mechanism for the application to know whether the user is currently authenticated.

<%= include('_includes/_routing_disclaimer') %>

## Create the Application UI

Create a user interface for your application with controls for allowing the user to log in and log out. This example uses a simple Bootstrap `navbar` to display these controls.

```html
<!-- index.html -->

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Auth0 - JavaScript</a>

      <button id="btn-home-view" class="btn btn-primary btn-margin">
          Home
      </button>

      <button id="btn-login-view" class="btn btn-primary btn-margin">
          Log In
      </button>

      <button id="btn-logout" class="btn btn-primary btn-margin">
          Log Out
      </button>

    </div>
  </div>
</nav>

<main class="container">
  <!-- home view -->
  <div id="home-view">
    <h4></h4>
  </div>

  <!-- login view -->
  <div id="login-view">
    <div class="row">
      <div class="col-sm-6">
        <h2>Username/Password Authentication</h2>

        <form id="auth-form">

          <div class="form-group">
            <label for="name">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="you@example.com">
          </div>

          <div class="form-group">
            <label for="name">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password">
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            id="btn-login">
              Log In
          </button>

          <button
            type="button"
            class="btn btn-primary"
            id="btn-signup">
              Sign Up
          </button>

        </form>

      </div>

      <div class="col-sm-6">
        <h2>Social Authentication</h2>

        <button
          type="submit"
          class="btn btn-default btn-danger"
          id="btn-google-login">
            Log In with Google
          </button>

      </div>
    </div>
  </div>
</main>
```

