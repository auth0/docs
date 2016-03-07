---
sitemap: false
title: Using the Authorization Code Grant from a Node.js application
url: /api-auth/authorization-code-grant/node-js
---

# Using the Authorization Code Grant from a Node.js application

After the [**Resource Server**](/api-auth/resource-servers/node-js) has been created, you can create a Node.js application which obtains an `access_token` using the [**Authorization Code Grant**](/api-auth/grant/authorization-code) workflow.

::: panel-info System Requirements
This document assumes that you have a Node.js Express application using the following technologies:

* NodeJS 4.3
* Express 4.13
:::

## 1. Add the dependencies

Run the following command to install the required dependencies and add them to your `package.json`:

```
npm install passport passport-oauth2 jsonwebtoken express-session cookie-parser --save
```

After you have installed the dependencies, be sure to load all the required modules in your application:

```
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var oauth2 = require('passport-oauth2');
var jwt = require('jsonwebtoken');
```

## 2. Configure cookie middleware

Configure the session and cookie middleware:

```
app.use(cookieParser());
app.use(session({ secret: 'YOUR_SECRET_HERE' }));
```

## 3. Configure Passport...

We need to configure Passport to use the OAuth2 strategy. In the `verify` callback of the OAuth2 strategy we will decode the `access_token` which is returned, and return a new user which consists of an `id` which is extracted from the `sub` (Subject) Claim and also the `access_token` so we can pass the access token along on subsequent API calls.

```
passport.use(new oauth2.Strategy({
  authorizationURL: 'https://${account.namespace}/i/oauth2/authorize',
  tokenURL: 'https://${account.namespace}/oauth/token',
  clientID: '${account.clientId}',
  clientSecret: '${account.clientSecret}',
  callbackURL: '${account.callback}',
  skipUserProfile: true
}, function(accessToken, refreshToken, profile, done) {
  // Extract info from JWT
  var payload = jwt.decode(accessToken);

  done(null, {
    id: payload.sub,
    access_token: accessToken
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
```

## 4. Initialize Passport

```
app.use(passport.initialize());
app.use(passport.session());
```

## 5. Authenticate Requests

To Authenticate request you can write a `requiresLogin ` middleware function which checks whether the request is authenticated, and if not simply redirects the user back to the home page:

```
var requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};
```

And then ensure we pass the middleware when we define the route:

```
app.get('/appointments', requiresLogin, function(req, res, next) {
  
});
```

## 6. Pass Access Token along with API requests

After the user has been authenticated, you can simply extract the access token from the `user` property of the `req` parameter, and pass it along as a `Bearer` token in the `Authorization` header of the request:

```
app.get('/appointments', requiresLogin, function(req, res, next) {
  request({
    url: 'https://YOUR_API/api/appointments',
    json: true,
    headers: {
      'Authorization': 'Bearer ' + req.user.access_token
    }
  }, function(error, response, body) {
    if (error) {
      logger.error(error);
      return res.status(500);
    } else {
      res.render('appointments', {
        user: req.user,
        appointments: JSON.stringify(body, null, 2)
      });
    }
  });
});
```