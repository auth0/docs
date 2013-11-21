# Using Auth0 with node.js

Integrating Auth0 with node is straight forward. At the end of this tutorial you will have a working web site, capable of authenticating users with an external identity provider (no more passwords in your app!).

If you are building a node based app, you are very likely using [__passportjs__](http://passportjs.org/), the well known middleware for authentication. We've built a [strategy for passport](https://github.com/qraftlabs/passport-auth0) that makes integration even simpler. There's not really much magic there, just boilerplate code.

> 'Strategies' are in essence __passport__ plugins. 

##Before you start

Here's what you do for integrating Auth0 in your app with __passport__:

###1. Install the Auth0 strategy

    npm install passport passport-auth0 --save

> __TIP:__ Don't have an app to play with? You can create one very easily with express. Run _npm install express -g_ followed by _express_. That will create a simple "hello world" express website.

###2. Initialize passport-auth0

Create a new file __setup-passport.js__ with the following code:

    var passport = require('passport');
    var Auth0Strategy = require('passport-auth0');

    var strategy = new Auth0Strategy({  
        domain:       '@@account.namespace@@',
        clientID:     '@@account.clientId@@',
        clientSecret: '@@account.clientSecret@@',
        callbackURL:  '/callback'
      }, function(accessToken, refreshToken, profile, done) {
        //Some tracing info
        console.log('profile is', profile);
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

> __TIP__: you typically would put this file under a 'lib' folder

###3. Initialize passport in your app
In the startup file (e.g. _server.js_ or _app.js_) add:

    var passport = require('passport');
    var strategy = require('./setup-passport');

and then in the __app.configure__ function make sure to have the `cookieParser` and `session` middlewares and then add the `passport` middlewares:

    app.configure(function(){
      ...
      app.use(express.cookieParser());
      app.use(express.session({ secret: 'shhhhhhhhh' }));
      ...
      app.use(passport.initialize());
      app.use(passport.session());
      ...
      app.use(app.router);
    });

The last bit of code you will need are the handlers for the passport callbacks:

    // Auth0 callback handler
    app.get('/callback', 
      passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }), 
      function(req, res) {
        if (!req.user) {
          throw new Error('user null');
        }
        res.redirect("/");
      });

### 4. Setting up the callback URL in Auth0

  <div class="setup-callback">
  <p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

  <pre><code>http://localhost:PORT/callback</pre></code>
  </div>

### 5. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 6. Accessing user information

Once the user succesfuly authenticated to the application, a `user` will be generated which can be accessed through the `req.user` property.

    app.get('/', function (req, res) {
      res.render('home', {
        user: JSON.stringify(req.user, 0, 2)
      });
    });

The user profile is normalized regardless of where the user came from. For more information about the normalized user profile [read this](user-profile).
  
**Congratulations!**
