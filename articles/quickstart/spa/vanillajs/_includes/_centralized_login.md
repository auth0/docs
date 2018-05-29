<%= include('../../_includes/_login_preamble', { library: 'JavaScript', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-javascript-samples/tree/embedded-login/01-Embedded-Login'}) %>

### Create an Authentication Service

Add a new file called `app.js`. In the file, you can create and manage an instance of the `auth0.WebAuth` object. In that instance, you can define the following:

<%= include('../../_includes/_auth_service_configure_client_details') %>

::: note
In this case, the route is the main URL for your application.
:::

You can also use it to hold logic for hiding and displaying DOM elements.

```js
// app.js

window.addEventListener('load', function() {

  var webAuth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    responseType: 'token id_token',
    audience: 'https://${account.namespace}/userinfo',
    scope: 'openid',
    redirectUri: window.location.href
  });

  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

});
```

::: note
**Checkpoint:** Try to add a button with the `btn-login` ID to your app. This will call the `authorize` method from auth0.js so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Tokens

Add more functions to the `app.js` file to handle authentication in the app.

The example below shows the following functions:
* `handleAuthentication`: looks for the result of authentication in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession`: sets the user's Access Token, ID Token, and the Access Token's expiry time 
* `logout`: removes the user's tokens and expiry time from browser storage
* `isAuthenticated`: checks whether the expiry time for the user's Access Token has passed

```js
// app.js

window.addEventListener('load', function() {

  // ...
  var loginStatus = document.querySelector('.container h4');
  var loginView = document.getElementById('login-view');
  var homeView = document.getElementById('home-view');

  // buttons and event listeners
  var homeViewBtn = document.getElementById('btn-home-view');
  var loginBtn = document.getElementById('btn-login');
  var logoutBtn = document.getElementById('btn-logout');

  homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';
  });

  logoutBtn.addEventListener('click', logout);

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        homeView.style.display = 'inline-block';
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function setSession(authResult) {
    // Set the time that the Access Token will expire at
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
    // Access Token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
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
});
```

### Provide a Login Control

Provide a template with controls for the user to log in and out.

```html
<!-- index.html -->

<div class="content">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Auth0 - JavaScript</a>

        <button id="btn-home-view" class="btn btn-primary btn-margin">
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
    <!-- home view -->
    <div id="home-view">
      <h4></h4>
    </div>
    
  </main>

</div>
```

::: note
This example uses Bootstrap styles. You can use any style library, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` event listeners on the buttons make calls to functions in the `app.js` file to let the user log in or out. When the user clicks **Log In**, they are redirected to the login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

### Process the Authentication Result

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `app.js` file processes the hash. 

Call the `handleAuthentication` method in the `app.js` file. The method processes the authentication hash while your app loads. 

```js
// app.js

window.addEventListener('load', function() {

  // ...
  handleAuthentication();
});
```
