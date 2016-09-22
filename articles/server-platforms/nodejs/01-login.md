---
title: Login
description: This tutorial demonstrates how to add authentication to a Node.js and Express web app
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '01-Login'
}) %>

### 1. Add New Dependencies

Run the following commands to install the required dependencies:

```bash
# Authentication middleware
npm install passport --save

# Auth0 strategy for Passport.js
npm install passport-auth0 --save

# Simple helper middleware to ensure the user is authenticated
npm install connect-ensure-login --save
```

### 2. Add Requires and Initialize Passport Configuration

First we need to require `passport` and `passport-auth0` in `app.js`.

```js
// app.js

...

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

...
```

Next we need to setup and configure Passport to use the Auth0 strategy.

```js
// app.js

// Configure Passport to use Auth0
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

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
```

### 3. Configure the Middlewares

Add the following middlewares to your app:

```js
// app.js

...

app.use(passport.initialize());
app.use(passport.session());

...
```

### 4. Add Route Handlers

The route handlers will be created in the next step. In preparation for that, require `./routes/user` in `app.js`.

```js
// app.js

...

var user = require('./routes/user');

...
```

### 5. Authentication Using Lock

Using Auth0's Lock widget is the simplest and most robust way of handling user logins. Client side, the `Auth0Lock` library will initiate the login process and once the user is authenticated with the chosen provider, the useragent will perform a redirect to the URL specified in `AUTH0_CALLBACK_URL`. This URL will be picked up by Passport.js.

We will need to add a few routes for the application, including: `/login` `/logout'` `/callback` and `/user`. We will also need template files for `login` and `user`.

```js
// routes/index.js

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

After the authetication is complete, the `user` page should be displayed. Add a new file called `routes/user.js`.

```js
// routes/user.js

var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', { user: req.user });
});

module.exports = router;
```

We can now add some template files for these pages. Start with a base template called `layout.jade`. The CDN link to Auth0's Lock widget can be placed here. Alternatively, may prefer to place this `script` tag in another layout which places it after the `head` of the page.

```jade
// views/layout.jade

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="https://cdn.auth0.com/js/lock/10.3/lock.min.js")
  body
    block content
```

Next, create the `login` view.

```jade
// views/login.jade

extends layout

block content

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

```jade
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  a(href='/logout') Logout
```
