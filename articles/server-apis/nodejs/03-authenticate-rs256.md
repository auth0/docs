---
title: Authentication (RS256)
description: This tutorial demonstrates how to verify an RS256-signed JSON Web Token and protect endpoints in an Express API
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-express-api-samples',
  path: '02-Authenticate-RS256',
  branch: 'p1',
  requirements: [
    'NodeJS 4.3',
    'Express 4.11'
  ]
}) %>

To verify tokens signed with the RS256 algorithm, the remote JSON Web Key Set (JWKS) for your application must be consulted. This is handled with the **jwks-rsa** package.

::: panel-warning Before Starting
This tutorial demonstrates how to verify JSON Web Tokens (JWT) signed with the **RS256** algorithm. Check the signing algorithm used for your JWT by debugging it at [JWT.io](https://jwt.io) and checking the `alg` key in the `header`. If the algorithm is `RS256`, use this guide. If it is `HS256`, use the [HS256 guide](https://auth0.com/docs/quickstart/backend/nodejs/02-authenticate-hs256).
:::

## Installation

Install the **express-jwt** and **jwks-rsa** package.

```bash
npm install express-jwt jwks-rsa --save
```

## Configuration

Configure the **express-jwt** middleware to use the remote JWKS for your Auth0 account.

```js
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const jwtCheck = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${account.namespace}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '${account.clientId}',
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});
```

## Apply the Middleware

With the **express-jwt** middleware configured, add it to any endpoints you wish to protect.

${snippet(meta.snippets.use)}

## Call the API

Requests to your API's protected endpoints now require that a JWT signed with your client's secret be included in the `Authorization` header using the `Bearer` scheme.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```
