---
title: Login
description: This tutorial demonstrates how to add user login, logout and profile to a Node.js Express application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
contentType: tutorial
useCase: quickstart
github:
    path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Node.js', callback: 'http://localhost:3000/callback' }) %>

## Configure Node.js to Use Auth0 

### Install and load the Dependencies

To follow along this guide, install the following dependencies.

* [passport](http://www.passportjs.org/) - an authentication middleware for Node.js
* [passport-auth0](https://github.com/auth0/passport-auth0) - an Auth0 authentication strategy for Passport
* [express-session](https://www.npmjs.com/package/express-session) - an Express middleware to manage sessions
* [connect-ensure-login](https://github.com/jaredhanson/connect-ensure-login) - a middleware to ensure the user is logged in order to access certain routes

```bash
# installation with npm
npm install passport passport-auth0 express-session connect-ensure-login --save

# installation with yarn
yarn add passport passport-auth0 express-session connect-ensure-login
```

### Configure express-session

In `app.js`, include the `express-session` module and configure it. The `secret` parameter is a secret string that will be used to sign the session ID cookie. Please use a custom value.

```js
// app.js

var session = require('express-session');

//session-related stuff
var sess = {
 secret: 'CHANGE THIS SECRET',
 cookie: {},
 resave: false,
 saveUninitialized: true
};

if (app.get('env') === 'production') {
 sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));
```

### Configure Passport with the Auth0 Strategy and Your Auth0 Application Settings

In `app.js`, include the `passport` and `passport0-auth0`modules, configure Passport to use a new instance of `Auth0Strategy` with your Auth0 application settings. Load the `passport.initialize()` and `passport.session()` middlewares to initialize Passport with persistent login sessions. 

Please use the client secret from the application settings in your Auth0 dashboard.

```js
// app.js
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

//passport-auth0
var strategy = new Auth0Strategy({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/callback'
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
```

### Storing and Retrieving User Data from the Session

In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser. Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.

In order to support login sessions, Passport will serialize and deserialize user instances to and from the session. Optionally, you may want to serialize only a subset to reduce the footprint, i.e., `user.id`.

```js
//app.js
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
```

## Implementing Login, User Profile and Logout

### Adding the Routes

In this example, we will implement the following routes:

* a route `/login`, that will trigger authentication by calling Passport's `authenticate` method. The user will be redirected to the login page.
* a route `/callback`, that will be finalize the authentication when the user returns from the Auth0 login page and redirects to the profile page on sucessful login.
* a `/user` route, to display the user's profile.
* a route `/logout`, that closes the local user session and redirects the user again to the root index `/`.

In the authentication step, make sure to pass the scope parameter with values `openid email profile` in order to access email and the other attributes stored in the user profile within the tenant. This will be needed in order to display the user's information on the profile page.

The user's profile route should only be accessible if the user is logged in. Use the `ensureLoggedIn` middleware for this purpose. To have full access to the user profile on `userProfile`, stringify the `user` object.

:::note
This tutorial implements logout by closing the local user session. After logging out, the user will continue to have an open session at the tenant level. For other implementations please refer to [our logout docs](https://auth0.com/docs/logout). 
:::

Create a new router `routes/auth.js`:

```js
// routes/auth.js

var express = require('express');
var router = express.Router();
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login',
  passport.authenticate('auth0', {scope: 'openid email profile'}), function (req, res) {
  res.redirect("/");
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  }
);

/* GET user profile. */
router.get('/user', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
```

Include this new router in your app, by requiring the file in the top section of  `app.js`:

```js
// app.js

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

//..
//..

app.use('/', indexRouter);
//..
app.use('/', authRouter);
//..
```

![login page](/media/articles/web/hosted-login.png)

### Implement a Helper Function to Check User Session

In the views and layouts, we will need to conditionally render content depending on if a user is logged in or not.
Add a helper function to check if the user is persisted in the session or not.

```js
// app.js

// Look up session to know if user is logged in 
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

// the auth router should be loaded after the function definition
app.use('/', indexRouter);
//..
app.use('/', authRouter);
//..
```

### Implement Navigation Links 

In your views, use the function defined in the previous step to render links to login, logout an user profile, depending on the case.

```pug
// views/layout.pug

  body
    // ...
    a(href="/") Home
    if loggedIn
      a(href="/user") Profile
      a(href="/logout") Logout
    else
      a(href="/login") Login
    
    // ...
    block content
```

## Display User Information

Modify the `/user` endpoint to display the user object. Update the `views/user.pug` template.

```pug
// views/user.pug

extends layout

block content
  br
  img(src=user.picture)
  p Welcome #{user.nickname}!
  br
  h2 User Profile
  pre #{userProfile}
```