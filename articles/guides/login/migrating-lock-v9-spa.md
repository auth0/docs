---
title: Moving Web Applications using Lock to Universal Login 
description: Learn how to migrate from Web Applications using Lock to Universal Login
toc: true
topics:
  - lock
  - migrations
  - spa
  - universal-login
contentType:
    - how-to
useCase: migrate
---
# Migrate Single-Page Applications using Lock 9 to Universal Login

This document explains how to migrate Web Applications using [Lock](/libraries/lock) to Universal Login. For other migration scenarios see [Migrating from Embedded to Universal Login](/guides/login/migration-embedded-universal).

When you use Lock v9 in a Web Application, your code does basically this:

1. Initialize Lock:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

2. Show lock specifying `responseType: token` when a login is required:

```js
function login() {
    lock.show({
        callbackURL: '${account.callback}',
        responseType : 'token',
        authParams: {
            scope: 'openid profile'
        }
    });
}
```

3. When the page loads, attempt to parse the hash with the authentication results:

```js
  var hash = lock.parseHash();

  if (hash) {
      if (!hash.error) {
          setSession(hash.profile, hash.id_token, hash.access_token);

          lock.getProfile(hash.id_token, function(err, profile) {
              if (!err) {
                  // use the profile
              }
          });
      }
  }
```

To use **Universal Login**, you need to use [auth0.js](/libraries/auth0js) to manage the authentication flow:

1. Initialize auth0.js, using the same parameters as when initializing Lock and also including the ones you use when you call lock.show():

```js
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token id_token',
  scope: 'openid',
  redirectUri: '${account.callback}'
});
```

2. When the page loads, attempt to parse the hash with the authentication results:

```js
webAuth.parseHash(function(err, authResult) {
  if (authResult && authResult.accessToken && authResult.idToken) {
    setSession(authResult.idTokenPayload, authResult.idToken, authResult.accessToken);
  } else if (err) {
    // handle errors
  }
}
```

3. Redirect to the `/authorize` endpoint when you need to log the user in your application.

```js
function login() {
    webAuth.authorize();
}
```

4. Review if you are using any [legacy authentication flow in your application](guides/migration-legacy-flows), and adjust your code accordingly.

You can find complete examples of implementing Universal Login in Single-Page Applications for different technologies in our [Quickstarts](/quickstart/spa).

<%= include('_includes/_customizing-login-page') %>
