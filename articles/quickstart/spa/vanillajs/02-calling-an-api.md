---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
topics:
  - quickstarts
  - spa
  - vanillajs
  - apis
github:
    path: 02-Calling-an-API
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD002 MD034 MD041-->

<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

## Create a Backend API

In this section, you will modify the [ExpressJS](https://expressjs.com) that you created in part 1 so that it supports a new endpoint. This endpoint will require a valid access token to be sent in the `Authorization` header for the call to be successful.

### Add middleware to the backend

To begin, let's install some NPM packages that will be used to validate incoming tokens to the server. From the terminal:

```bash
npm install express-jwt jwks-rsa
```

Next, open `server.js` and bring in these libraries as imports at the top of the file. Also bring in the `auth_config.json` file so that the script can get access to the authentication credentials that have been configured:

```js
// .. other imports

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./auth_config.json");
```

- [`express-jwt`](https://npmjs.com/package/express-jwt) - validates JWTs from the `authorization` header and sets the `req.user` object
- [`jwks-rsa`](https://npmjs.com/package/jwks-rsa) - downloads RSA signing keys from a JSON Web Key Set (JWKS) endpoint

Then add a call to `jwt()`, which creates the middleware needed in order to validate and parse incoming access tokens. This should go after the `require` statements but before any routes are defined in your app:

```js
// create the JWT middleware
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
```

This code configures the `express-jwt` middleware with the settings that relate to your Auth0 application. It uses a [JWKS](/tokens/concepts/jwks) endpoint to download the RSA public key, which it uses to verify the signatures of incoming access tokens.

Next, open the `auth_config.json` file and modify the data so that the `audience` appears as a key within the JSON, using the value that you just used when creating the API:

```json
{
  "domain": "${account.namespace}",
  "clientId": "${account.clientId}",
  "audience": "${apiIdentifier}"
}
```

::: note
As `auth_config.json` is served publicly, this file should **never** contain sensitive information such as passwords and client secrets.
:::

The values for `domain` and `clientId` should have already been specified as part of the [Login tutorial](/quickstarts/spa/vanillajs/01-login). They should point to the Domain and Client ID values for your Auth0 app respectively.

### Add a protected endpoint

The last thing to do on the server side is to add an API endpoint that requires an access token to be provided for the call to succeed. This endpoint will use the middleware that you created earlier in the tutorial to provide that protection in a scalable way.

Open `server.js` and add a new route for `/api/external` above the other routes that returns some JSON:

```js
// ..

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

// ..
```

Note that `checkJwt` is used as the second argument here. This causes `checkJwt` to be executed before the main route handler, and will reject the call and return a 401 response if:

- there is no access token present in the `Authorization` header,
- or the token itself is not valid

Finally, add an error handler so that a JSON response is returned from your API in the event of a missing or invalid token:

```js
// ..

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

//..
```

At the end, your `server.js` file will look something like the following:

```js
const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { join } = require("path");
const authConfig = require("./auth_config.json");

const app = express();

// Serve assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Create the JWT validation middleware
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

// Create an endpoint that uses the above middleware to
// protect this route from unauthorized requests
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

// Serve the auth configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page to everything else
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Error handler
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

module.exports = app;
```

### Test the API

With this in place, run the application using `npm run dev`. In another terminal window, use the `curl` tool to make a request to this API endpoint and observe the results:

```bash
$ curl -I localhost:3000/api/external
```

You should find that a 401 Unauthorized result is returned, because it requires a valid access token:

```bash
HTTP/1.1 401 Unauthorized
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Content-Type: text/html; charset=utf-8
Content-Length: 1582
Date: Wed, 03 Apr 2019 13:10:43 GMT
Connection: keep-alive
```

## Calling the API

Now you can turn your attention to the front-end application. You will update the application to provide a button to call a function which will in turn call the API that you created in the previous section.

Open `index.html` and add a new button that will invoke the API call, as well as a `pre` element with an ID of `api-call-result` to show the result of the API call in the browser:

```html
<button id="btn-call-api" disabled="true" onclick="callApi()">Call Api</button>

<!-- Add a container to hold the response from the call -->
<pre id="api-call-result"></pre>
```

Next, open `public/js/app.js`. Configure the `auth0` client object to specify the audience value that was added earlier to the `auth_config.json` file:

```js
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience   // NEW - add the audience value
  });
};
```

Add a new function called `callApi` to `app.js`, with the following content:

```js
const callApi = async () => {
  try {

    // Get the access token from the Auth0 client
    const token = await auth0.getTokenSilently();

    // Make the call to the API, setting the token
    // in the Authorization header
    const response = await fetch("/api/external", {
      headers: {
        Authorization: `Bearer <%= "${token}" %>`
      }
    });

    // Fetch the JSON result
    const responseData = await response.json();

    // Display the result in the output element
    const responseElement = document.getElementById("api-call-result");

    responseElement.innerText = JSON.stringify(responseData, {}, 2);

} catch (e) {
    // Display errors in the console
    console.error(e);
  }
};
```

Finally, find the `updateUI` function within `app.js` and modify it so that the button for calling the API is enabled when the user logs in:

```js
// public/js/app.js

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;

  // NEW - enable the button to call the API
  document.getElementById("btn-call-api").disabled = !isAuthenticated;

  // .. other code omitted for brevity ..
};
```

Now, open the browser in the application at [http://localhost:3000](http://localhost:3000). If the application has been stopped, run it again from the terminal using `npm run dev`.

When the application starts, log in. Then, press the **Call API** button to make a request to the API and put the results on the screen. You should find that the result from the server is displayed on the page.
