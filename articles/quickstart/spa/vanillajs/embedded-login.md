---
title: Embedded Login
description: This tutorial demonstrates how to add user login to your app with Auth0's Lock widget
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-samples',
  path: '01-Embedded-Login',
  branch: 'embedded-login'
}) %>

<%= include('../_includes/_embedded_lock_preamble') %>

<%= include('../_includes/_install_lock') %>

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="${lock_url}"></script>
```

<%= include('../../_includes/_allowed_origins', { callback: 'http://localhost:5000' }) %>

<%= include('../../_includes/_cross_origin_auth') %>

## Create an Authentication Service

Add a new file called `app.js`. In this file you can create and manage an instance of `Auth0Lock` and also hold logic to hide and display DOM elements.

```js
// app.js

window.addEventListener('load', function() {

  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:5000',
      responseType: 'token id_token',
      audience: 'https://${account.namespace}/userinfo',
      params: {
        scope: 'openid'
      }
    }
  });

  function login() {
    lock.show();
  }

  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    login();
  });

});

```

::: note
**Checkpoint:** Try adding a `button` with the id `btn-login` to your app. This will call the `login` function from `app.js` to show the Lock widget.
:::

![embedded login](/media/articles/web/embedded-login.png)

## Finish Out the Service

Add some additional functions to `app.js` to fully handle authentication in the app.

```js
// app.js

window.addEventListener('load', function() {
  
  // ...
  lock.on('authenticated', function(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
    }
    displayButtons();
  });

  lock.on('authorization_error', function(err) {
    console.log(err);
    displayButtons();
  });

  // buttons and event listeners
  var loginBtn = document.getElementById('btn-login');
  var logoutBtn = document.getElementById('btn-logout');

  loginBtn.addEventListener('click', login);
  logoutBtn.addEventListener('click', logout);

  function login() {
    lock.show();
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
    var loginStatus = document.querySelector('.container h4');
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      loginStatus.innerHTML =
        'You are not logged in! Please log in to continue.';
    }
  }

  displayButtons();
});
```

The file now includes several other items for handling authentication.

* `authenticated` event listener - looks for a successful authentication event and runs the callback to handle authentication
* `authorization_error` event listener - looks for an unsuccessful authentication event and runs the callback to handle the error
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

### About the Authentication Functions

The first noteworthy thing happening here is that an instance of `Auth0Lock` is created. The options object passed to it includes configuration for your client and domain, a response type to indicate you would like to receive an `access_token` and `id_token` after authentication, and an `audience` and `scope` which specify that authentication should be [OIDC conformant](https://auth0.com/docs/api-auth/tutorials/adoption). Also specified is the location that users should be returned to after authentication is complete. In this case, that's the main URL for the application.

When a user successfully authenticates with the Lock widget, they are redirected back to your application with a hash fragment in the URL. This hash fragment contains their authentication information including an `access_token`, an `id_token` and an `expires_in` value. These values are extracted from the URL using the `parseHash` function from Lock and are then saved into local storage with the `setSession` function. This function also calculates the time at which the `access_token` will expire using the `expires_in` value from the hash.

Authentication using JSON Web Tokens is stateless by nature, meaning that there is no information about the user's session stored on your server. In this way, setting up a session for the user on the client side is simply a matter of saving the `access_token`, `id_token`, and a time that the `access_token` expires at in browser storage. Conversely, logging the user out only requires that these items be removed from storage. These examples use local storage to save the tokens and the expiry time, but you may also use session storage or cookies if you wish.

The application needs some way to make decisions about showing or hiding UI elements and restricting routing based on whether or not the user can be considered "authenticated". Once again, since JWT authentication is stateless, there is no real way to say whether the user is authenticated in any traditional sense, but there are clues that can be used. The best clue to go with is whether or not the `access_token` is expired. If it is expired, anything meaningful that the user could do with it--such as a call to your API for protected resources--will not work. It's at this point that the user would need to reauthenticate and get a new token. The `isAuthenticated` function checks whether the expiry time for the `access_token` has passed or not so that the above-mentioned decisions can be made.

## Provide a Login Control

Provide a template with controls for the user to log in and log out.

```html
<!-- index.html -->

<div class="content">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Auth0 - JavaScript</a>

        <button class="btn btn-primary btn-margin">
            Home
        </button>

        <button id="btn-login" class="btn btn-primary btn-margin">
            Log In
        </button>

        <button id="btn-logout" class="btn btn-primary btn-margin">
            Log Out
        </button>

      </div>
    </div>
  </nav>

  <main class="container">
    <!-- main container -->
    <h4></h4>
  </main>
</div>
```

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `click` event listeners added to the **Log In** and **Log Out** buttons make the appropriate calls to the functions in `app.js` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the Lock widget will be shown.