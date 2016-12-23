---
title: Session Handling
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

In the previous steps of this tutorial, you enabled user login with the `Lock` widget and then with `Auth0.js`.

In this step, you will create a session for that user and also allow the user to log out.

## Create Session

Once the user is logged in, you will want to create a session for that user. To do this, you only need to store the value of the `id_token` attribute that is returned in the Lock `authenticated` callback parameter.

**NOTE**: This example uses `localStorage`, but you can use any storage library. At the end of this guide you can see how to do the same with `Lockr` storage library.

```javascript
// app.js

var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  auth: {
    params: {
      scope: 'openid email'
    } //Details: https://auth0.com/docs/scopes
  }
});

lock.on("authenticated", function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);
});
```

## Check Session

To check if a user is authenticated, we read the `id_token` value from localStorage:

```javascript
// app.js

var id_token = localStorage.getItem('id_token');

if (null != id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      // Remove expired token (if any) from localStorage
      localStorage.removeItem('id_token');
      return alert('There was an error getting the profile: ' + err.message);
    } // else: user is authenticated
  });
}
```

## Logout

To log out a user, remove the token from `localStorage`:

```javascript
// app.js

var logout = function() {
  localStorage.removeItem('id_token');
  window.location.href = "/";
}
```

Then create the buttons for login and logout:

```html
<!-- index.html -->

<button class="btn btn-primary btn-margin" id="btn-login">Log In</button>
<button class="btn btn-primary btn-margin" id="btn-logout">Log Out</button>
```

And add their functionality:

```javascript
// app.js

var btn_login = $('#btn-login');
var btn_logout = $('#btn-logout');

btn_login.click(function(e) {
  e.preventDefault();
  lock.show();
});

btn_logout.click(function(e) {
  e.preventDefault();
  logout();
});
```

## Session handling example using [Lockr](https://github.com/tsironis/lockr) storage library

```javascript
// app.js

// Create session

lock.on("authenticated", function(authResult) {
  Lockr.set('id_token', authResult.idToken);
});

var id_token = Lockr.get('id_token');
if (null != id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      // Remove expired token (if any) from storage
      Lockr.rm('id_token');
      return alert('There was an error getting the profile: ' + err.message);
    } // else: user is authenticated
  });
}

// Logout

var logout = function() {
  Lockr.rm('id_token');
  window.location.href = "/";
}
```