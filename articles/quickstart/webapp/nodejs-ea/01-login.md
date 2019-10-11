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
### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. 

The callback URL for your app must be whitelisted in the **Allowed Callback URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If this field is not set, users will be unable to log in to the application and will get an error.

::: note
If you are testing your application locally, you should set the **Allowed Callback URL** to `http://localhost:3000/callback`
:::

### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the `returnTo` query parameter.

The logout URL for your app must be whitelisted in the **Allowed Logout URLs** field in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings). If this field is not set, users will be unable to log out from the application and will get an error.

::: note
If you are testing your application locally, the logout URL you need to whitelist in the **Allowed Logout URLs** field is `http://localhost:3000`.
:::

## Integrate Auth0
### Auth0 Application Keys

You will need to retrieve some details for your application to communicate with Auth0. You can get these details from the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section in the Auth0 dashboard.

You need the following information:

* **Domain**
* **Client ID**
* **Client Secret**

### Express Middleware
There are three middlewares required to integrate Auth0 in your application.

- `express.urlencoded` - parses urlencoded payloads sent back from the Auth0 server.
- `express-session` - simple session middleware for Express (other session middleware can be used as a replacement).
- `express-openid-connect` - an [OIDC](/protocols/oidc) compliant authentication middleware.

::: note
To learn more about using middleware with Express view the [official documentation](https://expressjs.com/en/guide/using-middleware.html)
:::

::: note
Secrets should never be checked into source control.  We recommend using environment variables in place of plain text.  You can use [Dotenv](https://github.com/motdotla/dotenv) to easily manage envrionment variables on your localhost.
:::

```js
const express = require('express');
const session = require('express-session');
const { auth } = require('express-openid-connect');

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
  // required - forces authentication for all routes
  required: false,
  // baseURL - There is where your /callback, /login & /logout URLs will be registered
  baseURL: 'http://localhost:3000',
  // issuerBaseURL - This is your Auth0 Domain found in your Auth0 Application Settings
  issuerBaseURL: 'https://${account.namespace}',
  // clientID - This is the Client ID found in your Auth0 Application settings
  clientID: '${account.clientId}',
  // clientSecret - This is your Auth0 Client Secret found in your Auth0 Application Settings
  clientSecret: '${account.clientSecret}'
}));
```

## Protect a Route
Now that your application has the required middleware to integrate Auth0 in your application, you can start protecting routes.

Add the `requiresAuth` middleware supplied from `express-openid-connect` for routes that need protection.  Any time a route using this middleware is hit, it will check for a valid user session, if none exists it will ask the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/logged_in_user', requiresAuth(), (req, res) => {
  // when a user is logged in you can access the user object via `req.openid.user`
  res.send(JSON.stringify(req.openid.user));
});
```

## Login and Logout
### Login
To log a user in you have 3 options:
- Send a `GET` request to the `/login` route registered by the `express-oidc-connect.auth` middleware.
- Use the `express-oidc-connect.requiresAuth` middleware to protect a route.
- When initializing the `express-oidc-connect.auth` middleware pass in `required: true` to force required authentication on all routes.

::: note
If you are testing your application locally, you can login by visiting `http://localhost:3000/login`
:::

### Logged in Users
Once a user is logged in it is attached to the `request` via the `req.openid` object. You can access the full user object via `req.openid.user`

### Logout
To log a user out send a `GET` request to the `/logout` route registered by the `express-oidc-connect.auth` middleware.

::: note
If you are testing your application locally, you can logout by visiting `http://localhost:3000/logout`
:::

## What's next?
This is an Early Access version of the Auth0 Express OIDC library.  You can further explore this library and its configuration options on [GitHub](https://github.com/auth0/express-openid-connect).
