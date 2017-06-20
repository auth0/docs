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

Auth0's hosted login page can be used to process the user's authentication transaction.

Add a route called `/login` and pass an `env` object with the **Client ID**, **Domain**, and **Callback URL** for your client to it.

```js
// routes/index.js

const env = {
  AUTH0_CLIENT_ID: '${account.clientId}',
  AUTH0_DOMAIN: '${account.namespace}',
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};

// Render the login template
router.get('/login',
  function(req, res){
    res.render('login', { env });
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

Create a view for the `/login` route. The view should instantiate `auth0.WebAuth` and call its `authorize` method to redirect the user to Auth0's hosted login page.

```pug
// views/login.pug

extends layout

block content

  div(id="root" style="width: 280px; margin: 40px auto; padding: 10px;")

  script.
    const webAuth = new auth0.WebAuth({
      clientID: '#{env.AUTH0_CLIENT_ID}',
      domain: '#{env.AUTH0_DOMAIN}',
      redirectUri: '#{env.AUTH0_CALLBACK_URL}',
      responseType: 'code',
      scope: 'openid'
    });
    webAuth.authorize();
```

## Embedded Login

Auth0's hosted login page provides the fastest, most secure, and most feature-rich way to implement authentication in your app. If required, the Lock widget can also be embedded directly into your application, but certain features such as single sign-on won't be accessible. It is highly recommended that you use the hosted login page (as covered in this tutorial), but if you wish to embed the Lock widget directly in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/tree/embedded-login/01-Embedded-Login).