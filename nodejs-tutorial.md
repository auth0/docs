# Using Auth0 with node.js

Integrating Auth0 with node is straight forward. At the end of this tutorial you will have a working web site, capable of authenticating users with an external identity provider (no more passwords in your app!).

If you are building a node based app, you are very likely using [__passportjs__](http://passportjs.org/), the well known middleware for authentication. We've built a [strategy for passport](https://github.com/qraftlabs/passport-auth0) that makes integration even simpler. There's not really much magic there, just boilerplate code.

> 'Strategies' are in essence __passport__ plugins. 

##Before you start

1. We assume you are familiar with [nodejs](http://nodejs.org/) and [Express](http://expressjs.com/).
2. We also assume you have at least one [connection](@@uiURL@@/#/connections) either enabled or created. If you don't have one, this [tutorial](enable-simple-connection) shows how to enable Google OAuth2, one of the simplest connections possible.

Here's what you do for integrating Auth0 in your app with __passport__:

###1. Install the Auth0 strategy

    npm install passport passport-auth0 --save

> __TIP__: Don't have an app to play with? You can create one very easily with express:
>   npm install express -g
>   express 
> That will create a simple "hello world" express website.

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

The __clientId__, __clientSecret__ and __domain__ are available on the [settings](@@uiURL@@/#/settings) page. Keep this page open. We will need one last thing later on.

###3. Initialize passport in your app
In the startup file (e.g. _server.js_ or _app.js_) add:

    var passport = require('passport');
    var strategy = require('./setup-passport');

and then in the __app.configure__ function:

    app.configure(function(){
      ...
      app.use(passport.initialize());
      app.use(passport.session());
      ...
      app.use(app.router);
    });

The last bit of code you will need are the handlers for the passport callbacks:

    //Callback handler
    app.get('/callback', 
      passport.authenticate('auth0', { failureRedirect: '/authfailure' }), 
      function(req, res) {
        if (!req.user) {
          throw new Error('user null');
        }
        res.redirect("/");
      });

    //Authentication error handler
    app.get('/authfailure', function (req, res) {
      res.send('Authentication failed');
    });

    //Logout
    app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

    //Login
    app.get('/login', 
      passport.authenticate('auth0'), 
      function (req, res) {
        res.redirect("/");
      });

If you want to show some information about the user in the home page:

    app.get('/', function (req, res) {
      res.render('home', {
        user: user
      });
    });

> Check [passport.js profile](http://passportjs.org/guide/profile/) to see what attributes you can use. Also, Auth0 normalizes the user profile to simplify integration with multiple identity providers. Learn more about it [here](user-profile).

###4. Setup the callback URL in Auth0

Did you keep your settings page open? Make sure the __App Callback URLs__ in Auth0 is configured with your app's callback URL:

    http://localhost:port/callback

![](img/settings-callback.png)

> Notice that Auth0 supports many callbacks. Just use ',' as the delimiter.

#### Testing the app:

Open a browser an navigate to the login URL (e.g. http://localhost:3000/login)

### 5. Triggering login manually or integrating the Auth0 Login Widget

You can authorize through a specific connection in Auth0 using `/login?connection=<connection>`. For example, this would always have users authenticate through Google:

    <a class="btn" href="/login?connection=google-oauth2">Google-Oauth2</a>

Alternatively, you can use the __Auth0 Login Widget__ to display all available authentication options:

```
<script src="@@sdkURL@@/auth0.js#client=@@account.clientId@@&scope=openid"></script>
<a href="javascript: window.Auth0.signIn({onestep: true})">Log On</a>
```

> Notice we are adding a JavaScript element that will create a global variable `window.Auth0`. This is used to invoke the widget programatically. Either way, you have full control of the user experience.

The widget is a modal dialog shown on top of your web page:

![](img/signin.png)

The widget can be customized, read more about how to do it [here](login-widget).

##Suggested follow up tutorials

You have your basic node.js app running. If you want to get a deeper understanding of how this works, go ahead and read our [node.js under the hood](node-underthehood) tutorial.

Also, it is always a good thing to be familiar with the underlying [protocols](protocols).
