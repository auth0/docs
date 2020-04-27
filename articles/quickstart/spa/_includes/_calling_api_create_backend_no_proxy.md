<!-- markdownlint-disable MD002 MD041 -->

## Create the Backend API

For this example, you'll create an [Express](https://expressjs.com/) server that acts as the backend API. This API will expose an endpoint to validate incoming [JWT-formatted access tokens](https://auth0.com/docs/tokens/concepts/jwts) before returning a response.

Start by installing the following packages:

```bash
npm install cors express express-jwt jwks-rsa npm-run-all
```

* [`express`](https://github.com/expressjs/express) - a lightweight web server for Node
* [`express-jwt`](https://www.npmjs.com/package/express-jwt) - middleware to validate JsonWebTokens
* [`cors`](https://github.com/expressjs/cors) - middleware to enable CORS
* [`jwks-rsa`](https://www.npmjs.com/package/jwks-rsa) - retrieves RSA signing keys from a JWKS endpoint
* [`npm-run-all`](https://www.npmjs.com/package/npm-run-all) - a helper to run the SPA and backend API concurrently

Next, create a new file `server.js` with the following code:

```js
const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Create a new Express app
const app = express();

// Accept cross-origin requests from the frontend app
app.use(cors({ origin: 'http://localhost:3000' }));

// Set up Auth0 configuration
const authConfig = {
  domain: "${account.namespace}",
  audience: "${apiIdentifier}"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from ${account.namespace}
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://<%= "${authConfig.domain}" %>/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://<%= "${authConfig.domain}" %>/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
app.listen(3001, () => console.log('API listening on 3001'));
```

The above API has one available endpoint, `/api/external`, that returns a JSON response to the caller. This endpoint uses the `checkJwt` middleware to validate the supplied bearer token using your tenant's [JSON Web Key Set](https://auth0.com/docs/jwks). If the token is valid, the request is allowed to continue. Otherwise, the server returns a 401 Unauthorized response.
