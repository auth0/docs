<%= include('../../_includes/_login_preamble', { library: 'jQuery' }) %>

## Install the Lock Widget

The only dependency required to power a basic login solution is Auth0's [Lock widget](/lock) itself which can be installed using npm.

```bash
npm install --save auth0-lock
```

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="https://cdn.auth0.com/js/lock/10.11/lock.min.js"></script>
```

Create main application file called `app.js` and populate it with functions to run the authentication logic for your application. An instance of the Lock widget can be created in this file and its configuration can be controlled there.

There are several functions that need to be defined in this file, including: 

* `login` - makes a call for the Lock widget to be opened
* `setSession` - sets the `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

```js
// app.js

$(document).ready(function() {

  var lock = new Auth0Lock(${account.clientId}, ${account.namespace}, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:3000',
      responseType: 'token id_token',
      audience: 'https://${account.namespace}/userinfo'
    }
  });

  $('.content').show();
  $('#loading').hide();

  $('#btn-login').click(function(e) {
    e.preventDefault();
    login();
  });

  $('#btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  });

  if(isAuthenticated()) {
    displayAsAuthenticated();
  } else {
    displayAsNotAuthenticated();
  }

  lock.on('authenticated', function(authResult) {
    window.location.hash = '';
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
      displayAsAuthenticated();
    } else if (authResult && authResult.error) {
      alert('Error: ' + authResult.error);
    }
  });

  function login() {
    lock.show();
  }

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
    ['#login-message', '#btn-login']
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

    ['#login-message', '#btn-login']
      .forEach(function(item) {
        $(item).show();
      });
  }
});
```

<%= include('../../_includes/_auth_service_method_description_no_callback') %>

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
          id="btn-login">
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

  <main class="container">
    <div id="login-message">
      <h3>Welcome, please log in!</h3>
    </div>

    <div id="logged-in-message">
      <h3>Thank you for logging in!</h3>
    </div>
  </main>
</div>
```