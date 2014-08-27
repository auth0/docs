---
lodash: true
---

## NodeJS Tutorial

<div class="package">
  <blockquote>
    <a href="https://docs.auth0.com/node-auth0/master/create-package?path=examples/nodejs-regular-webapp&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %> 
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a> 
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing NodeJS WebApp to use it with Auth0.**

### 1. Add Passport dependencies

Just run the following code to install the dependencies and add them to your `package.json`

````js
npm install passport passport-auth0 --save
```

### 2. Configure passport-auth0

We need to configure Passport to use Auth0 strategy. 

````js
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({  
    domain:       '@@account.namespace@@',
    clientID:     '@@account.clientId@@',
    clientSecret: '@@account.clientSecret@@',
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy; 
```

### 3. Add needed requires & initialize passport configuration

In the startup file (e.g. _server.js_ or _app.js_) add:

````js
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

````js
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhh' }));
...
app.use(passport.initialize());
app.use(passport.session());
...
```

### 5. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information.

````js
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

@@includes.callbackRegularWebapp@@

In this case, the callbackURL should look something like:

````
http://yourUrl/callback
```

### 6. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 7. Accessing user information

You can access the user information via the `user` field in the `request`

````js
app.get('/user', function (req, res) {
  res.render('user', {
    user: req.user
  });
});
```

### 8. You've nailed it.

You have configured your NodeJS Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following middleware to check if the user is authenticated and redirect him to the login page if he's not:

````js
// requiresLogin.js
module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
```
````js
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
