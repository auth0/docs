<!-- markdownlint-disable MD002 MD041 -->

## Create the Backend API

For this example, you'll create an <a href="https://expressjs.com/" target="_blank">Express</a> server that acts as the backend API. This API will expose an endpoint to validate incoming <a href="https://auth0.com/docs/tokens/concepts/jwts" target="_blank">JWT-formatted access tokens</a> before returning a response.

Start by installing the following packages:

```bash
npm install express express-oauth2-jwt-bearer npm-run-all
```

* <a href="https://github.com/expressjs/express" target="_blank">`express`</a> - a lightweight web server for Node
* <a href="https://github.com/auth0/node-oauth2-jwt-bearer/tree/main/packages/express-oauth2-jwt-bearer" target="_blank">`express-oauth2-jwt-bearer`</a> - middleware to validate JWT-formatted access tokens
* <a href="https://www.npmjs.com/package/npm-run-all" target="_blank">`npm-run-all`</a> - a helper to run the SPA and backend API concurrently

Next, create a new file `server.js` with the following code:

```js
const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");

// Create a new Express app
const app = express();

// Define middleware that validates incoming bearer access token JWTs
const checkJwt = auth({
  issuerBaseURL: "https://${account.namespace}",
  audience: "${apiIdentifier}"
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

The above API has one available endpoint, `/api/external`, that returns a JSON response to the caller. This endpoint uses the `checkJwt` middleware to validate the supplied bearer token. If the token is valid, the request is allowed to continue. Otherwise, the server returns a 401 Unauthorized response.

:::note
Ensure that the values for `issuerBaseURL` and `audience` in the code snippet above are correct for the API that you want to call.
:::
