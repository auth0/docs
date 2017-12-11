---
title: Moving SPAs using Lock to Centralized Login 
description: Learn how to migrate from Single Page Applications using Lock to Centralized Login
toc: true
---

# Migrate SPAs using Lock 10+ to Centralized Login

This document explains how to migrate Single Page Applications using Lock to centralized ;login. For other migration scenarios click [here](/articles/guides/login/migration-embedded-centralized).

When using Lock your code does basically four things:

- Initialize Lock:

```js
var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      redirectUrl: AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      params: {
        scope: 'openid'
      }
});
```

- Set the session and update the UI in the ‘authenticated’ event:
 
```js
lock.on('authenticated', function (authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult); // set the local session
    }
    displayButtons(); // refresh the UI to indicated a ‘logged-in’ state.
});
```

- Handle errors in the ‘authorization_error’ event:

```js
// Handle authorization errors
lock.on('authorization_error', function (err) {
    console.log(err);
    alert('Error: ' + err.error + '. Check the console for further details.');
    displayButtons();
});
```

- Show lock when the login button is clicked:

```js
function login() {
    lock.show();
}
```

To use centralized login, you need to use Auth0.js to perform the same tasks:

- Initialize Auth0.js, using the same parameters as when initializing Lock:

```js
var webAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
  scope: 'openid',
  redirectUri: AUTH0_CALLBACK_URL
});
```

- Create a `handleAuthentication` function that processes successful and failed authentication attempts calling `parseHash`:

```js
function handleAuthentication() {
   webAuth.parseHash(function(err, authResult) {
     if (authResult && authResult.accessToken && authResult.idToken) {
       setSession(authResult);
     } else if (err) {
        console.log(err);
      alert(
        'Error: ' + err.error + '. Check the console for further details.'
      );
    }
    displayButtons();
  });
}
```

- Invoke the `handleAuthentication()` function on page load so it tries to parse the hash if it's present.

- Redirect to the centralized login page when the login button is clicked:

```js
function login() {
    webAuth.authorize();
}
```

You can find complete examples of implementing centralized login in Single Page Applications for different technologies in our [Quickstarts](/quickstart/spa).

<%= include('_includes/_customizing-login-page') %>

