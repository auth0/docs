---
title: Session Handling
description: This tutorial demonstrates how to add session handling and logout to your web app
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '03-Session-Handling'
}) %>

In the previous steps of this tutorial, you enabled the user login with `Lock` and then with `auth0.js`. In this step, you will create a session for that user and also allow them to log out.

## Create Session

Once the user is logged in, a client-side session should be created for them. To do this, the user's `id_token` that is returned in the Lock `authenticated` callback parameter should be stored in `localStorage`.

**NOTE**: This example uses `localStorage`, but you can use any storage library. At the end of this guide, you can see how to do the same with the `Lockr` storage library.

```js
// app.js

...

var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');

...

lock.on("authenticated", function(authResult) {
  localStorage.setItem('id_token', authResult.idToken);

  ...

});
...
```

## Check the Session

Determining whether the user is authenticated on the client side is simply a matter of checking whether they have a JWT in local storage. Since JWT authentication is stateless (no session exists on the server), the presence of a JWT is all that is needed to give the front-end application some indication that the user is authenticated.

```js
// app.js

...

var init = function() {
  var id_token = localStorage.getItem('id_token');
  if (id_token) {

    // perform logic for an authenticated user
    ...
  }
};

...

init();

...
```

## Logout

To log a user out, provide a method that removes their token from `localStorage`.

```js
// app.js

...

var logout = function() {
  localStorage.removeItem('id_token');
  window.location.href = "/";
};

...
```

Create buttons that will be used to log the user in and out.

```html
<!-- index.html -->

...

<button id="btn-login">Log In</button>
<button id="btn-logout">Log Out</button>

...
```

Attach event listeners to the button clicks. The `login` button should call `lock.show()` and the `logout` button should call the `logout()` function above.

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

## Session Handling Example using [Lockr](https://github.com/tsironis/lockr) Storage Library

```js
// app.js

// Create a session

...

lock.on("authenticated", function(authResult) {
  Lockr.set('id_token', authResult.idToken);
});

...

// Check the session

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
