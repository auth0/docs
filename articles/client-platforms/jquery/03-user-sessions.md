---
title: User Sessions
description: This tutorial demonstrates how to integrate Auth0 with jQuery to add session handling and logout to your web app.
budicon: 280
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '03-Session-Handling',
  requirements: [
    'jQuery 3.1.0'
  ]
}) %>

The previous steps covered how to complete an authentication transaction and store the tokens that Auth0 returns. This accomplishes the initial login for the user, but thus far there is no kind of session being persisted, nor is there any information being displayed about the user.

## Goals of this Step

1. Fetch the user's profile and display it on the screen
2. Implement a way to persist the user's session by checking whether or not they should be considered authenticated when the page is refreshed

## Fetch the User's Profile

When a valid **access token** is sent to Auth0's `/userinfo` endpoint, a profile object for the owner of the access token will be returned. This can be done with the `userInfo` method from **auth0.js**.

Create a function which passes the user's access token to the `userInfo` method and saves the returned `profile` in local storage for later use. A function for displaying the UI elements which are pertinent to the user profile can also be provided and called with the returned profile object.

```js
// app.js

function getProfile(accessToken) {
  auth.client.userInfo(accessToken, function(err, profile) {
    if (err) { 
      console.log(error);
      return;
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    displayProfile(profile);
  });
}

function displayProfile(profile) {
  $('.avatar').attr('src', profile.picture);
  $('.nickname').text(profile.nickname);
  $('.email').text(profile.email);
  $('.full-profile').text(JSON.stringify(profile, null, 2));
}
```

## Check the User's ID Token on Page Refresh

As opposed to traditional cookie and session-based authentication, JWT is stateless. This means that there is no information held on the server to say anything about whether or not the user is authenticated. In addition to this, a single page application typically doesn't have any kind of persistent connection to a backend, but rather communicates with it via XHR requests.

The best indication, or "hint", that we can use on the client side to say something about the user being authenticated is to check whether or not their JWT is expired. This hint is useful as an indication that the user is "authenticated" and allows the application to make decisions based on that status. For instance, various UI elements can be shown or hidden.

Create two UI helper functions to handle these two cases.

```js
// app.js

function userIsAuthenticated() {
  $('#login-message').hide();
  $('#logged-in-message').show();
  $('.btn-login').hide();
  $('.btn-logout').show();
  $('.profile-area').show();
}

function userIsNotAuthenticated() {
  $('#login-message').show();
  $('#logged-in-message').hide();
  $('.btn-login').show();
  $('.btn-logout').hide();
  $('.profile-area').hide();
}
```

The previous steps showed how to adjust UI elements after the initial authentication process. However, if the user refreshes the page or navigates to a different route, this application state will be lost. To overcome this, check for the presence of the user's **ID token** and its expiry status when the page is loaded.

```js
// app.js

var idToken = localStorage.getItem('id_token') || null;
var profile = localStorage.getItem('profile') || null;

if (idToken && !isTokenExpired(idToken)) {
  if (profile) {
    displayProfile(JSON.parse(profile));
  }
  userIsAuthenticated();
} else {
  userIsNotAuthenticated();
}
```

The `isTokenExpired` function uses a package called **jwt-decode** which can be installed with Bower. This function should decode the token and find the expiry time in its payload. The expiry time can then be checked against the current time.

```bash
bower install jwt-decode
```

```html
<script src="bower_components/jwt-decode/build/jwt-decode.js"></script>
```

```js
// app.js

function isTokenExpired(token) {
  return jwt_decode(token).exp < Date.now() / 1000;
}
```