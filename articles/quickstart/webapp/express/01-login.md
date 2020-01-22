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
If you are running this quickstart on `localhost:3000`, your application's callback URL will be `https://localhost:3000/callback`
:::

<%= include('../../../_includes/_logout_url' }) %>

:::note
If you are running this quickstart on `localhost:3000`, your application's logout URL will be `https://localhost:3000`
:::

## Generate and Install Certificates
Applications that handle sensitive data must be served over secure channels. This includes local applications as they may handle the same sensitive data and should be built as close to production-ready as possible.

### Generate Certificates
There are a number of ways to generate certificates for local applications. If you do not already have a method of generating local certificates, download [mkcert](https://github.com/FiloSottile/mkcert) and follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your specific operating system. Now, run the following commands to generate a certificate and key for this application:

```bash
cd /path/to/application/root
mkcert -install
mkcert localhost
```

For more complete instructions, please see our [Secure Local Development guide](https://auth0.com/docs/libraries/secure-local-development).

### Install Certificates
The commands above will create `localhost-key.pem` and `localhost.pem` files, which need to be read from the file system:

```js
const fs = require('fs');
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

const express = require('express');
const https = require('https');
https.createServer({key: key, cert: cert }, express()).listen('3000', () => {
  console.log('Listening on https://localhost:3000');
});
```

## Integrate Auth0
### Install Dependencies
Your application will need the [`express-openid-connect`](https://github.com/auth0/express-openid-connect) package which is an Auth0-maintained OIDC-compliant library for Express.

```sh
npm install express express-openid-connect@0.6.0 --save
```

### Configure Router
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
  baseURL: 'https://localhost:3000',
  issuerBaseURL: 'https://${account.namespace}',
  clientID: '${account.clientId}',
  appSessionSecret: 'a long, randomly-generated string stored in env'
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
A user can now log into your application by visiting the `/login` route provided by the library. If you are running your project on `localhost:3000` that link would be [`https://localhost:3000/login`](https://localhost:3000/login).

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
A user can log out of your application by visiting the `/logout` route provided by the library. If you are running your project on `localhost:3000` that link would be [`https://localhost:3000/logout`](https://localhost:3000/logout).

## What's next?
We put together a few examples of how to use [Express OpenID Connect](https://github.com/auth0/express-openid-connect) in more advanced use cases:

* [Route Customization](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#3-route-customization)
* [Custom user session handling](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-custom-user-session-handling)
* [Obtaining access tokens for external APIs](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#5-obtaining-and-storing-access-tokens-to-call-external-apis)
* [Require auth for specific routes](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#2-require-authentication-for-specific-routes)
