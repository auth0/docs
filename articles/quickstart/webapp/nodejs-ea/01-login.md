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
<%= include('../../../_includes/_logout_url' }) %>

## Integrate Auth0
### Install Dependencies
Install the following dependencies

- [`express-session`](https://github.com/auth0/express-session) - simple session middleware for Express (any session middleware for express will work).
- [`express-openid-connect`](https://github.com/auth0/express-openid-connect) - an [OIDC](/protocols/oidc) compliant authentication library.

```sh
# Using NPM
npm install express-openid-connect express-session

# Using Yarn
yarn add express-openid-connect express-session
```

### Handling server responses
Your application will need to parse url-encoded payloads sent back from the Auth0 server.  Express provides a middleware for this `express.urlencoded`. You might already be using `body-parser`, this will work too.

```js
const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: false
}));
```

### User sessions
In order to keep the user logged in across requests you will need to use session middleware.  The session will allow you to recognize the user on concurrent requests. In this example, you will use `express-session` which stores the session in memory.

```js
const session = require('express-session');

app.use(session({
  secret: 'this should be a secret',
  resave: true,
  saveUninitialized: false
}));
```

### Authentication
The last part of integrating Auth0 into your application will be using the `auth` middleware supplied to you from the Auth0 library `express-opeinid-connect`.  View the official [Api Documentation](https://github.com/auth0/express-openid-connect/blob/4374c0502d4aedf8b3975e7c5f26929b305b32f6/API.md) for configuration options and information.

```js
const { auth } = require('express-openid-connect');

app.use(auth({
  required: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  issuerBaseURL: 'https://${account.namespace}',
  clientID: '${account.clientId}'
}));

app.get('/', (req, res) => {
  if (req.openid.isAuthenticated()) {
    // when a user is logged in you can access the user object via `req.openid.user`
    res.send(JSON.stringify(req.openid.user));
  } else {
    res.send('No user is logged in');
  }
})
```

## Login and Logout
### Login
To log a user in you have 3 options:
- Visiting the route `/login` route registered by the `express-oidc-connect.auth` middleware
- Use the `express-oidc-connect.requiresAuth` middleware to protect a route.
- When initializing the `express-oidc-connect.auth` middleware, pass in `required: true` to force authentication on all routes.

::: note
If you are testing your application locally, you can login by visiting `http://localhost:3000/login`
:::

### Logout
To log a user out visit the `/logout` route registered by the `express-oidc-connect.auth` middleware.

::: note
If you are testing your application locally, you can logout by visiting `http://localhost:3000/logout`
:::

## What's next?
This is an Early Access version of the Auth0 Express OIDC library.  You can further explore this library and its configuration options on [GitHub](https://github.com/auth0/express-openid-connect).
