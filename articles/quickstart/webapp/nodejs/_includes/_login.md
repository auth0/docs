## Configure Node to Use Auth0 

Install the necessary middleware.

```bash
# installation with npm
npm install passport passport-auth0 connect-ensure-login --save

# installation with yarn
yarn add passport passport-auth0 connect-ensure-login
```

### Configure the Middleware

Create a new instance of the `Auth0Strategy` strategy. 
Enter your Auth0 application details as configuration values. Tell `passport` to use this strategy. 

```js
// app.js

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());

```

## Trigger Authentication

[Universal Login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the login dialog directly in your application using the [Lock widget](/lock). If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/tree/embedded-login/01-Embedded-Login).
:::

Add a route called `/login`. Use the `env` object to set the following properties for your application: 
* Client ID
* Domain
* Callback URL

The route creates an instance of the `auth0.WebAuth` object. Then, the route calls the `authorize` method and redirects the user to the login page.

```js
// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: '${account.clientId}',
  AUTH0_DOMAIN: '${account.namespace}',
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

```

![hosted login](/media/articles/web/hosted-login.png)
