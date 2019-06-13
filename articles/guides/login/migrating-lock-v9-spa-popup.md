---
title: Migrate SPAs Using Lock 9 Popup Mode to Universal Login
description: Learn how to Migrate SPAs Using Lock 9 Popup Mode to Universal Login
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
# Migrate SPAs Using Lock 9 Popup Mode to Universal Login

This document explains how to migrate Web Applications using [Lock](/libraries/lock) to Universal Login. For other migration scenarios see [Migrating from Embedded to Universal Login](/guides/login/migration-embedded-universal).

When you use 'popup mode' in Lock 9 applications, the entire authentication flow happens in a web page, without any kind of redirection. That will change when you use Universal Login.

1. Initialize Lock:

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

2. Show lock specifying `responseType: token` when a login is required, and a callback function that will be called after authentication transaction finishes:

```js
function login()
{
    lock.show({
            responseType : "token",
            authParams: {
                scope: 'openid email offline_access'
            }
        },
        function (err, profile, id_token) {
            if (!err) {
                setSession(profile, id_token);
                lock.getProfile(hash.id_token, function(err, userInfo) {
                    if (!err) {
                        /// use the userInfo
                    }
                });
            }
        }
    })
}
```

To use **Universal Login**, you need to use [auth0.js](/libraries/auth0js) to manage the authentication flow:

1. Initialize auth0.js, using the same parameters as when initializing Lock and also including the ones you use when you call lock.show(). 

```js
var webAuth = new auth0.WebAuth({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  responseType: 'token id_token',
  scope: 'openid',
  redirectUri: '${account.callback}'
});
```

2. Redirect to the `/authorize` endpoint when you need to log the user in your application.

```js
function login() {
    webAuth.authorize();
}
```

3. Call parseHash to retrieve the authentication results, when the page loads, after being redirected to your callback page:

```js
webAuth.parseHash(function(err, authResult) {
  if (authResult && authResult.accessToken && authResult.idToken) {
    setSession(authResult.idTokenPayload, authResult.idToken, authResult.accessToken);
  } else if (err) {
    // handle errors
  }
}
```

4. Review if you are using any [legacy authentication flow in your application](guides/migration-legacy-flows), and adjust your code accordingly.

You can find complete examples of implementing Universal Login in Single-Page Applications for different technologies in our [Quickstarts](/quickstart/spa).

<%= include('_includes/_customizing-login-page') %>
