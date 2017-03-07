---
title: Authenticate
description: This tutorial demonstrates how to add authentication and authorization to an Express.js API
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-express-api-samples',
  path: '01-Authenticate-RS256',
  requirements: [
    'express.js 14.4.0',
    'express-jwt 5.1.0',
    'express-jwt-authz 1.0.0'
  ]
}) %>

<%= include('_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in an Express middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

The **express-jwt** package can be used to verify incoming JWTs. The **jwks-rsa** library can be used alongside it to fetch your Auth0 public key and complete the verification process. The **express-jwt-authz** library can be used to add an authorization middleware to your endpoints. Install these libraries with npm.

```bash
npm install --save express-jwt jwks-rsa express-jwt-authz
```

## Configuration

<%= include('_includes/_api_jwks_description') %>

Configure the **express-jwt** middleware to use the remote JWKS for your Auth0 account.

```js
// server.js

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const authenticate = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${account.namespace}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '{API_ID}',
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});
```

## Protect Individual Endpoints

With the **express-jwt** middleware in place, it can now be applied to any endpoints you wish to protect. If you wish to protect individual endpoints, you can pass it as an argument before the callback for a route.

```js
// server.js

app.get('/api/private', authenticate, function(req, res) {
  res.json({ 
    message: "Hello from a private endpoint! You DO need to be authenticated to see this." 
  });
});
```

## Add Authorization

<%= include('_includes/_api_scope_description') %>

Individual routes can be configured to look for a particular `scope` by setting up another middleware with the **express-jwt-authz** package. To do so, provide an array of required scopes and apply the middleware to any routes you wish to add authorization to.

```js
// server.js

const authorize = jwtAuthz([ 'read:messages' ]);

app.get('/api/private/admin', authenticate, authorize, function(req, res) {
  res.json({ 
    message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." 
  });
});
```

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.