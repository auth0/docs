<%= include('../../_includes/_login_preamble', { library: 'JavaScript' }) %>

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

window.addEventListener('load', function() {
  
  var lock = new Auth0Lock(${account.clientId}, ${account.namespace}, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:3000',
      responseType: 'token id_token',
      audience: 'https://${account.namespace}/userinfo'
    }
  });

  lock.on('authenticated', function(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult);
    } else if (authResult && authResult.error) {
      alert('Error: ' + authResult.error);
    }
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
      loginStatus.innerHTML = 'You are not logged in! Please log in to continue.';
    }
  }

  displayButtons();
});

```

<%= include('../../_includes/_auth_service_method_description_no_callback') %>

## Create the Application UI

Create a user interface for your application with controls for allowing the user to log in and log out. This example uses a simple Bootstrap `navbar` to display these controls.

```html
<!-- index.html -->

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
```