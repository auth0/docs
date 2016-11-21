## Create a Resource Server

Your resource server (API) needs to be configured to verify the `access_token` and any claims contained within it. When you create a resource server in your Auth0 dashboard, it utilizes the RS256 signature method by default, meaning that access tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key. You can read more about the [JSON Web Key Set (JWKS)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) standard and also view the [public key](https://${account.namespace}/.well-known/jwks.json) for your Auth0 account (https://${account.namespace}/.well-known/jwks.json).

You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. The following example will demonstrate how to create a resource server API with Node. You can find more information about resource server implementations in the [access token documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).

The `access_token` for your API must be verified against your JSON Web Key Set (JWKS) endpoint. This can be done easily with the **jwks-rsa** library available on npm.

Install the dependencies.

```bash
npm install express express-jwt jwks-rsa
```

Create a middleware which uses **express-jwt** and **jwks-rsa** to verify the `access_token` against your JWKS endpoint.

```js
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authenticate = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://${account.namespace}/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: '{API IDENTIFIER}',
  issuer: 'https://${account.namespace}/',
  algorithms: ['RS256']
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');
```

Note that you **must** provide the `audience` for your API. This is the identifier you set for it when you create an API in your Auth0 dashboard.