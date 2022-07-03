---
section: libraries
toc: true
title: Auth0 Single Page App SDK
description: Auth0 SDK for single page applications using Authorization Code Grant Flow with PKCE.
topics:
  - libraries
  - auth0-spa-js
contentType:
  - index
---

<!-- markdownlint-disable MD041 -->

# Auth0 Single Page App SDK

The Auth0 Single Page App SDK is a new JavaScript library for implementing authentication & authorization in single page apps (SPA) with Auth0. It provides a high-level API and handles a lot of the details so you can secure SPAs using best practices while writing less code.

The Auth0 SPA SDK handles grant and protocol details, token expiration and renewal, as well as token storage and cacheing. Under the hood, it implements [Universal Login](/universal-login) and the [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

The library is [hosted on GitHub](https://github.com/auth0/auth0-spa-js) and you can find the API documentation [here](https://auth0.github.io/auth0-spa-js/).

If your SPA is based on React, check out the [Auth0 React SDK](/libraries/auth0-react).

<%= include('../_includes/_spa_js_faq.md') %>

## Installation

You have a few options for using auth0-spa-js in your project:

From the CDN:

```html
<script src="${auth0spajs_url}"></script>
```

Using [npm](https://npmjs.org):

```sh
npm install @auth0/auth0-spa-js
```

Using [yarn](https://yarnpkg.com):

```sh
yarn add @auth0/auth0-spa-js
```

## Getting Started

### Create the client

First, you'll need to create a new instance of `Auth0Client` client object. Create the `Auth0Client` instance before rendering or initializing your application. You can do this using either the async/await method, or with promises. You should only create one instance of the client.

```js
import createAuth0Client from '@auth0/auth0-spa-js';

// either with async/await
const auth0 = await createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}'
});
```

```js
// or with promises
createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}'
}).then(auth0 => {
  //...
});
```

Using `createAuth0Client` does a couple of things automatically:

* It creates an instance of `Auth0Client`.
* It calls `getTokenSilently` to refresh the user session.
* It suppresses all errors from `getTokenSilently`, except `login_required`.

You can also create the client directly using the `Auth0Client` constructor. This can be useful if:

* You wish to bypass the call to `getTokenSilently` on initialization.
* You wish to do custom error handling.
* You wish to initialize the SDK in a synchronous way.

```js
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}'
});
```

### Login and get user info

Next, create a button users can click to start logging in.

```html
<button id="login">Click to Login</button>
```

Listen for click events on the button you created. When the event occurs, use the desired login method to authenticate the user (`loginWithRedirect()` in this example). After the user is authenticated, you can retrieve the user profile with the `getUser()` method.

```js
// either with async/await
document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithRedirect({
    redirect_uri: 'http://localhost:3000/'
  });
  //logged in. you can get the user profile like this:
  const user = await auth0.getUser();
  console.log(user);
});
```

```js
// or with promises
document.getElementById('login').addEventListener('click', () => {
  auth0.loginWithRedirect({
    redirect_uri: 'http://localhost:3000/'
  }).then(token => {
    //logged in. you can get the user profile like this:
    auth0.getUser().then(user => {
      console.log(user);
    });
  });
});
```

### Call an API

To call your API, start by getting the user's Access Token. Then use the Access Token in your request. In this example the `getTokenSilently` method is used to retrieve the Access Token.

```html
<button id="callApi">Call an API</button>
```

```js
// either with async/await
document.getElementById('callApi').addEventListener('click', async () => {
  const accessToken = await auth0.getTokenSilently();
  const result = await fetch('https://exampleco.com/api', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const data = await result.json();
  console.log(data);
});
```

```js
// or with promises
document.getElementById('callApi').addEventListener('click', () => {
  auth0
    .getTokenSilently()
    .then(accessToken =>
      fetch('https://exampleco.com/api', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })
    )
    .then(result => result.json())
    .then(data => {
      console.log(data);
    });
});
```

### Logout

Add a button users can click to logout.

```html
<button id="logout">Logout</button>
```

```js
document.getElementById('logout').addEventListener('click', () => {
  auth0.logout();
});
```

### Change storage options

The Auth0 SPA SDK stores tokens in memory by default. However, this does not provide persistence across page refreshes and browser tabs. Instead, you can opt-in to store tokens in local storage by setting the `cacheLocation` property to `localstorage` when initializing the SDK. This can help to mitigate some of the effects of browser privacy technology that prevents access to the Auth0 session cookie by storing Access Tokens for longer.

::: warning
Storing tokens in browser local storage provides persistence across page refreshes and browser tabs. However, if an attacker can achieve running JavaScript in the SPA using a cross-site scripting (XSS) attack, they can retrieve the tokens stored in local storage. A vulnerability leading to a successful XSS attack can be either in the SPA source code or in any third-party JavaScript code (such as bootstrap, jQuery, or Google Analytics) included in the SPA.

Read more about [token storage](/tokens/concepts/token-storage#single-page-app-scenarios).
:::

```js
const auth0 = await createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}',
  cacheLocation: 'localstorage'
});
```

### Use rotating Refresh Tokens

The Auth0 SPA SDK can be configured to use [rotating Refresh Tokens](/tokens/concepts/refresh-token-rotation) to get new access tokens silently. These can be used to bypass browser privacy technology that prevents access to the Auth0 session cookie when authenticating silently, as well as providing [built-in reuse detection](/tokens/concepts/refresh-token-rotation#automatic-reuse-detection).

Configure the SDK to do this by setting `useRefreshTokens` to `true` on initialization:

```js
const auth0 = await createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}',
  useRefreshTokens: true
});

// Request a new access token using a refresh token
const token = await auth0.getTokenSilently();
```

Refresh Tokens will also need to be [configured for your tenant](/tokens/guides/configure-refresh-token-rotation) before they can be used in your SPA.

Once configured, the SDK will request the `offline_access` scope during the authorization step. Furthermore, `getTokenSilently` will then call the `/oauth/token` endpoint directly to exchange refresh tokens for access tokens.

:::note
The SDK will obey the storage configuration when storing refresh tokens. If the SDK has been configured using the default in-memory storage mechanism, refresh tokens will be lost when refreshing the page.
:::

## Usage 

Below are examples of usage for various methods in the SDK. Note that jQuery is used in these examples.

### Login with popup

```js
$('#loginPopup').click(async () => {
  await auth0.loginWithPopup();
});
```

### Login with redirect

```js
$('#loginRedirect').click(async () => {
  await auth0.loginWithRedirect({
    redirect_uri: 'http://localhost:3000/'
  });
});
```

Redirect to the `/authorize` endpoint at Auth0, starting the [Universal Login](/universal-login) flow.

### Login with redirect callback

```js
$('#loginRedirectCallback').click(async () => {
  await auth0.handleRedirectCallback();
});
```

### Get Access Token with no interaction

Get a new Access Token silently using either a hidden iframe and `prompt=none`, or by using a rotating Refresh Token. Refresh Tokens are used when `useRefreshTokens` is set to `true` when configuring the SDK.

If in-memory storage (the default) and refresh tokens are used, new tokens are retrieved using a web worker on supported browsers.

```js
$('#getToken').click(async () => {
  const token = await auth0.getTokenSilently();
});
```

The `getTokenSilently()` method requires you to have **Allow Skipping User Consent** enabled in your [API Settings in the Dashboard](${manage_url}/#/apis). Additionally, user consent [cannot be skipped on 'localhost'](/api-auth/user-consent#skipping-consent-for-first-party-applications).

### Get Access Token with popup

```js
$('#getTokenPopup').click(async () => {
  const token = await auth0.getTokenWithPopup({
    audience: 'https://mydomain/api/',
    scope: 'read:rules'
  });
});
```

### Get Access Token for a different audience

```js
$('#getToken_audience').click(async () => {
  const differentAudienceOptions = {
    audience: 'https://mydomain/another-api/',
    scope: 'read:rules',
    redirect_uri: 'http://localhost:3000/callback.html'
  };
  const token = await auth0.getTokenSilently(differentAudienceOptions);
});
```

### Get user

```js
$('#getUser').click(async () => {
  const user = await auth0.getUser();
});
```

### Get ID Token claims

```js
$('#getIdTokenClaims').click(async () => {
  const claims = await auth0.getIdTokenClaims();
  // if you need the raw id_token, you can access it
  // using the __raw property
  const id_token = claims.__raw;
});
```

### Logout (default)

```js
$('#logout').click(async () => {
  auth0.logout({
    returnTo: 'http://localhost:3000/'
  });
});
```

### Logout with no client ID

```js
$('#logoutNoClientId').click(async () => {
  auth0.logout({
    client_id: null,
    returnTo: 'http://localhost:3000/'
  });
});
```
