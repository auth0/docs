---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 library to add custom authentication and authorization to your web app.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '02-Custom-Login',
  requirements: [
    'jQuery 3.1.0'
  ]
}) %>

Auth0's hosted Lock widget provides a quick and easy way to get up and running with authentication. For those cases where a custom login form is necessary, you may supply your own form and use **auth0.js** to make the appropriate authentication calls. This step demonstrates how to add a custom login form to a jQuery application.

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

## Provide a Login Form

The focus of this step is on how to allow users to log into a jQuery application using a custom form, but it will also show how to allow sign up and social authentication using the same form.

Provide a form with `input` elements for the user's email address and password.

```html
<!-- index.html -->

<div id="log-in-message">
  <h3>Welcome, please log in!</h3>
</div>

<div id="logged-in-message">
  <h3>Thank you for logging in!</h3>
  <button class="btn btn-default" type="button" id="btn-logout">Log Out</button>
</div>

<form class="login-form">

  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="text" id="email" class="form-control" placeholder="Email Address" autofocus required>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" class="form-control" placeholder="Password" required>
  </div>

  <div class="form-group">
    <button class="btn btn-primary" id="btn-login">Log In</button>
    <button class="btn btn-primary" id="btn-signup">Sign Up</button>
  </div>

  <div class="form-group">        
    <button class="btn btn-danger" type="button" id="btn-google">Log In with Google</button>
  </div>

</form>
```

The form also has buttons for **Log In** and **Sign Up**. These buttons will trigger events which have callbacks to handle those actions. A **Log In with Google** button is supplied and will trigger an authentication transaction with Google.

![custom login form](/media/articles/jquery/custom-login.png)

## Provide Login and Signup Event Listeners

The **Log In** and **Sign Up** buttons should trigger calls to the appropriate **auth0.js** methods to handle those actions.

```js
// app.js

var btnLogin = $('#btn-login');
var btnSignup = $('#btn-signup');

btnLogin.on('click', function(e) {
  e.preventDefault();
  var email = $('#email').val();
  var password = $('#password').val();

  auth.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token id_token',
    redirectUri: window.location.href,
    email: email,
    password: password,
  }, function(err) {
    if (err) {
      alert(err.description);
    }
  });
});

btnSignup.on('click', function(e) {
  e.preventDefault();
  var email = $('#email').val();
  var password = $('#password').val();

  auth.signup({
    connection: 'Username-Password-Authentication',
    responseType: 'token id_token',
    redirectUri: window.location.href,
    email: email,
    password: password
  }, function(err, user) {
    if (err) {
      alert(err.description);
      return;
    }
    console.log(user);
  });
});
```

When the buttons are clicked, the values from the `email` and `password` input elements are supplied to calls to the `login` and `signup` methods from **auth0.js** respectively. These calls are also configured to specify that the user should be redirected to the URI from which the call was initiated, which is determined using `window.location.href` in this case. When the user sucessfully authenticates, their access token and ID token will be returned in the URL hash. Much like the previous step, the `parseHash` method from **auth0.js** can be used to handle this.

## Parse the Hash and Save The User's Tokens

When the user successfully authenticates, their access token and ID token will be included in the URL hash. These values can be parsed and saved in local storage for later use.

```js
// app.js

var authResult = auth.parseHash(window.location.hash);

if (authResult && authResult.accessToken && authResult.idToken) {
  window.location.hash = '';
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  userIsAuthenticated();
} else {
  userIsNotAuthenticated();
}
```

The `userIsAuthenticated` and `userIsNotAuthenticated` functions exist as helpers to conditionally hide or display various UI elements. In this example, the form itself and the associated messages can be shown or hidden depending on the whether or not the user's authentication action was successful.

```js
// app.js

function userIsAuthenticated() {
  $('.login-form').hide();
  $('#logged-in-message').show();
  $('#log-in-message').hide();
}

function userIsNotAuthenticated() {
  $('.login-form').show();
  $('#logged-in-message').hide();
  $('#log-in-message').show();
}
```

Now when the user logs in or signs up, their access token and ID token will be stored in local storage and the UI will be updated to reflect the fact that they have logged in.

## Social Authentication

For social authentication with a custom form, the only required UI element is a button for each social provider you wish to include. In this example, Google will be used as one such provider.

The form snippet above includes a button for allowing users to log in with their Google account. With that button in place, listen for a click event on it and trigger authentication with **auth0.js**.

```js
// app.js

var btnGoogle = $('#btn-google');

btnGoogle.on('click', function(e) {
  e.preventDefault();
  auth.login({
    connection: 'google-oauth2',
    responseType: 'token id_token',
    redirectUri: window.location.href,
  }, function(err) {
    if (err) {
      alert(err.description);
    }
  });
});
```

In the callback for this listener, the `login` method from **auth0.js** is called and a `connection` of `google-oauth2` is specified. This will trigger a redirect to Google where the user can supply their credentials. If authentication is successful, the user will be redirected to the jQuery application and the `parseHash` method will find the access token and ID token, saving them in local storage.

<%= include('_includes/_logout') %>