---
title: Login
description: This tutorial will show you how to use the Auth0 Node.js Express SDK to add authentication and authorization to your web app.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  pkgRepo: 'node-auth0',
  pkgPath: 'examples/nodejs-regular-webapp',
  pkgType: 'server'
}) %>


::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_signup') %>

**If you have an existing application, follow the steps below.**

### 1. Add Passport dependencies

Just run the following code to install the dependencies and add them to your `package.json`

${snippet(meta.snippets.dependencies)}

### 2. Configure passport-auth0

We need to configure Passport to use Auth0 strategy.

Create a file called `setup-passport.js` and add these contents to it:

${snippet(meta.snippets.setup)}

### 3. Add needed requires & initialize passport configuration

In the startup file (e.g. _server.js_ or _app.js_) add:

```js
var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');
```

### 4. Configure the middlewares

Now, just add the following middlewares to your app:

```js
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: '${account.clientSecret}', resave: false,  saveUninitialized: false }));
...
app.use(passport.initialize());
app.use(passport.session());
...
```

### 5. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get their information.

```js
// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });
```

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```

### 6. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the URL specified in the previous step

### 7. Accessing user information

You can access the user information via the `user` field in the `request`

```js
app.get('/user', function (req, res) {
  res.render('user', {
    user: req.user
  });
});
```

### 8. You're done!

You have configured your NodeJS Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following middleware to check if the user is authenticated and redirect him to the login page if he's not:

```js
// requiresLogin.js
module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
```
```js
// user.js
var requiresLogin = require('requiresLogin');

app.get('/user',
  requiresLogin,
  function (req, res) {
    res.render('user', {
      user: req.user
    });
  });
```
