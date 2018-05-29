<%= include('../../_includes/_login_preamble', { library: 'jQuery', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/embedded-login/01-Embedded-Login'}) %>

### Create an Authentication Service

Add a new file and name it `app.js`. You can use the file to create and manage an instance of the `auth0.WebAuth` object and hold logic to hide and display DOM elements.

```js
// app.js

$('document').ready(function() {

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  var loginBtn = $('#btn-login');

  loginBtn.click(function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

});
```

::: note
**Checkpoint:** Add a button with the `btn-login` ID to your app. This will call the `authorize` method from auth0.js, so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Tokens

Add more functions to the `app.js` file to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication`: looks for the result of authentication in the URL hash. Then, the result is processed with the `parseHash` method from auth0.js
* `setSession`: stores the user's Access Token, ID Token, and the Access Token's expiry time in browser storage
* `logout`: removes the user's tokens and expiry time from browser storage
* `isAuthenticated`: checks whether the expiry time for the user's Access Token has passed

```js
// app.js

$('document').ready(function() {

  // ...
  var loginStatus = $('.container h4');
  var loginView = $('#login-view');
  var homeView = $('#home-view');

  // buttons and event listeners
  var homeViewBtn = $('#btn-home-view');
  var loginBtn = $('#btn-login');
  var logoutBtn = $('#btn-logout');

  homeViewBtn.click(function() {
    homeView.css('display', 'inline-block');
    loginView.css('display', 'none');
  });

  loginBtn.click(function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.click(logout);

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

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.css('display', 'none');
        homeView.css('display', 'inline-block');
      } else if (err) {
        homeView.css('display', 'inline-block');
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.css('display', 'none');
      logoutBtn.css('display', 'inline-block');
      loginStatus.text('You are logged in!');
    } else {
      loginBtn.css('display', 'inline-block');
      logoutBtn.css('display', 'none');
      loginStatus.text('You are not logged in! Please log in to continue.');
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
        <a class="navbar-brand" href="#">Auth0 - jQuery</a>

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

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` event listeners on the buttons make calls to functions in the `app.js` file to let the user log in or out. When the user clicks **Log In**, the user is redirected to the login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

### Process the Authentication Result

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` function in the `app.js` file processes the hash.

Call the `handleAuthentication` function in the `app.js` file. The function processes the authentication hash while your app loads. 

```js
// app.js

$('document').ready(function() {

  // ...
  handleAuthentication();
});
```