---
title: Session Handling
description: This tutorial will show you how to integrate Auth0 with VanillaJS to add session handling and logout to your web app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '03-Session-Handling',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

In the previous steps of this tutorial, you enabled user login with the `Lock` widget and then with `Auth0.js`.

In this step, you will create a session for that user and also allow the user to logout.

## Create Session

Once the user is logged in, you will want to create a session for that user. To do this, you only need to store the value of the `id_token` attribute that is returned in the Lock `authenticated` callback parameter.

**NOTE**: This example uses `localStorage`, but you can use any storage library. At the end of this guide you can see how to do the same with `Lockr` storage library.

```javascript
/* ===== ./app.js ===== */
...
var AUTH0_CLIENT_ID = '';
var AUTH0_DOMAIN = '';
var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

...

lock.on("authenticated", function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);
  ...
});
...
```

## Check Session

To check if a user is authenticated, we read the `id_token` value from localStorage:

```javascript
/* ===== ./app.js ===== */
...
var init = function() {
  var id_token = localStorage.getItem('id_token');
  if (id_token) {
    ...
  }
};

...

init();
...
```

## Logout

To logout a user, remove the token from `localStorage`:

```javascript
/* ===== ./app.js ===== */
...
var logout = function() {
  localStorage.removeItem('id_token');
  window.location.href = "/";
};
...
```

Then create the buttons for login and logout:

```html
<!-- ===== ./index.html ===== -->
...
<button id="btn-login">Log In</button>
<button id="btn-logout">Log Out</button>
...
```

And add their functionality:

```javascript
/* ===== ./app.js ===== */
...
// buttons
var btn_login = document.getElementById('btn-login');
var btn_logout = document.getElementById('btn-logout');

btn_login.addEventListener('click', function() {
  lock.show();
});

btn_logout.addEventListener('click', function() {
  logout();
});
...
```

## Session handling example using [Lockr](https://github.com/tsironis/lockr) storage library

```javascript
/* ===== ./app.js ===== */

// Create session
...
lock.on("authenticated", function(authResult) {
  Lockr.set('id_token', authResult.idToken);
});
...

// Check session
...
var init = function() {
  var id_token = Lockr.get('id_token');
  if (id_token) {
    ...
  }
};

...
init();

// Logout
...
var logout = function() {
  Lockr.rm('id_token');
  window.location.href = "/";
};
...
```

# Summary

In this guide you learned how to use `localStorage` directly or `Lockr` (localStorage wrapper) to create a new session, check session status and end user session (logout).
