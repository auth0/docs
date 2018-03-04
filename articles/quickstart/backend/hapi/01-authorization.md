---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Hapi.js API.
github:
  path: 01-Authenticate-RS256
---
<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-hapi-api-samples/tree/master/02-Authenticate-HS256'}) %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

This guide shows you how to validate the Access Token using the **hapi-auth-jwt2** plugin.  The **jwks-rsa** library can be used alongside it to fetch your Auth0 public key and complete the verification process. 

Install these libraries with npm.

```bash
npm install --save hapi-auth-jwt2 jwks-rsa
```

### Configure hapi-auth-jwt2

Set up the **hapi-auth-jwt2** plugin to fetch this public key through the **jwks-rsa** library.

```js
// server.js

const Hapi = require('hapi');
const jwt = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');

const server = new Hapi.Server();

// ...

server.register(jwt, err => {
  if (err) throw err;
  server.auth.strategy('jwt', 'jwt', 'required', {
    complete: true,
    // verify the Access Token against the
    // remote Auth0 JWKS 
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${account.namespace}/.well-known/jwks.json`
    }),
    verifyOptions: {
      audience: '${apiIdentifier}',
      issuer: `https://${account.namespace}/`,
      algorithms: ['RS256']
    },
    validateFunc: validateUser
  });
  registerRoutes();
});
```

The **hapi-auth-jwt2** plugin does the work of actually verifying that the JWT is valid. However, the `validateFunc` key requires a function which is the final stop for accepting or rejecting authorization for a given request. This function must return a callback with either `true` or `false` to indicate the the request can proceed. The function can also operate on the decoded payload of the JWT and supply a modified `req.auth.credentials` object based on custom logic.

When you request multiple `scope`s in an Auth0 authentication transaction, they come back as a space-delimited string in the `access_token` payload. However, the **hapi-auth-jwt2** plugin expects an array when multiple `scope`s are used. This conversion can be handled in the `validateFunc` function.

Add a function called `validateUser` and modify the `req.auth.credentials` object such that the `scope` key is parsed into an array instead of a space-delimited string.

```js
// server.js

const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` claim
  // exists in the Access Token. Modify it to suit
  // the needs of your application
  if (decoded && decoded.sub) {
    if (decoded.scope)
      return callback(null, true, {
        scope: decoded.scope.split(' ')
      });

    return callback(null, true);
  }

  return callback(null, false);
};
```

When a valid JWT Access Token is received at an endpoint, the `scope`s from the payload will be available as an array on `req.auth.credentials`.

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The configuration that is set up above for the **hapi-auth-jwt2** plugin specifies `required` as the third argument to the `strategy`. This means that all routes will require authentication by default. If you'd like to make a route public, you can simply pass `auth: false` to the route's `config`. To protect a route requiring a valid JWT you can pass `auth: 'jwt'`.

<%= include('../_includes/_api_endpoints') %>

```js
// server.js

// This route doesn't need authentication
server.route({
  method: 'GET',
  path: '/api/public',
  config: {
    auth: false,
    handler: (req, res) => {
      res({
        message: "Hello from a public endpoint! You don't need to be authenticated to see this."
      });
    }
  }
});

// This route need authentication
server.route({
  method: 'GET',
  path: '/api/private',
  config: {
    auth: 'jwt',
    handler: (req, res) => {
      res({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
      });
    }
  }
});
```

Individual routes can be configured to look for a particular `scope` in the `access_token` using `auth.scope`.

```js
// server.js

// ...

server.route({
  method: 'GET',
  path: '/api/private-scoped',
  config: {
    auth: {
      scope: 'read:messages'
    },
    handler: (req, res) => {
      res({
        message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
      });
    }
  }
});
```

With this configuration in place, only valid `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.
