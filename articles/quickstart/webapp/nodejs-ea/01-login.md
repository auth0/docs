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
- [`express-openid-connect`](https://github.com/auth0/express-openid-connect) - Auth0-maintained OIDC-compliant library for Express.

```sh
# Using NPM
npm install express-openid-connect express-session

# Using Yarn
yarn add express-openid-connect express-session
```

### Handling server responses
Your application will need to parse URL-encoded data sent back from the Auth0 server.  Express provides a middleware for this called `express.urlencoded`. If you are integrating an existing application that uses `urlencoded ` from the `body-parser`module, that will work as well.

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
The last part of integrating Auth0 into your application will be using the `auth` middleware provided by Auth0's `express-openid-connect` installed above.  View the official [API Documentation](https://github.com/auth0/express-openid-connect/blob/master/API.md) for configuration options and information.

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

## Login
To log a user in visit the `/login` route registered by the `express-oidc-connect.auth` middleware, 
or if you are testing your application locally [`localhost:3000/login`](http://localhost:3000/)

## Logout
To log a user out visit the `/logout` route registered by the `express-oidc-connect.auth` middleware, 
or if you are testing your application locally [`localhost:3000/logout`](http://localhost:3000/)

## What's next?
This is an Early Access version of the Auth0 Express OIDC library.  You can further explore this library and its configuration options on [GitHub](https://github.com/auth0/express-openid-connect).
