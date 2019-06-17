---
section: libraries
toc: true
title: Auth0 SDK for Single Page Applications
description: Auth0 SDK for Single Page Applications using Authorization Code Grant Flow with PKCE.
topics:
  - libraries
  - auth0-spa-js
contentType:
  - index
---

# Auth0 SDK for Single Page Applications

Auth0 SDK for Single Page Applications using the [Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

You can find the source code of the library [on Github](https://github.com/auth0/auth0-spa-js) and the full API documentation is [here](https://auth0.github.io/auth0-spa-js/).

## Installation

You have a few options for using auth0-spa-js in your project:

From the CDN:

```html
<script src="https://cdn.auth0.com/js/auth0-spa-js/1.0.0-beta.2/auth0-spa-js.production.js"></script>
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

Before rendering or initializing your application, create an instance of the client. You should only have one instance of the client.

```js
// with async/await
const auth0 = await createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}'
});

// with promises
createAuth0Client({
  domain: '${account.namespace}',
  client_id: '${account.clientId}'
}).then(auth0 => {
  //...
});
```

### Login

```html
<button id="login">Click to Login</button>
```

```js
//with async/await
document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithPopup();
  //logged in. you can get the user profile like this:
  const user = await auth0.getUser();
  console.log(user);
});

//with promises
document.getElementById('login').addEventListener('click', () => {
  auth0.loginWithPopup().then(token => {
    //logged in. you can get the user profile like this:
    auth0.getUser().then(user => {
      console.log(user);
    });
  });
});
```

### Call an API

```html
<button id="call-api">Call an API</button>
```

```js
//with async/await
document.getElementById('call-api').addEventListener('click', async () => {
  const accessToken = await auth0.getTokenSilently();
  const result = await fetch('https://myapi.com', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const data = await result.json();
  console.log(data);
});

//with promises
document.getElementById('call-api').addEventListener('click', () => {
  auth0
    .getTokenSilently()
    .then(accessToken =>
      fetch('https://myapi.com', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
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

```html
<button id="logout">Logout</button>
```

```js
document.getElementById('logout').addEventListener('click', () => {
  auth0.logout();
});
```

## Usage

JQuery is used in the following examples.

### Login with Popup

```html
<button id="loginPopup">Login with Popup</button>
```

```js
$('#loginPopup').click(async () => {
  await auth0.loginWithPopup({
    redirect_uri: 'http://localhost:3000/callback.html'
  });
});
```

### Login with Redirect

```html
<button id="loginRedirect">Login with Redirect</button>
```

```js
$('#loginRedirect').click(async () => {
  await auth0.loginWithRedirect({
    redirect_uri: 'http://localhost:3000/'
  });
});
```

### Login with Redirect Callback

```html
<button id="loginRedirectCallback">Login with Redirect Callback</button>
```

```js
$('#loginRedirectCallback').click(async () => {
  await auth0.handleRedirectCallback();
});
```

### Get Access Token with no interaction

```html
<button id="getToken">Get Access Token with no interaction</button>
```

```js
$('#getToken').click(async () => {
  const token = await auth0.getTokenSilently();
});
```

### Get Access Token with Popup

```html
<button id="getTokenPopup">Get Access Token with a Popup</button>
```

```js
$('#getTokenPopup').click(async () => {
  const token = await auth0.getTokenWithPopup({
    audience: 'https://brucke.auth0.com/api/v2/',
    scope: 'read:rules'
  });
});
```

### Get Access Token for a different audience

```html
<button id="getTokenAudience">Get Access Token for a different audience</button>
```

```js
$('#getToken_audience').click(async () => {
  const differentAudienceOptions = {
    audience: 'https://brucke.auth0.com/api/v2/',
    scope: 'read:rules',
    redirect_uri: 'http://localhost:3000/callback.html'
  };
  const token = await auth0.getTokenSilently(differentAudienceOptions);
});
```

### Get User

```html
<button id="getUser">Get User</button>
```

```js
$('#getUser').click(async () => {
  const user = await auth0.getUser();
});
```

### Get ID Token Claims

```html
<button id="getIdTokenClaims">Get decoded ID Token</button>
```

```js
$('#getIdTokenClaims').click(async () => {
  const claims = await auth0.getIdTokenClaims();
});
```

### Logout (default)

```html
<button id="logout">Logout</button>
```

```js
$('#logout').click(async () => {
  auth0.logout({
    returnTo: 'http://localhost:3000/'
  });
});
```

### Logout with no Client ID

```html
<button id="logoutNoClientId">Logout with no Client ID</button>
```

```js
$('#logoutNoClientId').click(async () => {
  auth0.logout({
    client_id: null,
    returnTo: 'http://localhost:3000/'
  });
});
```
