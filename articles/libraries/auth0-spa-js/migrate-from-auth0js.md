---
section: libraries
title: Migrate from Auth0.js to the Auth0 Single Page App SDK
description: How to migrate single page applications from Auth0.js to Auth0 Single Page App SDK
topics:
  - libraries
  - auth0-spa-js
  - migrations
contentType:
  - how-to
useCase:
  - migrate
---

# Migrate from Auth0.js to the Auth0 Single Page App SDK

In this article, you’ll see how to migrate your single page app (SPA) from [auth0.js](/libraries/auth0js) to [auth0-spa-js](/libraries/auth0-spa-js). Listed below are scenarios using auth0.js and the equivalent auth0-spa-js code.

## Functionality that cannot be migrated

Not all auth0.js functionality can be directly migrated to auth0-spa-js. Scenarios that cannot be directly migrated include:

- embedded [login with username/password](https://auth0.github.io/auth0.js/global.html#login) as well as embedded [passwordless login](https://auth0.github.io/auth0.js/global.html#passwordlessLogin)
- user [signup](https://auth0.github.io/auth0.js/global.html#signup)
- [get a user profile from /userinfo endpoint](https://auth0.github.io/auth0.js/global.html#userInfo)
- [request an email to change the user's password](https://auth0.github.io/auth0.js/global.html#changePassword)
- [link users with the Management API](https://auth0.github.io/auth0.js/global.html#linkUser)
- [get user with the Management API](https://auth0.github.io/auth0.js/global.html#getUser)
- [update user attributes with the Management API](https://auth0.github.io/auth0.js/global.html#patchUserAttributes)
- [update user metadata with the Management API](https://auth0.github.io/auth0.js/global.html#patchUserMetadata)
- There are also some options that are configurable in Auth0.js that do not have a counterpart in the auth0-spa-js. An example of this is `responseType`. There is a reason that there is not a direct 1:1 mapping for each option. In this case, `responseType` is unnecessary, because the SDK is only for use in SPAs, and so one would not need to change the response type.

## Authentication Parameters are not modified anymore

Auth0.js converts custom parameters you set from `camelCase` to `snake_case` internally. For example, if you set `deviceType: 'offline'`, auth0.js actually sends `device_type: 'offline'` to the server.

When using auth0-spa-js, custom parameters **are not converted** from `camelCase` to `snake_case`. It will relay whatever parameter you send to the authorization server.

## Create the client

### auth0.js

* [WebAuth](https://auth0.github.io/auth0.js/WebAuth.html)

```js
import { WebAuth } from 'auth0.js';

window.addEventListener('load', () => {
  var auth0 = new WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: '${account.callback}'
  });
});
```

### auth0-spa-js

* [createAuth0Client()](https://auth0.github.io/auth0-spa-js/globals.html#createauth0client)
* [Auth0ClientOptions](https://auth0.github.io/auth0-spa-js/interfaces/auth0clientoptions.html)

```js
import createAuth0Client from '@auth0/auth0-spa-js';

window.addEventListener('load', () => {
  const auth0 = await createAuth0Client({
    domain: '${account.namespace}',
    client_id: '${account.clientId}',
    redirect_uri: '${account.callback}'
  });
});
```

## Redirect to the Universal Login Page

### auth0.js

* [authorize()](https://auth0.github.io/auth0.js/global.html#authorize)

```js
document.getElementById('login').addEventListener('click', () => {
  auth0.authorize();
});
```

### auth0-spa-js

* [Auth0Client.loginWithRedirect()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#loginwithredirect)
* [RedirectLoginOptions](https://auth0.github.io/auth0-spa-js/interfaces/redirectloginoptions.html)

```js
document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithRedirect();
});
```

## Parse the hash after the redirect

### auth0.js

* [parseHash()](https://auth0.github.io/auth0.js/global.html#parseHash)

```js
window.addEventListener('load', () => {
  auth0.parseHash({ hash: window.location.hash }, function(err, authResult) {
    if (err) {
      return console.log(err);
    }
    console.log(authResult);
  });
});
```

### auth0-spa-js

* [Auth0Client.handleRedirectCallback()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#handleredirectcallback)

```js
window.addEventListener('load', async () => {
  await auth0.handleRedirectCallback();
});
```

## Get the user information

### auth0.js

The `userInfo()` function makes a call to the [/userinfo endpoint](https://auth0.com/docs/api/authentication#user-profile) and returns the user profile.

* [userInfo()](https://auth0.github.io/auth0.js/global.html#userInfo)

```js
window.addEventListener('load', () => {
  auth0.client.userInfo(accessToken, function(err, user) {
    console.log(user)
  });
});
```

### auth0-spa-js

Unlike auth0.js, the Auth0 SPA SDK does not call to the [/userinfo endpoint](https://auth0.com/docs/api/authentication#user-profile) for the user profile. Instead `Auth0Client.getUser()` returns user information from the decoded `id_token`.

* [Auth0Client.getUser()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser)
* [GetUserOptions](https://auth0.github.io/auth0-spa-js/interfaces/getuseroptions.html)

```js
window.addEventListener('load', async () => {
  const user = await auth0.getUser();
  console.log(user);
});
```

## Open the Universal Login Page in a popup

### auth0.js

```js
document.getElementById('login').addEventListener('click', () => {
  auth0.popup.authorize();
});
```

### auth0-spa-js

* [Auth0Client.loginWithPopup()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#loginwithpopup)
* [PopupLoginOptions](https://auth0.github.io/auth0-spa-js/interfaces/popuploginoptions.html)

```js
document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithPopup();
});
```

## Refresh tokens

### auth0.js

* [checkSession()](https://auth0.github.io/auth0.js/global.html#checkSession)

```js
document.getElementById('login').addEventListener('click', () => {
  auth0.checkSession({}, function(err, authResult) {
    // Authentication tokens or error
  });
});
```

### auth0-spa-js

The Auth0 SPA SDK handles Access Token refresh for you. Every time you call `getTokenSilently`, you'll either get a valid Access Token or an error if there's no session at Auth0.

* [Auth0Client.getTokenSilently()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently)

```js
document.getElementById('login').addEventListener('click', async () => {
  await auth0.getTokenSilently();
});
```

## Get a token for a different audience or with more scopes

### auth0.js

* [checkSession()](https://auth0.github.io/auth0.js/global.html#checkSession)

```js
document.getElementById('login').addEventListener('click', () => {
  auth0.checkSession({
    audience: 'https://mydomain/another-api/',
    scope: 'read:messages'
  }, function(err, authResult) {
    // Authentication tokens or error
  });
});
```

### auth0-spa-js

The Auth0 SPA SDK handles Access Token refresh for you. Every time you call `getTokenSilently`, you'll either get a valid Access Token or an error if there's no session at Auth0.

* [Auth0Client.getTokenSilently()](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokensilently)
* [GetTokenSilentlyOptions](https://auth0.github.io/auth0-spa-js/interfaces/gettokensilentlyoptions.html)

```js
document.getElementById('login').addEventListener('click', async () => {
  await auth0.getTokenSilently({
    audience: 'https://mydomain/another-api/',
    scope: 'read:messages'
  });
});
```

Use [getTokenWithPopup](https://auth0.github.io/auth0-spa-js/classes/auth0client.html#gettokenwithpopup) to open a popup and allow the user to consent to the new API:

```js
document.getElementById('login').addEventListener('click', async () => {
  await auth0.getTokenWithPopup({
    audience: 'https://mydomain/another-api/',
    scope: 'read:messages'
  });
});
```
