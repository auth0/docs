---
title: Custom Login Form
description: This tutorial demonstrates how to add a custom login form to a jQuery application with Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '02-Custom-Login-Form',
  requirements: [
    'jQuery 3.1'
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

$(document).ready(function() {

  var webAuth = new auth0.WebAuth({
    domain: ${account.namespace},
    clientID: ${account.clientId},
    redirectUri: 'http://localhost:3000',
    responseType: 'token id_token',
    audience: 'https://${account.namespace/userinfo'
  });

  var authResult = webAuth.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      setSession(authResult);
      displayAsAuthenticated();
      $('#auth-form')[0].reset();
      showRoute('home');
    } else {
      displayAsNotAuthenticated();
    }
  });

  if(isAuthenticated()) {
    displayAsAuthenticated();
  } else {
    displayAsNotAuthenticated();
  }

  $('#btn-home').click(function(e) {
    showRoute('home');
  });

  $('#btn-login-route').click(function(e) {
    showRoute('login');
  });

  $('#btn-login').click(function(e) {
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    webAuth.client.login({
      realm: 'Username-Password-Authentication',
      username: email,
      password: password,
    }, function(err, authResult) {
      if (err) {
        alert(err.description);
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        setSession(authResult);
        displayAsAuthenticated();
        $('#auth-form')[0].reset();
        showRoute('home');
      }
    });
  });

  $('#btn-signup').click(function(e) {
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    webAuth.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email: email,
      password: password,
    }, function(err) {
      if (err) {
        alert(err.description);
      }
    });
  });

  $('#btn-google').click(function(e) {
    e.preventDefault();
    webAuth.authorize({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) {
        alert(err.description);
      }
    });
  });

  $('#btn-logout').click(function(e) {
     e.preventDefault();
     logout();
  });

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayAsNotAuthenticated();
  }

  function isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayAsAuthenticated() {
    ['#login-form, #login-message', '#btn-login-route']
      .forEach(function(item) {
        $(item).hide();
      });

    ['#logged-in-message', '#btn-logout']
      .forEach(function(item) {
        $(item).show();
      });
  }

  function displayAsNotAuthenticated() {
    ['#logged-in-message', '#btn-logout']
      .forEach(function(item) {
        $(item).hide();
      });

    ['#login-form', '#login-message', '#btn-login-route']
      .forEach(function(item) {
        $(item).show();
      });
  }

  function showRoute(route) {
    $('.route').each(function() {
      $(this).hide();
    });
    $('#' + route).show();
  }

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

<div class="content">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Auth0 - jQuery</a>

        <button
          class="btn btn-primary btn-margin"
          id="btn-home">
            Home
        </button>

        <button
          class="btn btn-primary btn-margin"
          id="btn-login-route">
            Log In
        </button>

        <button
          class="btn btn-primary btn-margin"
          id="btn-logout">
            Log Out
        </button>

      </div>
    </div>
  </nav>

  <div class="container">

    <div class="route" id="home">
      <div id="login-message">
        <h3>Welcome, please log in!</h3>
      </div>

      <div id="logged-in-message">
        <h3>Thank you for logging in!</h3>
      </div>
    </div>

    <div class="route" id="login">
      <div class="col-sm-6">
        <h2>Username/Password Authentication</h2>

        <form id="auth-form">
          <div class="form-group">
            <label for="name">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="you@example.com">
          </div>

          <div class="form-group">
            <label for="name">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Enter your password">
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            id="btn-login">
              Log In
          </button>

          <button
            type="submit"
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
          class="btn btn-danger"
          id="btn-google">
            Log In with Google
          </button>

      </div>
    </div>

  </div>
</div>
```

