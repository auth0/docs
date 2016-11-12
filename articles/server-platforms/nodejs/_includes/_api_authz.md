### Configuring Your Application

## Add New Dependencies

For this quickstart tutorial, our examples will use the Jade templating engine, although this is not a requirement. It is assumed that your NodeJS project has dependencies such as Jade, Express, etc. already installed, so we won't cover those. We will focus on the steps necessary to take your existing NodeJS Express app and enable Auth0's API Authorization features with it using the [auth0.js library](/libraries/auth0js).

Run the following commands to install the required dependencies:

```bash
# Authentication middleware
npm install passport --save

# Auth0 strategy for Passport.js
npm install passport-auth0 --save

# Simple helper middleware to ensure the user is authenticated
npm install connect-ensure-login --save

# Session middleware for Express
npm install express-session --save

```

## Passport Configuration

First we need to require `express-session`, `passport` and `passport-auth0` in `app.js`.

```js
// app.js

...

var session = require('express-session');
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
    callbackURL:  process.env.AUTH0_CALLBACK_URL
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

## Configure the Middlewares

Add the following middlewares to your app:

```js
// app.js

...

app.use(session({
  secret: 'yourSessionSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

...
```

Passport will automatically persist the session after the Auth0 authentication and authorization process is complete.

## Add Route Handlers

The route handlers will be created in the next step. In preparation for that, require `./routes/user` and `./routes/index` in `app.js`.

```js
// app.js

...

var routes = require('./routes/index');
var user = require('./routes/user');

...
```

## Authentication

Using the [auth0.js library](/libraries/auth0js), you can initiate the login process and once the user is authenticated with the chosen provider, the useragent will perform a redirect to the URL specified in `AUTH0_CALLBACK_URL`. This URL will be picked up by Passport.js.

We will need to add a few routes for the application, including: `/` `/logout'` `/callback` and `/user`. We will also need template files for `index` and `user`.

```js
// routes/index.js

router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS Quickstart Demo' });
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

We can now add some template files for these pages. Start with a base template called `layout.jade`. The CDN link to Auth0's JavaScript library can be placed here. Alternatively, may prefer to place this `script` tag in another layout which places it after the `head` of the page.

```jade
// views/layout.jade

doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="https://cdn.auth0.com/w2/auth0-7.2.js")
  body
    block content
```

Next, create the `index` view. It is here where you will instantiate the Auth0 client and create a function that will initiate the authentication process when the Login button is clicked by the user.

```jade
// views/index.jade

extends layout

block content

  h1= Welcome to my application
  br
  button(onclick="signIn()") Login

  script.
    // Construct an instance of the auth0 client
    var auth0 = new Auth0({
      domain:       '#{env.AUTH0_DOMAIN}',
      clientID:    '#{env.AUTH0_CLIENT_ID}',
      callbackURL: '#{env.AUTH0_CALLBACK_URL}',
    });

    // this function will be called when a user clicks the login button
    function signIn() {
      auth0.login({
      responseType: 'id_token token',
      scope: 'openid profile {API SCOPES}',
      audience: '{API IDENTIFIER}'
      });
    }

```

The `audience` parameter should contain your API identifier from the Dashboard. If you don't send this, the runtime will take it from the tenant settings (`tenant.default_audience` or you can set it in the Dashboard). The `scope` parameter may include one or more scopes (separated by a space) you defined in the Dashboard for your API, in addition to any of the standard [openid scopes](https://auth0.com/docs/scopes).

In `views/user.jade` we simply display the user's nickname and profile picture.

```jade
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  a(href='/logout') Logout
```

## Making an Authenticated API Call

Use the `access_token` to invoke the Resource Server (API):

```js
// invoke API endpoint with authn header
var options = {
  url: 'https://my.api/todo',
  headers: {
    'Authorization': 'Bearer ' + req.user.extraParams.access_token
  }
};

request(options, function(error, response, body) {
  var info = JSON.parse(body);
  res.json({jwt: info.jwt});
});

```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: https://${account.namespace}/.well-known/jwks.json. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our Backend/API Quickstart documentation](https://auth0.com/quickstart/backend).
.

