---
title: Authorization
description: This tutorial demonstrates how to add authentication and authorization to an Express.js API
tags:
    - quickstart
    - backend
    - nodejs
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-express-api-samples',
  path: '01-Authorization-RS256',
  requirements: [
    'express.js 4.4.0',
    'express-jwt 5.1.0',
    'express-jwt-authz 1.0.0'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

This guide shows you how to validate the token using the jwt-express middleware and how to check for appropriate scopes with the express-jwt-authz middleware. If the token is not valid or does not have the required scopes, the user gets a 401 Authorization error when they try to access the endpoints.

## Install the Dependencies

To verify incoming JWTs, you can use the [express-jwt](https://github.com/auth0/express-jwt) package.

To get your Auth0 public key and complete the verification process, you can use the [jwks-rsa](https://github.com/auth0/node-jwks-rsa) library with the package. 

To add the authorization middleware to your endpoints, you can use the [express-jwt-authz](https://github.com/auth0/express-jwt-authz) library.

Install these libraries with npm.

```bash
npm install --save express-jwt jwks-rsa express-jwt-authz
```

## Configure the Middleware

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-express-api-samples/tree/master/02-Authorization-HS256' }) %>

Configure the express-jwt middleware so it uses the remote JWKS for your Auth0 account.

```js
// server.js

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${account.namespace}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '${apiIdentifier}',
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});
```

## Configure the Scopes

The `checkJwt` middleware shown above checks if the user's Access Token included in the request is valid. The middleware doesn't check if the token has the sufficient scope to access the requested resources.

<%= include('../_includes/_api_scopes_access_resources') %>

## Protect Individual Endpoints

To protect an individual route that requires a valid JWT, configure the route with the `checkJwt` express-jwt middleware.

```js
// server.js

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route need authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});
```

You can configure individual routes to look for a particular scope. To achieve that, set up another middleware with the express-jwt-authz package. Provide an array of the required scopes and apply the middleware to any routes you want to add authorization to.

Pass the `checkJwt` and `checkScopes` middlewares to the route you want to protect.

```js
// server.js

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});
```

In this configuration, only the Access Tokens with the `read:messages` scope can access the endpoint.
