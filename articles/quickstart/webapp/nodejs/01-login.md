---
title: Login
description: This tutorial demonstrates how to add user login, logout, and profile to a Node.js Express application.
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
<!-- markdownlint-disable MD002 -->

<%= include('../_includes/_getting_started', { library: 'Node.js', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Configure Node.js to use Auth0

### Create the .env file

Create the `.env` file in the root of your app and add your Auth0 variables and values to it.

```
# .env
AUTH0_CLIENT_ID=${account.clientId}
AUTH0_DOMAIN=${account.namespace}
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

::: warning
Do not put the `.env` file into source control. Otherwise, your history will contain references to your client secret.
:::

If you are using git, create a `.gitignore` file (or edit your existing one, if you have one already) and add `.env` to it. The `.gitignore` file tells source control to ignore the files (or file patterns) you list. Be careful to add `.env` to your `.gitignore` file and commit that change before you add your `.env`.

```
# .gitignore
.env
```

### Install the dependencies

To get started, install the following dependencies.

* [passport](http://www.passportjs.org/) - an authentication middleware for Node.js
* [passport-auth0](https://github.com/auth0/passport-auth0) - an Auth0 authentication strategy for Passport
* [express-session](https://www.npmjs.com/package/express-session) - a middleware to manage sessions
* [dotenv](https://www.npmjs.com/package/dotenv) - a module to load environment variables from a `.env` file

```bash
# installation with npm
npm install passport passport-auth0 express-session dotenv --save
```

### Configure express-session

In `app.js`, include the `express-session` module and configure it. The `secret` parameter is a secret string that is used to sign the session ID cookie. Please use a custom value.

```js
// app.js

var session = require('express-session');

// config express-session
var sess = {
  secret: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(session(sess));
```

### Configure Passport with the application settings

In `app.js`, include the `passport` and `passport-auth0` modules, and configure Passport to use a new instance of `Auth0Strategy` with your Auth0 application settings. Use `passport.initialize()` and `passport.session()` to initialize Passport with persistent login sessions.

```js
// app.js

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
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

Please make sure these last two commands are in your code after the application of the express middleware (`app.use(session(sess)`).

### Storing and retrieving user data from the session

In a typical web application, the credentials used to authenticate a user are only transmitted during the login request. If authentication succeeds, a session is established and maintained via a cookie set in the user's browser. Each subsequent request does not contain credentials, but rather the unique cookie that identifies the session.

To support login sessions, Passport serializes and deserializes user instances to and from the session. Optionally, you may want to serialize only a subset to reduce the footprint, i.e., `user.id`.

```js
// app.js

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
```

## Implement login, user profile and logout

In this example, the following routes are implemented:

* `/login` triggers the authentication by calling Passport's `authenticate` method. The user is then redirected to the tenant login page hosted by Auth0.
* `/callback` is the route the user is returned to by Auth0 after authenticating. It redirects the user to the profile page (`/user`).
* `/user` displays the user's profile.
* `/logout` logs the user out of Auth0.

We will use the following routers:

* `routes/auth.js`, to handle authentication
* `routes/index.js`, to serve the home page
* `routes/users.js`, to serve the user profile

### Adding the authentication router

Start by creating a new router `routes/auth.js` to handle authentication.

In the authentication step, make sure to pass the `scope` parameter with values `openid email profile` to access email and the other attributes stored in the user profile. This is needed to display the user's information on the profile page.

```js
// routes/auth.js

var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();

  var returnTo = req.protocol + '://' + req.hostname;
  var port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }
  var logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;
```

:::note
This tutorial implements logout by closing the local user session and the user's Auth0 session as well. For other implementations, please refer to the [logout documentation](/logout).
:::

### Middleware to protect routes

Create a `secured` middleware to protect routes and ensure they are only accessible if logged in.

If the user is not logged in, the requested route will be stored in the session and the user will be redirected to the login page. Upon successful login, the user will be redirected to the previously requested URL (see callback route above).

```js
// lib/middleware/secured.js

module.exports = function () {
  return function secured (req, res, next) {
    if (req.user) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  };
};
```

### Create the user profile route

The `/user` route (the user's profile) should only be accessible if the user is logged in. Use the secured middleware to secure the route.

```js
// routes/users.js

var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
```

### Index route

If you don't have one yet, create an index route to serve the homepage.

```js
// routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;
```

### Making the user available in the views

In the views and layouts, it is often necessary to conditionally render content depending on if a user is logged in or not. Other times, the user object might be necessary in order to customize the view.

Create a middleware `lib/middleware/userInViews.js` for this purpose.

```js
// userInViews.js

module.exports = function () {
  return function (req, res, next) {
    res.locals.user = req.user;
    next();
  };
};
```

### Including the routers and userInViews middleware

Include the new routers and the `userInViews` middleware in your app:

```js
// app.js

var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ..
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
// ..
```

### Implement navigation links

Use `locals.user`, as implemented in the middleware, to customize the views. For example, we can use it to conditionally render links related to the user session in the layout.

```pug
//- views/layout.pug

  body
    // ...
    a(href="/") Home
    if locals.user
      a(href="/user") Profile
      a(href="/logout") Log Out
    else
      a(href="/login") Log In

    // ...
    block content
```

### Implement the user profile view

Create a `views/user.pug` template. Use `locals.user` to access the user data in the session.

```pug
//- views/user.pug

extends layout

block content
  br
  .w3-container
    .w3-card-4
      header
      h1 Welcome #{user.nickname}
      img(src=user.picture)
      h2 User profile
      p This is the content of <code>req.user</code>.
      p Note: <code>_raw</code> and <code>_json</code> properties have been ommited.
      pre
        code #{userProfile}
```

## See it in action

Install the dependencies, start your app and point your browser to [http://localhost:3000](http://localhost:3000). Follow the **Log In** link to log in or sign up to your Auth0 tenant. Upon successful login or signup, you should be redirected to the user's profile page.

![login page](/media/articles/web/hosted-login.png)
