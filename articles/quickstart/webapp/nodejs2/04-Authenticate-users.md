---
title: Authenticating users with Auth0
description: This quickstart will teach the fundamentals of protecting parts of a Node.js application. We'll use Auth0 to greatly speed up the implementation of a user system.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
  - Express
contentType: tutorial
useCase: quickstart
github:
    path: 04-Authenticate-users
---

in the previous sections we [created a basic node server using Express](/quickstart/webapp/nodejs2/01-Create-express-app), [configured a profile page](/quickstart/webapp/nodejs2/02-Implement-profile-page) which will show basic user profile information when accessed at the `users/profile` URL, and implemented middleware to [Protect the profile page](/quickstart/webapp/nodejs2/03-Protect-profile-page) making it accessible only to people with an active user session.

The final piece of the puzzle is to quickly enable users to get a user session by logging in with Auth0. 

## Implementing user authentication with Auth0

No one wants to build a full login and user authentication system on their own and this Quickstart is no exception. In order to avoid building user authentication we'll use Auth0. In order to make using Auth0 as easy as possible we will use a couple of excellent node modules to handle the bulk of the auth transaction for us.

[Passport](http://www.passportjs.org/) is a node module for handling authentication transactions. It's extremely flexible and uses 'strategies' for various authentication providers. We're also going to use [passport-auth0](https://github.com/auth0/passport-auth0), an easily configured Auth0 strategy for Passport.

:::note
Passport handles all of the various calls to Auth0 as part of a standard OAuth and OpenID Connect transaction for us. To better understand what is happening during this transaction see: [Regular web app login flow](https://auth0.com/docs/flows/concepts/regular-web-app-login-flow).
:::

To start we need to install both node modules.
```shell
$ npm install passport passport-auth0 --save
```

Inside our `middleware/auth.js` file we'll update it to include both modules and configure the auth strategy.
```javascript
// middleware/auth.js

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// configure our callback URL to work locally or in production
var callback = (process.env.NODE_ENV === 'production') ?
  process.env.APP_HOST + process.env.AUTH0_CALLBACK_URL :
  'http://localhost:3000' + process.env.AUTH0_CALLBACK_URL;

var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: callback
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is a token used to call the Auth0 /userinfo API (not used in this quickstart)
    // extraParams.id_token is the user's JSON Web Token from authentication
    // profile will contain all the user's information 
    return done(null, profile);
  }
);

passport.use(strategy);

module.exports = function (app) {
  
  app.use(passport.initialize());
  app.use(passport.session());
  // ...
```
:::note
We are making use of environment variables here for the Auth0 configuration details. We will need to configure our application's environment variables, which we will get to in a minute. 
:::

Create functions for Passport to set and retrieve the user details from the session.
```javascript
// middleware/auth.js

// ...
passport.use(strategy);

// function to save the user object into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// function to retrieve the user object from the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = function (app) {
  // ...
```
:::note
In this example we store the entire user object in the session and then return the entire user object again when the application needs it. You could reduce the size of the session cookie by storing only a reference to the user.id in the session and then providing a function during `deserializeUser` to retrieve the user's records. You can learn more in the [passport documentation](http://www.passportjs.org/docs/configure/)
:::

We also need to modify our `/login` route to make use of the passport functionality
```javascript
// middleware/auth.js

// ...
  app.get('/login',
    passport.authenticate('auth0', {
      scope: 'openid email profile'
    }),
    function (req, res) {
      res.redirect('/');
    }
  );
  // ...
```

Before we can test our login functionality we need to now head over to Auth0 and get our application details to include in our environment variables.

<%= include('../_includes/_getting_started', { library: 'Node.js', callback: 'http://localhost:3000/callback' }) %>

## Configure Node.js with Auth0 environment variables

We are going to use environment variables to securely store our Auth0 application credentials and configuration. Using environment variables makes these values available to the application without exposing them in your uploaded source code.

::: warning
Do not put the `.env` file into source control. Otherwise, your history will contain references to your client secret.
:::
If you are using git, create a `.gitignore` file (or edit your existing one, if you have one already) and add `.env` to it. The `.gitignore` file tells source control to ignore the files (or file patterns) you list. Be careful to add `.env` to your `.gitignore` file and commit that change before completing the next step.

## Create the .env file

In the root of your application directory create a `.env` file and add your Auth0 variables from the previous step.
```plaintext
# .env

AUTH0_DOMAIN= ${account.namespace}
AUTH0_CLIENT_ID= ${account.clientId}
AUTH0_CLIENT_SECRET= YOUR_CLIENT_SECRET
AUTH0_CALLBACK_URL= '/callback'
APP_HOST= 
```
:::note
If your application has a production domain you can add it as the `APP_HOST` value above. 

E.g., `http://profileapp.com`
:::


## Enable the environment variables within Node.js
In order for your `.env` variables to be available within your node app you will use the [dotenv](https://www.npmjs.com/package/dotenv) node module which reads your `.env` file and converts the values into node environment vars.

Install `dotenv`.
```shell
$ npm install dotenv --save
```

And require the `dotenv` module in `app.js`.
```javascript
// app.js

// ...
var logger = require('morgan');
var session = require('express-session');
var dotenv = require('dotenv').config();
  // ...
```
## Handle the Auth0 callback

The final step is to handle the response to `/callback` from Auth0.

If you run your application now you will see that navigating to `/users` will redirect you to Auth0 for login. After login Auth0 will redirect back to your configured callback URL. As we have not configured the handling of this callback yet you should see a 404 for the `/callback` route.

Let's implement the callback handler now by adding it to our `auth.js` middleware
```javascript
// middleware/auth.js

// ...
// catch the login route
app.get('/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile'
  }),
  function (req, res, next) {
    res.redirect('/')
  }
);

// catch the callback route
app.get('/callback',
  function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        var returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  }
);

// return call to next middleware
return function (req, res, next) {
  // ...
```
Here we call `passport.authenticate` with the request and response. We also define a function that passport calls to log the user in (`req.logIn`) and then redirect the user to their original destination URL.

Implementing this piece has now enabled a full user authentication system into our application. If we restart our application and navigate to `/users/profile` we will be asked to log in via our Auth0 authentication server. Following login we will be directed to the profile page where we can see our user details.

Missing from our user information is a text representation of the `req.user` object. We can implement that fairly easily with a small addition to our `routes/users.js` file.
```javascript
// routes/users.js

// ...
/* GET users listing. */
router.get('/', 
  secured(),
  function(req, res, next) {
    var { _raw, _json, ...userProfile } = req.user;
    res.render('user', {
      title: 'Profile page',
        user: req.user,
        userProfile: JSON.stringify(userProfile, null, 2)
    });
  });

module.exports = router;

```

With this code we unpack the `req.user` object and convert the userProfile into a JSON string representation of the user object (minus the `_raw` and `_json` elements). We assign this to a `userProfile` value. Which is rendered in the Pug template.

The final step would be for us to implement logout functionality within our app. We can do this in the same way that we do the login process by creating a route for the `/logout` URL and using that to trigger a call to Auth0's logout endpoints.




