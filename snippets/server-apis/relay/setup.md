```js
// server.js

const express = require('express');
const app = express();
const graphqlHttp   = require('express-graphql');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
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
  audience: '${apiIdentifier}',
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});
```
