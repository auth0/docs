---
title: Login
description: This tutorial demonstrates how to add user login, logout, and profile to a Node.js Express application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
contentType: tutorial
useCase: quickstart
github:
  path: 01-Login
---

<%= include('../../../_includes/_new_app', { hideDownloadSample: true, hideDashboardScreenshot: true }) %>

<%= include('../../../_includes/_callback_url') %>

:::note
If you are running this project on your local machine, the callback URL you need to whitelist in the **Allowed Callback URLs** field is `http://localhost:3000/callback`.
:::

<%= include('../../../_includes/_logout_url' }) %>

:::note
If you are running this project on your local machine, the logout URL you need to whitelist in the **Allowed Logout URLs** field is `http://localhost:3000/logout`.
:::

## Integrate Auth0
### Install Dependencies
Install the following dependencies

- [`express-openid-connect`](https://github.com/auth0/express-openid-connect) - Auth0-maintained OIDC-compliant library for Express.
- [`express-session`](https://github.com/auth0/express-session) - session middleware for Express.

```sh
npm install express express-openid-connect express-session
```

### Handling server responses
Your application will need to parse URL-encoded data sent back from the Auth0 server.  Express provides a middleware for this called `express.urlencoded`. If you are integrating an existing application that uses `urlencoded` from the `body-parser`module, that will work as well.

```js
const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: false
}));
```

### User sessions
To keep the user logged in across multiple requests, your application will use the `express-session` middleware, which stores the user's data in memory. The user's session will allow your application to recognize them from request to request.

```js
const session = require('express-session');

app.use(session({
  secret: 'this should be a secret',
  resave: true,
  saveUninitialized: false
}));
```

### Authentication
The last part of integrating Auth0 into your application will be using the `auth` middleware provided by the Express OpenID Connect library installed above. The [API documentation](https://github.com/auth0/express-openid-connect/blob/master/API.md) for this library outlines additional configuration options and methods.

```js
const { auth } = require('express-openid-connect');

app.use(auth({
  required: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  issuerBaseURL: 'https://${account.namespace}',
  clientID: '${account.clientId}'
}));
```

Now that your application has the middleware installed, you can use [the helper functions and contextual data](https://github.com/auth0/express-openid-connect/blob/master/API.md#session-and-context) provided by the Express OpenID Connect library.  Here is an example of how to use `req.openid.isAuthenticated()`:

```js
app.get('/', (req, res) => {
 res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out'))
});
```

## Login
A user can log into your application by visiting the `/login` route provided by the library. If you are testing your application locally, that link is [`localhost:3000/login`](http://localhost:3000/login).

## Profile
To retrieve the user profile you will first want to protect the route where you display that users information.

Add the `requiresAuth` middleware for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});
```

## Logout
A user can log out of your application by visiting the `/logout` route provided by the library. If you are testing your application locally, that link is [`localhost:3000/logout`](http://localhost:3000/logout).

## What's next?
We put together a few examples of how to use [Express OpenID Connect](https://github.com/auth0/express-openid-connect) in more advanced use cases:
* [Route Customization](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#2-route-customization)
* [Using refresh tokens](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-using-refresh-tokens)
* [Require auth for specific routes](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#3-require-auth-for-specific-routes)
