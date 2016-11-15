---
title: "Server Client + API: Node.js Implementation for the API"
description: The Node.js implementation of the API for the Server Client + API architecture scenario
url: /architecture-scenarios/application/server-api/api-implementation-nodejs
---

# Server Client + API: Node.js Implementation for the API

::: panel-info Server + API Architecture Scenario
This document is part of the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) and it explains how to implement the API in Node.js. Please refer to the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) document for information on the implemented solution.
:::

Full source code for the Node.js API implementation can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-abc-timesheets/tree/master/timesheets-api/node).

## Define the API endpoints

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

### Set the Dependencies

Next, we need to set our dependencies. We will use the following modules:

- **express**: This module adds the [Express web application framework](https://expressjs.com/).

- **jwks-rsa**: This library retrieves RSA signing keys from a **JWKS** (JSON Web Key Set) endpoint. Using `expressJwtSecret` we can generate a secret provider that will provide the right signing key to `express-jwt` based on the `kid` in the JWT header. For more information refer to the [node-jwks-rsa GitHub repository](https://github.com/auth0/node-jwks-rsa).

- **express-jwt**: This module lets you authenticate HTTP requests using JWT tokens in your Node.js applications. It provides several functions that make working with JWTs easier. For more information refer to the [express-jwt GitHub repository](https://github.com/auth0/express-jwt).

- **body-parser**: This is a Node.js body parsing middleware. It extracts the entire body portion of an incoming request stream and exposes it on `req.body` as something easier to interface with.For more information and several alternatives refer to the body-parser GitHub repository.


To install these dependencies run the following:

```bash
npm install express express-jwt jwks-rsa body-parser --save
```

### Implement the Endpoints

Navigate to your API directory and create a `server.js` file. Your code needs to:
- Get the dependencies.
- Implement the endpoint(s).
- Launch the API server.

This is our sample implementation:

```js
// set dependencies
const Express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');

// Initialize the app
const app = new Express();

// create timesheets API endpoint
app.post('/timesheet', function(req, res){
  res.status(201).send({message:”This is the POST /timesheet endpoint”});
})

// launch the API Server at localhost:8080
app.listen(8080);
```

Launch your API server using `node server` and navigate to `localhost:8080/timesheet`. You should see a JSON response with the `This is the POST /timesheet endpoint` message.

So now we have our endpoint but anyone can call it. Continue to the next paragraph to see how we can fix this.

## Secure the API endpoints

In order to validate our token we will use the `jwt` function, provided by the [express-jwt middleware](https://github.com/auth0/express-jwt#usage), and the `jwks-rsa` to retrieve our secret. The libraries do the following:

1. `express-jwt` will decode the token and pass the request, the header and the payload to `jwksRsa.expressJwtSecret`.

1. `jwks-rsa` will then download all signing keys from the JWKS endpoint and see if a one of the signing keys matches the `kid` in the header of the JWT. If none of the signing keys match the incoming `kid`, an error will be thrown. If we have a match, we will pass the right signing key to `express-jwt`.

1. `express-jwt` will the continue its own logic to validate the signature of the token, the expiration, `audience` and the `issuer`.

The steps we will follow in our code are:
- Create the middleware function to validate the access token.
- Enable the use of the middleware in our routes.
- If the validation fails return an appropriate error message.

This is our sample implementation (some code is omitted for brevity):

```js
// set dependencies - code omitted

// Initialize the app - code omitted

// validate the access token and enable the use of the jwtCheck middleware
app.use(jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{YOUR_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),


  // Validate the audience and the issuer
  audience: '{YOUR_API_IDENTIFIER}',
  issuer: 'https://{YOUR_AUTH0_DOMAIN}/',
  algorithms: [ 'RS256' ]
}));

// return error message for unauthorized requests
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});

// create timesheets API endpoint - code omitted

// launch the API Server at localhost:8080 - code omitted
```

If we launch our server now and navigate to `localhost:8080/timesheet` we should get the error message `Missing or invalid token` (which is perfectly fine since we didn’t send an access token in our request).

In order to test the working scenario as well we need to:
- Get an access token. For details on how to do so refer to: [Get an Access Token](/architecture-scenarios/application/server-api#get-an-access-token).
- Invoke the API while adding an `Authorization` header to our request with the value `Bearer ACCESS_TOKEN` (where *ACCESS_TOKEN* is the value of the token we retrieved in the first step).

## Check the Client permissions

In this step we will add to our implementation the ability to check if the client has permissions to use our endpoint in order to create a timesheet. We will look at the decoded JWT and see if the token has the correct scope, which is `create:timesheets`. If it doesn’t we will send an appropriate message, otherwise we will retrieve some of the request info and echo back the successful result.


This is our sample implementation (some code is omitted for brevity):

```js
// set dependencies - code omitted

// Initialize the app - code omitted

// validate the access token and enable the use of the jwtCheck middleware - code omitted

//middleware to check scopes
const checkPermissions = function(req, res, next){
  switch(req.path){
    case '/timesheet':{
      var permissions = ['create:timesheets'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.status(403).send({message:'Forbidden'});
        }
      }
      break;
    }
  }
}

// enable the use of the jwtCheck middleware - code omitted

//enable the use of the checkPermissions middleware
app.use(checkPermissions);

// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// return error message for unauthorized requests - code omitted

// create timesheets API endpoint
app.post('/timesheet', function(req, res){
  //print the posted data
  console.log(JSON.stringify(req.body, null, 2));

  //send the response
  res.status(201).send({message:"Timesheet created for " + req.body.user_type + ": " + req.body.user_id});
})

// launch the API Server at localhost:8080 - code omitted
```

If we invoke our API with a token that does not include this scope we should get the error message Forbidden with the HTTP status code `403`. You can test this by removing this scope from your API.

That's it! You are done!
