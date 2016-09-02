---
title: Login
description: This tutorial will show you how to add authentication to your nodejs/express web app.
---

## NodeJS Web App Tutorial

You can get started by downloading the seed project and following the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgPath: '01-Login',
  pkgType: 'server'
}) %>

### 1. Add new dependencies

Just run the following commands to install the required dependencies.

```bash
# Authentication middleware.
npm install passport --save

# Auth0 strategy for passportjs.
npm install passport-auth0 --save

# Simple helper middleware to ensure the user is authenticated.
npm install connect-ensure-login --save
```

### 2. Add needed requires & initialize passport configuration

First we need to require our newly installed `passport` and `passport-auth0` libraries in app.js

```js
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
```

Now we have to setup and configure Passport to use the Auth0 strategy.

```js
// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
```

### 3. Configure the middlewares

Just add the following middlewares to your app:

```js
...
app.use(passport.initialize());
app.use(passport.session());
...
```

### 4. Add route handlers

Make sure to require `./routes/user` in `app.js` we will create `routes/user.js`
soon.

```js
...
var user = require('./routes/user');
...
```

### 5. Authentication using Auth0Lock widget

Using the Auth0Lock widget is the simplest and most robust way of handling user
logins. Client side, the Auth0Lock library will initiate the login process,
once the user is authenticated with the chosen provider the useragent will
perform a redirect to AUTH0_CALLBACK_URL which will be picked up by `passportjs`.

We will need to add a few routes: `/login` `/logout'` `/callback` and `/user`
and two more jade files: `views/login.jade` and `views/user.jade`
like so:

in `routes/index.js`

```js
// Render the login template
router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });
```

After the authetication is complete we need to render the `user` template.
Add a new file called `routes/user.js` with the following contents:

```js
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', { user: req.user });
});

module.exports = router;
```

The corresponding templates look like so:

`views/login.jade`

```js
extends layout

block content
  script(src="https://cdn.auth0.com/js/lock/10.0/lock.min.js")

  div(id="root" style="width: 280px; margin: 40px auto; padding: 10px;")

  script.
    // Construct an instance of Auth0Lock with your clientId and aut0 domain name
    var lock = new Auth0Lock('#{env.AUTH0_CLIENT_ID}', '#{env.AUTH0_DOMAIN}',{ auth: {
          redirectUrl: '#{env.AUTH0_CALLBACK_URL}'
        , responseType: 'code'
        , params: {
          scope: 'openid name email picture'
        }
      }});
    // Show lock's login widget
    lock.show();
```

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the URL for the callback route.

In `views/user.jade` we simply display the user's nickname and profile picture.

```js
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  a(href='/logout') Logout
```
