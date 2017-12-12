---
title: Moving SPAs using Lock to Centralized Login 
description: Learn how to migrate from Single Page Applications using Lock to Centralized Login
toc: true
---

# Migrate SPAs using Lock 10+ to Centralized Login

This document explains how to migrate Single Page Applications using Lock to centralized login. 

For other migration scenarios see [Migrating from Embedded to Centralized Login](/articles/guides/login/migration-embedded-centralized).

When you use Lock, your code does basically four things:

1. Initialize Lock:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: {
      redirectUrl: '${account.callback}',
      responseType: 'token id_token',
      audience: 'https://' + '${account.namespace}' + '/userinfo',
      params: {
        scope: 'openid'
      }
    }
});
```

2. Set the session and update the UI in the `authenticated` event:
 
```js
lock.on('authenticated', function (authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSession(authResult); // set the local session
    }
    displayButtons(); // refresh the UI to indicated a ‘logged-in’ state.
});
```

3. Handle errors in the `authorization_error` event:

```js
// Handle authorization errors
lock.on('authorization_error', function (err) {
    console.log(err);
    alert('Error: ' + err.error + '. Check the console for further details.');
    displayButtons();
});
```

4. Show lock when the login button is clicked:

```js
function login() {
    lock.show();
}
```

To use centralized login, you need to use Auth0.js to perform the same tasks:

1. Initialize Auth0.js, using the same parameters as when initializing Lock:

```js
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token id_token',
  audience: 'https://' + ${account.namespace} + '/userinfo',
  scope: 'openid',
  redirectUri: '${account.callback}'
});
```

2. Create a `handleAuthentication` function that processes successful and failed authentication attempts calling `parseHash`:

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

3. Invoke the `handleAuthentication()` function on page load so it tries to parse the hash if it's present.

4. Redirect to the centralized login page when the login button is clicked:

```js
function login() {
    webAuth.authorize();
}
```

You can find complete examples of implementing centralized login in Single Page Applications for different technologies in our [Quickstarts](/quickstart/spa).

<%= include('_includes/_customizing-login-page') %>
