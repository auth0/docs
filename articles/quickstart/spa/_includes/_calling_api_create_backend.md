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

const app = express();

const authConfig = {
  domain: "${account.tenant}",
  clientID: "${account.clientId}"
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://<%= "${authConfig.domain}" %>/.well-known/jwks.json`
  }),

  audience: authConfig.clientID,
  issuer: `https://<%= "${authConfig.domain}" %>/`,
  algorithm: ["RS256"]
});

app.get("/api/private", checkJwt, (req, res) => {
  res.send({
    msg: "Your ID Token was successfully validated!"
  });
});

app.listen(3001, () => console.log('API listening on 3001'));
```

::: note
When validating an ID Token using the Json Web Key Set, the application client ID can be used as the `audience` value, rather than the API identifier that you would normally use if you were calling a third-party API.
:::