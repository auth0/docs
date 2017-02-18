---
title: How to Implement Token Based Authentication
description: Some example code for our implementation of JWT.
---

# How to Implement Token Based Authentication

Token based authentication and JWT are widely supported. JavaScript, Python, C#, Java, PHP, Ruby, Go and others have libraries to easily sign and verify JSON web tokens. Let’s implement an API and see how quickly we can secure it with JWT. We’ve chosen to build our API with NodeJS as it requires the least amout of setup. Let’s take a look the code for our implementation of JWT.

```javascript

// Load in our dependencies
var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

// Register the home route that displays a welcome message
// This route can be accessed without a token
app.get('/', function(req, res){
  res.send("Welcome to our API");
})

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes
app.get('/token', function(req, res){
  var token = jwt.sign({username:"ado"}, 'supersecret',{expiresIn: 120});
  res.send(token)
})

// Register a route that requires a valid token to view data
app.get('/api', function(req, res){
  var token = req.query.token;
  jwt.verify(token, 'supersecret', function(err, decoded){
    if(!err){
      var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"};
      res.json(secrets);
    } else {
      res.send(err);
    }
  })
})

// Launch our app on port 3000
app.listen('3000');

```

To test our current API, let’s run the application and navigate to `localhost:3000`. We’ll see just the message “Welcome to our API.” Next, navigate to the `localhost:3000/api` route and we’ll see a JWT error message which will say that we didn’t get a token. Navigate to the `localhost:3000/token` route and you will see a new token generated. Copy this token, then navigate to `localhost:3000/api?token={ADD-COPIED-TOKEN-HERE}` and you will see the intended response which is the company financial accounts.

With just a few lines of code we were able to secure our API endpoint. We didn’t cover handling proper user authentication before generating a token. We’ll do this with Auth0 next.

## JWT Authentication with Auth0

We will need to make some slight modifications to our code to showcase the authentication flow with Auth0. Let’s examine the changes below:

```javascript

// Load in our dependencies
var express = require('express');
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('{YOUR-APP-SECRET}', 'base64'),
  audience: '{YOUR-APP-CLIENT-ID}'
});

var app = express();

// Rather than checking for a token within our controller
// we'll use a middleware so if the token is invalid we'll
// stop further execution of the request
app.use('/api', jwtCheck);

app.get('/', function(req, res){
  res.send("Welcome to our API");
})

app.get('/api', function(req, res){
  var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"};
  res.json(secrets);
})

app.listen('3000');

```

To test that this works, let’s start the server and navigate to `localhost:3000/api`. We see a message saying that we didn’t send an authorization token. Let’s head over to the [Auth0 Playground](https://auth0.github.io/playground/), add in our credentials and get a token. Add the following code on the playground:

```javascript

var domain = '{YOUR-AUTH0-DOMAIN}.auth0.com';
var clientID = '{YOUR-APP-CLIENT-ID}';

var lock = new Auth0Lock(clientID, domain);
lock.show({
  focusInput: false,
  popup: true,
}, function (err, profile, token) {
  alert(token)
});

```

To make sure that we can get a token, we’ll need to navigate to our app settings in the [Auth0 Dashboard](${manage_url}) and add `https://auth0.github.io/playground` to our list of allowed callback URLs. Now let’s login or create an account on the Auth0 Playground and we will get an popup revealing our token.

To check the contents our token, we can decode it at [jwt.io](https://jwt.io/). To verify the token, we will need our Auth0 app’s `Client Secret` and we will need to check the **box secret base64 encode**. Doing this, we should now see the message **“Signature Verified.”**

To test that our API works with this token, we need to make a `GET` request to `localhost:3000/api` and send the token in an Authorization header. The simplest way to do this is to use an app like [Postman](https://www.getpostman.com/) which simplifies API endpoint testing. When making the call add an Authorization header and for the value add Bearer {TOKEN}. When the call is made the `jwtCheck` middleware will examine the request, ensure it has the Authorization header in the correct format, extract the token, verify it and if verified process the rest of the request. 

This example used default settings to showcase the capabilities of JWT. See the [JSON Web Tokens (JWT) in Auth0](/jwt) doc to learn more.

