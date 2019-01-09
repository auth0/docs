---
title: Calling the Backend
description: This tutorial demonstrates how to make calls to your backend API
budicon: 546
topics:
  - quickstarts
  - spa
  - vuejs
  - apis
github:
  path: 02-calling-the-backend
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
---

<%= include('../_includes/_calling_api_preamble') %>

In the case where your SPA is calling your backend API (as opposed to a third-party API that might potentially be accessed by lots of clients), we are able to use the ID Token to verify whether or not the client should be able to access the resource. This is in contrast to using an access token, which would be used if we were accessing a third-party API.

## Creating the Backend API

For this example, we will create a simple [Express](https://expressjs.com/) server that will act as our backend API. We can then expose an endpoint that will validate our ID Token before returning a response.

Install the packages that we will need to provide this functionality:

```bash
npm install --save express express-jwt jwks-rsa npm-run-all
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
    msg: "Your ID token was successfully validated!"
  });
});

app.listen(3001, () => console.log('API listening on 3001'));
```
