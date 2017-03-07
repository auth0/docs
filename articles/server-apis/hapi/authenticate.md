---
title: Authenticate
description: This tutorial demonstrates how to add authentication and authorization to a Hapi.js API
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-hapi-api-samples',
  path: '01-Authenticate-RS256',
  requirements: [
    'Hapi.js 16.0.0',
    'hapi-auth-jwt2 7.2.4'
  ]
}) %>

<%= include('_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done using the **hapi-auth-jwt2** plugin and can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

The **hapi-auth-jwt2** plugin can be used to verify incoming JWTs. The **jwks-rsa** library can be used alongside it to fetch your Auth0 public key and complete the verification process. Install these libraries with npm.

```bash
npm install --save hapi-auth-jwt2 jwks-rsa
```

## Configure hapi-auth-jwt2

By default, your API will be set up to use RS256 as the algorithm for signing tokens. Since RS256 works by using a private/public keypair, tokens can be verified against the public key for your Auth0 account. This public key is accessible at [https://${account.namespace}.auth0.com/.well-known/jwks.json](https://${account.namespace}.auth0.com/.well-known/jwks.json).

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
    // verify the access token against the
    // remote Auth0 JWKS 
    key: jwksRsa.hapiJwt2Key({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${account.namespace}/.well-known/jwks.json`
    }),
    verifyOptions: {
      audience: '{API_ID}',
      issuer: `https://${account.namespace}/`,
      algorithms: ['RS256']
    },
    validateFunc: validateUser
  });
  registerRoutes();
});
```

The **hapi-auth-jwt2** plugin does the work of actually verifying that the JWT is valid. However, the `validateFunc` key requires some function that can do further checking. This might simply be a check to ensure the JWT has a `sub` claim, but your needs may vary in your own application.

```js
// server.js

const validateUser = (decoded, request, callback) => {
  // This is a simple check that the `sub` claim
  // exists in the access token. Modify it to suit
  // the needs of your application
  if (decoded && decoded.sub) {
    return callback(null, true);
  }

  return callback(null, false);
}
```

## Protect Individual Endpoints

The configuration that is set up above for the **hapi-auth-jwt2** plugin specifies `required` as the third argument to the `strategy`. This means that all routes will require authentication by default. If you'd like to make a route public, you can simply pass `auth: false` to the route's `config`.

```js
// server.js

server.route({
  method: 'GET',
  path: '/api/public',
  config: {
    auth: false,
    handler: (req, res) => {
      res({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
    }
  }
});
```

## Add Authorization

So far, the API is only checking for whether the incoming request has valid authentication information. This solves the case of restricting endpoints such that only authenticated users can access them; however, it doesn't currently provide any way to check for **authorization**.

Authorization can be added to your authenitcation flow by use of a **scope** claim in the `access_token` which provides some indication of what that token allows access to. For more information on how to add scopes to an `access_token`, see the [Scopes documentation](/scopes).

Individual routes can be configured to look for a particular `scope` in the `access_token` using `auth.scope`.

```js
// server.js

// ...

server.route({
  method: 'GET',
  path: '/api/private/admin',
  config: {
    auth: {
      scope: 'read:messages'
    },
    handler: (req, res) => {
      res({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
    }
  }
});
```

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.