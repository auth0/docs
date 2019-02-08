## Create the Backend API

For this example, we will create a simple [Express](https://expressjs.com/) server that will act as our backend API. We can then expose an endpoint that will validate our ID Token before returning a response.

::: note
If you already have a backend API that you would like to call from your frontend, you can safely skip this section
:::

Install the packages that we will need to provide this functionality:

```bash
npm install express express-jwt jwks-rsa npm-run-all
```

* [`express`](https://github.com/expressjs/express) - a lightweight web server for Node
* [`express-jwt`](https://www.npmjs.com/package/express-jwt) - middleware that validates JsonWebTokens
* [`jwks-rsa`](https://www.npmjs.com/package/jwks-rsa) - retrieves RSA signing keys from a JWKS endpoint
* [`npm-run-all`](https://www.npmjs.com/package/npm-run-all) - a helper that allows us to run our SPA and backend API concurrently

Next, create a new file `server.js` with the following content:

```js
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: "${account.tenant}",
  audience: "${apiIdentifier}"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from ${authConfig.domain}
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

This API has one endpoint `/api/external` available that returns a JSON response to the caller. This endpoint makes use of one piece of middleware `checkJwt`, which validates the supplied bearer token using your tenant's [JSON Web Key Set](https://auth0.com/docs/jwks). If the token is valid, the request is allowed to continue. Otherwise, the server returns a 401 Unauthorized response.