---
title: Authorization
description: This tutorial demonstrates how to add authentication and authorization to an Express.js API
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-express-api-samples',
  path: '01-Authorization-RS256',
  requirements: [
    'express.js 14.4.0',
    'express-jwt 5.1.0',
    'express-jwt-authz 1.0.0'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in an Express middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

The **express-jwt** package can be used to verify incoming JWTs. The **jwks-rsa** library can be used alongside it to fetch your Auth0 public key and complete the verification process. The **express-jwt-authz** library can be used to add an authorization middleware to your endpoints. Install these libraries with npm.

```bash
npm install --save express-jwt jwks-rsa express-jwt-authz
```

## Configuration

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-express-api-samples/tree/master/02-Authorization-HS256' }) %>

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
const checkJwt = jwt({
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
  aud: '${apiIdentifier}',
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});
```

## Configuring Scopes

The `checkJwt` middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `write` access to that resource if they are an **administrator**.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and choose the **Scopes** tab. In this area you can apply any scopes you wish, including one called `read:messages`, which will be used in this example.

## Protect Individual Endpoints

Individual routes can be configured to look for a particular `scope` by setting up another middleware with the **express-jwt-authz** package. To do so, provide an array of required scopes and apply the middleware to any routes you wish to add authorization to.

Pass the `checkJwt` and `checkScopes` middlewares to the route you wish to protect.

```js
// server.js

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/private', checkJwt, checkScopes, function(req, res) {
  res.json({ 
    message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." 
  });
});
```

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.

<%= include('../_includes/_call_api') %>
