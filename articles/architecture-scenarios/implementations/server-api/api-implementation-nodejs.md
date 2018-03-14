---
title: "Server Client + API: Node.js Implementation for the API"
description: The Node.js implementation of the API for the Server Client + API architecture scenario
url: /architecture-scenarios/application/server-api/api-implementation-nodejs
---
# Server Client + API: Node.js Implementation for the API

::: panel Server + API Architecture Scenario
This document is part of the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) and it explains how to implement the API in Node.js. Please refer to the scenario for information on the implemented solution.
:::

Full source code for the Node.js API implementation can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-api/node).

## 1. Define the API endpoint

We will use the [Express web application framework](http://expressjs.com/) to build our Node.js API.

### Create a package.json File

Create a folder for your API, navigate into it and run `npm init`. This will setup your `package.json` file.

You can leave the default settings or change them as you see fit.

Our sample’s `package.json` looks like the following:

```json
{
  "name": "timesheets-api",
  "version": "1.0.0",
  "description": "API used to add timesheet entries for employees and contractors",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/auth0-samples/auth0-pnp-timesheets.git"
  },
  "author": "Auth0",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/auth0-samples/auth0-pnp-timesheets/issues"
  },
  "homepage": "https://github.com/auth0-samples/auth0-pnp-timesheets#readme"
}
```

### Install the Dependencies

Next, we need to set our dependencies. We will use the following modules:

- **express**: This module adds the [Express web application framework](https://expressjs.com/).

- **jwks-rsa**: This library retrieves RSA signing keys from a [**JWKS** (JSON Web Key Set)](/jwks) endpoint. Using `expressJwtSecret` we can generate a secret provider that will provide the right signing key to `express-jwt` based on the `kid` in the JWT header. For more information refer to the [node-jwks-rsa GitHub repository](https://github.com/auth0/node-jwks-rsa).

- **express-jwt**: This module lets you authenticate HTTP requests using JWT tokens in your Node.js applications. It provides several functions that make working with JWTs easier. For more information refer to the [express-jwt GitHub repository](https://github.com/auth0/express-jwt).

- **body-parser**: This is a Node.js body parsing middleware. It extracts the entire body portion of an incoming request stream and exposes it on `req.body` as something easier to interface with.For more information and several alternatives refer to the body-parser GitHub repository.

To install these dependencies run the following:

```bash
npm install express express-jwt jwks-rsa body-parser --save
```

### Implement the Endpoint

Navigate to your API directory and create a `server.js` file. Your code needs to:
- Set the dependencies.
- Enable the request body parsing middleware.
- Implement the endpoint.
- Launch the API server.

This is our sample implementation:

```js
// set dependencies
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');

// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// create timesheets upload API endpoint
app.post('/timesheets/upload', function(req, res){
  res.status(201).send({message: "This is the POST /timesheets/upload endpoint"});
})

// launch the API Server at localhost:8080
app.listen(8080);
```

Launch your API server using `node server` and make an HTTP POST request to `localhost:8080/timesheets/upload`. You should see a JSON response with a message `This is the POST /timesheets/upload endpoint`.

So now we have our endpoint but anyone can call it. Continue to the next paragraph to see how we can fix this.

## 2. Secure the API endpoint

In order to validate our token we will use the `jwt` function, provided by the [express-jwt middleware](https://github.com/auth0/express-jwt#usage), and the `jwks-rsa` package to retrieve the public key from Auth0. The libraries do the following:

1. `express-jwt` will decode the token and pass the request, the header and the payload to `jwksRsa.expressJwtSecret`.

1. `jwks-rsa` will then download all signing keys from the JWKS endpoint and see if a one of the signing keys matches the `kid` in the header of the JWT. If none of the signing keys match the incoming `kid`, an error will be thrown. If we have a match, we will pass the right signing key to `express-jwt`.

1. `express-jwt` will the continue its own logic to validate the signature of the token, the expiration, `audience` and the `issuer`.

The steps we will follow in our code are:
- Create the middleware function to validate the Access Token.
- Enable the use of the middleware in our routes.

This is also a good time for you to implement the logic to save the timesheet entries to a local database, or whatever other storage mechanism you may prefer. This is our sample implementation (some code is omitted for brevity):

```js
// set dependencies - code omitted

// enable the use of request body parsing middleware - code omitted

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${account.namespace}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${account.namespace}/`,
  algorithms: ['RS256']
});

// create timesheets API endpoint
app.post('/timesheets/upload', checkJwt, function(req, res){
  var timesheet = req.body;

  // Save the timesheet entry to the database...

  //send the response
  res.status(201).send(timesheet);
})

// launch the API Server at localhost:8080 - code omitted
```

If we launch our server now and do an HTTP POST to `localhost:8080/timesheets/upload` we should get the error message `Missing or invalid token` (which is perfectly fine since we didn’t send an Access Token in our request).

In order to test the working scenario as well we need to:
- Get an Access Token. For details on how to do so refer to: [Get an Access Token](/architecture-scenarios/application/server-api#get-an-access-token).
- Invoke the API while adding an `Authorization` header to our request with the value `Bearer ACCESS_TOKEN` (where *ACCESS_TOKEN* is the value of the token we retrieved in the first step).

## 3. Check the Client permissions

In this step we will add to our implementation the ability to check if the client has permissions (or `scope`) to use our endpoint in order to upload a timesheet. In particular we want to ensure that the token has the correct scope, which is `batch:upload`. 

In order to do this we will make use of the `express-jwt-authz` Node.js package, so go ahead and add that to your project:

```bash
npm install express-jwt-authz --save
```

Now it is as simple as adding a call to `jwtAuthz(...)` to your middleware to ensure that the JWT contain a particular scope in order to execute a particular endpoint. This is our sample implementation (some code is omitted for brevity):

```js
// set dependencies - some code omitted
const jwtAuthz = require('express-jwt-authz');

// Create middleware for checking the JWT

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Batch upload endpoint
app.post('/timesheets/upload', checkJwt, jwtAuthz(['batch:upload']), function(req, res){
  var timesheet = req.body;

  // Save the timesheet entry to the database...

  //send the response
  res.status(201).send(timesheet);
});

// launch the API Server at localhost:8080 - code omitted
```

If we invoke our API with a token that does not include this scope we should get the error message Forbidden with the HTTP status code `403`. You can test this by removing this scope from your API.

That's it! You are done!
