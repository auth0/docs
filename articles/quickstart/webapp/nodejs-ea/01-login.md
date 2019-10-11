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

<!-- markdownlint-disable MD002 -->
<!-- markdownlint-disable MD034 -->

## Getting Started
In this quickstart you will learn how to implement authentication in an Express application using the [Express OpenID Connect](https://github.com/auth0/express-openid-connect) library, authored and maintained by Auth0.

::: warning
Express OIDC is still in an [early access stage](/).
:::

### Install Dependencies

```sh
# Using NPM
npm install express-openid-connect express-session

# Using Yarn
yarn add express-openid-connect express-session
```

## Configure Auth0
<%= include('../../../_includes/_callback_url') %>
<%= include('../../../_includes/_logout_url' }) %>

## Integrate Auth0
### Express Middleware
There are three middlewares required to integrate Auth0 in your application.

- `express.urlencoded` - parses urlencoded payloads sent back from the Auth0 server.
- `express-session` - simple session middleware for Express (this can be swapped with any session middleware for express).
- `express-openid-connect.auth` - an [OIDC](/protocols/oidc) compliant authentication middleware.

::: note
To learn more about using middleware with Express view the [official documentation](https://expressjs.com/en/guide/using-middleware.html)
:::

```js
const express = require('express');
const session = require('express-session');
const { auth } = require('express-openid-connect');

// Example initialization of Express
const app = express();

// parses urlencoded payloads sent back from the Auth0 server
app.use(express.urlencoded({
  extended: false
}));

// session middleware required to handle user sessions
app.use(session({
  secret: 'this should be a secret',
  resave: true,
  saveUninitialized: false
}));

// express-openid-connect.auth
app.use(auth({
  required: false,
  baseURL: 'http://localhost:3000',
  issuerBaseURL: 'https://${account.namespace}',
  clientID: '${account.clientId}'
}));
```

## Protect a Route
Now that your application has the required middleware to integrate Auth0 in your application, you can start protecting routes.

Add the `requiresAuth` middleware supplied from `express-openid-connect` for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  // when a user is logged in you can access the user object via `req.openid.user`
  res.send(JSON.stringify(req.openid.user));
});
```

## Login and Logout
### Login
To log a user in you have 3 options:
- Redirect to the `/login` route registered by the `express-oidc-connect.auth` middleware.
- Use the `express-oidc-connect.requiresAuth` middleware to protect a route, as described above.
- When initializing the `express-oidc-connect.auth` middleware, pass in `required: true` to force authentication on all routes.

::: note
If you are testing your application locally, you can login by visiting `http://localhost:3000/login`
:::

### Logout
To log a user out, redirect them to the `/logout` route registered by the `express-oidc-connect.auth` middleware.

::: note
If you are testing your application locally, you can logout by visiting `http://localhost:3000/logout`
:::

## What's next?
This is an Early Access version of the Auth0 Express OIDC library.  You can further explore this library and its configuration options on [GitHub](https://github.com/auth0/express-openid-connect).
