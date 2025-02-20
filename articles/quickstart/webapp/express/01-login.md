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

You will need to register your application with Auth0 in order to start authenticating users. Go to the <a href="$manage_url/#/applications" target="_blank">Applications</a> screen in the Auth0 dashboard, create a new **Regular Web Application**, and follow the steps below.

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
Your application will need the <a href="https://github.com/auth0/express-openid-connect" target="_blank">`express-openid-connect`</a> package which is an Auth0-maintained OIDC-compliant library for Express.

```sh
npm install express express-openid-connect --save
```

### 5. Configure Router
The Express OpenID Connect library provides the `auth` router in order to attach authentication routes to your application. You will need to configure the router with the following configuration keys:

- `authRequired` - Controls whether authentication is required for all routes
- `auth0Logout` - Uses Auth0 logout feature
- `baseURL` - The URL where the application is served
- `secret` - A long, random string used to encrypt the session cookie
- `issuerBaseURL`  - The Domain as a secure URL found in your <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application settings</a>
- `clientID` - The Client ID found in your <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application settings</a>

Here is an example configuration using this router:

```js
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: '${account.clientId}',
  issuerBaseURL: 'https://${account.namespace}',
  secret: 'LONG_RANDOM_STRING'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});
```

For additional configuration options visit the <a href="https://auth0.github.io/express-openid-connect" target="_blank">API documentation</a>.

:::note
You can generate a suitable string for `LONG_RANDOM_STRING` using `openssl rand -hex 32` on the command line.
:::

## Login
A user can now log into your application by visiting the `/login` route provided by the library. If you are running your project on `localhost:3000` that link would be <a href="http://localhost:3000/login" target="_blank">`http://localhost:3000/login`</a>.

## Display User Profile
To display the user's profile, your application should provide a protected route.

Add the `requiresAuth` middleware for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

```js
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
```

## Logout
A user can log out of your application by visiting the `/logout` route provided by the library. If you are running your project on `localhost:3000` that link would be <a href="http://localhost:3000/logout" target="_blank">`http://localhost:3000/logout`</a>.

:::note
For a deep dive into implementing user authentication in Express, visit the <a href="https://auth0.com/blog/complete-guide-to-nodejs-express-user-authentication/" target="_blank">Complete Guide to Node.js User Authentication with Auth0</a>. This guide provides you with additional details, such as creating a signup button, protecting routes, and making secure calls to an API. 
:::

## What's next?
We put together a few examples of how to use <a href="https://github.com/auth0/express-openid-connect" target="_blank">Express OpenID Connect</a> in more advanced use cases:

* <a href="https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#3-route-customization" target="_blank">Route Customization</a>
* <a href="https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-obtaining-access-tokens-to-call-external-apis" target="_blank">Obtaining access tokens for external APIs</a>
* <a href="https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#2-require-authentication-for-specific-routes" target="_blank">Require auth for specific routes</a>
