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
If you are running your project on `localhost:3000`, your application's callback URL would be `http://localhost:3000/callback`
:::

<%= include('../../../_includes/_logout_url' }) %>

:::note
If you are running your project on `localhost:3000`, your application's logout URL would be `http://localhost:3000`
:::

## Integrate Auth0
### Install Dependencies
Your application will need the following packages:

- [`express-openid-connect`](https://github.com/auth0/express-openid-connect) - Auth0-maintained OIDC-compliant library for Express.
- [`express-session`](https://github.com/auth0/express-session) - session middleware for Express.

```sh
npm install express express-openid-connect express-session
```

### Configure Router
The Express OpenID Connect library provides the `auth` router in order to attach authentication routes to your application.  This router requires session middleware in order to keep the user logged across multiple requests.  In this quickstart you will use the `express-session` middleware to support it.

You will need to configure the router with the following Auth0 application keys
- [`issuerBaseURL`](${manage_url}/#/applications/${account.clientId}/settings)  - The applicaiton's Domain URL
- [`clientID`](${manage_url}/#/applications/${account.clientId}/settings) - The application's Client ID.

Here is an example configuration using this router. For additional configuration options visit the [API documentation](https://github.com/auth0/express-openid-connect/blob/master/API.md).

```js
const express = require('express');
const session = require('express-session');
const { auth } = require('express-openid-connect');

const app = express();

app.use(session({
  secret: 'use a secure environment variable in production',
  resave: true,
  saveUninitialized: false
}));

const config = {
  required: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  issuerBaseURL: 'https://${account.namespace}',
  clientID: '${account.clientId}'
};

// auth router attaches /login /logout /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
 res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out'))
});
```

## Login
A user can now log into your application by visiting the `/login` route provided by the library. If you are running your project on `localhost:3000` that link would be [`localhost:3000/login`](http://localhost:3000/login).

## Profile
To display the user's profile, your application should provide a protected route.

Add the `requiresAuth` middleware for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});
```

## Logout
A user can log out of your application by visiting the `/logout` route provided by the library. If you are running your project on `localhost:3000` that link would be [`localhost:3000/logout`](http://localhost:3000/logout).

## What's next?
We put together a few examples of how to use [Express OpenID Connect](https://github.com/auth0/express-openid-connect) in more advanced use cases:
* [Route Customization](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#2-route-customization)
* [Using refresh tokens](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-using-refresh-tokens)
* [Require auth for specific routes](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#3-require-auth-for-specific-routes)
