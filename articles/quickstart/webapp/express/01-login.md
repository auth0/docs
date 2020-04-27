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
<!-- markdownlint-disable MD002 MD041 -->

## Configure Auth0

You will need to register your application with Auth0 in order to start authenticating users. Go to the [Applications](${manage_url}/#/applications) screen in the Auth0 dashboard, create a new **Regular Web Application**, and follow the steps below.

### 1. Configure Callback URL

A callback URL is an application route where Auth0 redirects users after they have authenticated. This URL must be registered with Auth0 or else users will be unable to log in to the application and will get a "Callback URL mismatch" error.

The callback URL for the application created in this quickstart is `http://localhost:3000/callback`. Paste that in the **Allowed Callback URLs** field for the application you just created.

### 2. Configure Logout URL

A logout URL is an application route that Auth0 can return users to after logging out. This URL must be registered with Auth0 or else users will be unable to log out of the application and will get a "misconfiguration" error.

The logout URL for the application created in this quickstart is `http://localhost:3000`. Paste that in the **Allowed Logout URLs** field for the application you just created, then scroll down and click **Save Changes**.

### 3. Get Your Application Keys

Finally, copy the following fields for your application for use in step 7:

* **Domain**
* **Client ID**

## Integrate Auth0
### 4. Install Dependencies
Your application will need the [`express-openid-connect`](https://github.com/auth0/express-openid-connect) package which is an Auth0-maintained OIDC-compliant library for Express.

```sh
npm install express express-openid-connect --save
```

### 5. Configure Router
The Express OpenID Connect library provides the `auth` router in order to attach authentication routes to your application. You will need to configure the router with the following configuration keys:

- `baseURL` - The URL where the application is served
- `appSessionSecret` - A long, random string
- `issuerBaseURL`  - The Domain as a secure URL found in your [Application settings](${manage_url}/#/applications/${account.clientId}/settings)
- `clientID` - The Client ID found in your [Application settings](${manage_url}/#/applications/${account.clientId}/settings)

Here is an example configuration using this router:

```js
const { auth } = require('express-openid-connect');

const config = {
  required: false,
  auth0Logout: true,
  appSession: {
    secret: 'a long, randomly-generated string stored in env'
  },
  baseURL: 'http://localhost:3000',
  clientID: '${account.clientId}',
  issuerBaseURL: 'https://${account.namespace}',
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.isAuthenticated() ? 'Logged in' : 'Logged out')
});
```

For additional configuration options visit the [API documentation](https://github.com/auth0/express-openid-connect/blob/master/API.md).

:::note
You can generate a suitable string for `appSessionSecret` using `openssl rand -hex 32` on the command line.
:::

## Login
A user can now log into your application by visiting the `/login` route provided by the library. If you are running your project on `localhost:3000` that link would be [`http://localhost:3000/login`](http://localhost:3000/login).

## Display User Profile
To display the user's profile, your application should provide a protected route.

Add the `requiresAuth` middleware for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.openid.user));
});
```

## Logout
A user can log out of your application by visiting the `/logout` route provided by the library. If you are running your project on `localhost:3000` that link would be [`http://localhost:3000/logout`](http://localhost:3000/logout).

## What's next?
We put together a few examples of how to use [Express OpenID Connect](https://github.com/auth0/express-openid-connect) in more advanced use cases:

* [Route Customization](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#3-route-customization)
* [Custom user session handling](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-custom-user-session-handling)
* [Obtaining access tokens for external APIs](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#5-obtaining-and-storing-access-tokens-to-call-external-apis)
* [Require auth for specific routes](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#2-require-authentication-for-specific-routes)
