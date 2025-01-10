---
title: Authorization
description: This tutorial demonstrates how to add authorization to an Express.js API.
topics:
    - quickstart
    - backend
    - nodejs
github:
  path: 01-Authorization-RS256
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-express-api-samples/tree/master/02-Authorization-HS256' }) %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

This guide shows you how to protect an Express API using the [express-oauth2-jwt-bearer](https://github.com/auth0/node-oauth2-jwt-bearer/tree/main/packages/express-oauth2-jwt-bearer) middleware. 

First install the SDK using npm.

```bash
npm install --save express-oauth2-jwt-bearer
```
### Configure the middleware

Configure `express-oauth2-jwt-bearer` with your Domain and API Identifier.

```js
// server.js

const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '${apiIdentifier}',
  issuerBaseURL: `https://${account.namespace}/`,
});
```

The `checkJwt` middleware shown above checks if the user's Access Token included in the request is valid. If the token is not valid, the user gets a 401 Authorization error when they try to access the endpoints. The middleware doesn't check if the token has the sufficient scope to access the requested resources.

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

To protect an individual route that requires a valid JWT, configure the route with the `checkJwt` `express-oauth2-jwt-bearer` middleware.

```js
// server.js

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});
```

You can configure individual routes to look for a particular scope. To achieve that, set up another middleware with the `requiresScope` method. Provide the required scopes and apply the middleware to any routes you want to add authorization to. 

Pass the `checkJwt` and `requiredScopes` middlewares to the route you want to protect.

```js
// server.js
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});
```

In this configuration, only Access Tokens with the `read:messages` scope can access the endpoint.
