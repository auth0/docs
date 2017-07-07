## Install the Middleware Dependencies

Install the necessary middelwares.

```bash
# installation with npm
npm install passport passport-auth0 connect-ensure-login --save

# installation with yarn
yarn add passport passport-auth0 connect-ensure-login
```

## Configure the Middleware

Provide your Auth0 client details as configuration values for an instance of `Auth0Strategy`. Tell **passport** to use the strategy.

```js
// app.js

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy({
  domain: '${account.namespace}',
  clientID: '${account.clientId}',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL:  'http://localhost:3000/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
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

// ...
app.use(passport.initialize());
app.use(passport.session());
```

## Trigger Authentication

Auth0's hosted login page can be used to allow users to log in.

Add a route called `/login` and call `passport.authenticate` when the route is accessed. This middleware will check for a valid user session. If none is found, the user will be prompted to log in.

::: note
This snippet sets the `audience` to ensure an OIDC compliant responses, this can also be achieved by enabling the **OIDC Conformant** switch in your Auth0 dashboard under `Client / Settings / Advanced OAuth`. For more information please check [this documentation](/api-auth/intro#how-to-use-the-new-flows).
:::

```js
// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Perform the login
router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  responseType: 'code',
  scope: 'openid'}),
  function(req, res) {
    res.redirect("/");
});

router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: '${account.clientId}',
    domain: '${account.namespace}',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/',
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

module.exports = router;
```


![hosted login](/media/articles/web/hosted-login.png)

Create a view for the `/login` route.

## Embedded Login

Auth0's hosted login page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use the hosted login page (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/tree/embedded-login/01-Embedded-Login).
