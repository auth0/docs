<%= include('../../_includes/_login_preamble', { library: 'jQuery', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/embedded-login/01-Embedded-Login'}) %>

## Create an Authentication Service

Add a new file called `app.js`. In this file you can create and manage an instance of `auth0.WebAuth` and also hold logic to hide and display DOM elements.

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
**Checkpoint:** Try adding a `button` with the `btn-login` ID to your app. This will call the `authorize` method from auth0.js so you can see the login page.
:::

![hosted login](/media/articles/web/hosted-login.png)

### Finish Out the Authentication Functions

Add some additional functions to `app.js` to fully handle authentication in the app.

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

The file now includes several other functions for handling authentication.

* `handleAuthentication` - looks for an authentication result in the URL hash and processes it with the `parseHash` method from auth0.js
* `setSession` - sets the user's `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed

### About the Authentication Functions

The first noteworthy thing happening here is that an instance of `auth0.WebAuth` is created. The options object passed to it includes configuration for your client and domain, a response type to indicate you would like to receive an `access_token` and `id_token` after authentication, and an `audience` and `scope` which specify that authentication should be [OIDC conformant](https://auth0.com/docs/api-auth/tutorials/adoption). Also specified is the location that users should be returned to after authentication is complete. In this case, that's the main URL for the application.

When a user successfully authenticates at Auth0's hosted login page and is redirected back to your application, there will be a hash fragment in the URL containing their authentication information. Contained within will be an `access_token`, an `id_token` and an `expires_in` value. These values are extracted from the URL using the `parseHash` method from auth0.js and are then saved into local storage with the `setSession` method. This method also calculates the time at which the `access_token` will expire using the `expires_in` value from the hash.

Authentication using JSON Web Tokens is stateless by nature, meaning that there is no information about the user's session stored on your server. In this way, setting up a session for the user on the client side is simply a matter of saving the `access_token`, `id_token`, and a time that the `access_token` expires at in browser storage. Conversely, logging the user out only requires that these items be removed from storage. These examples use local storage to save the tokens and the expiry time, but you may also use session storage or cookies if you wish.

The application needs some way to make decisions about showing or hiding UI elements and restricting routing based on whether or not the user can be considered "authenticated". Once again, since JWT authentication is stateless, there is no real way to say whether the user is authenticated in any traditional sense, but there are clues that can be used. The best clue to go with is whether or not the `access_token` is expired. If it is expired, anything meaningful that the user could do with it--such as a call to your API for protected resources--will not work. It's at this point that the user would need to reauthenticate and get a new token. The `isAuthenticated` method checks whether the expiry time for the `access_token` has passed or not so that the above-mentioned decisions can be made.

## Provide a Login Control

Provide a template with controls for the user to log in and log out.

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
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `click` event listeners added to the **Log In** and **Log Out** buttons make the appropriate calls to the functions in `app.js` to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the user will be redirected to Auth0's hosted login page.

<%= include('../../_includes/_hosted_login_customization' }) %>

## Process the Authentication Result

When a user authenticates at Auth0's hosted login page and is then redirected back to your application, their authentication information will be contained in a URL hash fragment. The `handleAuthentication` function in `app.js` is responsbile for processing the hash.

Call `handleAuthentication` in `app.js` so that the authentication hash fragment can be processed when the app first loads after the user is redirected back to it.

```js
// app.js

$('document').ready(function() {

  // ...
  handleAuthentication();
});
```
