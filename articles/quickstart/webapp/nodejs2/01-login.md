---
title: Login
description: This Quickstart builds a simple User Profile application using Node.js and Express. Auth0 will seamlessly provide login, logout, and user profile functionality.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
contentType: tutorial
useCase: quickstart
github:
    path: 01-Login
---

We'll be building a simple web application that displays a user profile page for the current user. The web application will be served from [Node.js](https://nodejs.org/en/) using the [Express](https://expressjs.com/) web framework to speed up our development process.

## Create Node.js and Express app

We'll start by creating a basic Node application. If you have an existing Node app you would like to use you can [skip to the next section](http://localhost:3000/docs/quickstart/webapp/nodejs2#implement-a-user-profile-page).

To get started we will be making use of [express-generator](https://expressjs.com/en/starter/generator.html) to quickly generate our application skeleton. Assuming you already have [Node and NPM](https://nodejs.org/en/) installed we'll generate an application into a `profileapp` directory with the following commands.
```shell
$ npm install express-generator -g
$ express --view=pug --git profileapp
```

Here we've installed the `express-generator` node module and then used it to create a new Node Express app for us. Express-generator also generates a number of folders and files that a standard Node Express application would use. We are using the Pug templating engine (as defined in the `--view=pug` flag) and we're used the `--git` configuration flag to auto-generate a `.gitignore` file. 

Now let's switch to your new application directory and install the node dependencies
```shell
$ cd profileapp
$ npm install
```

Node will download and install all the required dependencies for a basic node express server and place them into a `node-modules` folder. We shouldn't need to ever worry about the contents of this folder, npm and node will manage it for us.

Finally we can run our application locally to confirm it worked.
```shell
$ npm start
```

Navigate your browser to [http://localhost:3000](http://localhost:3000/) and you will see the Express welcome screen.

![Express welcome screen](/media/articles/quickstart/express_running.png)

## Implement a user profile page

One of the great things about Express Generator is that it has already configured a couple of routes for our application. We are going to use the existing `/users` route to show a profile screen for the currently logged in user.

### Create the user profile template in pug

Let's start with a user profile template at `views/profile.pug`. This page will make use of user data that we will implement shortly.

```pug
//- views/profile.pug

extends layout

block content
  a(href='/') Home
  .w3-container
    .w3-card-4
      header
      h1 Welcome #{user.nickname}
      img(src=user.picture)
      h2 User profile
      p This is the content of <code>req.user</code>.
      p Note: <code>_raw</code> and <code>_json</code> properties have been ommited.
      pre
        code #{user.profile}
``` 

### Configure the users route

Now edit the `routes/users.js` file to render our new user template. 

```javascript
// routes/users.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', 
  function(req, res, next) {
    res.send('User data here');
  });

/* GET users listing. */
router.get('/profile', 
  function(req, res, next) {
    res.render('profile', {
      title: 'Profile page',
      user: req.user
    });
  });


module.exports = router;

```
:::note
We are referencing a `req.user` object that does not exist yet. We will add this functionality in a moment.
:::

### Link to the users page

Inside the `views/index.pug` template Let's add a link to our new `/users` route.
```pug
//- views/index.pug

extends layout

block content
  h1= title
  p Welcome to #{title}
  a(href='/users') Profile
```

Restart the node application and navigate to `localhost:3000/users`. You should now see the user profile page (with no user information currently being displayed).

**Insert image here empty profile page**

## Protecting the users route

Ideally we want the `/users` page to only be accessible to users that are authenticated. To do this we will implement some middleware that redirect users to `/login` if there is no active user session.

### Middleware to protect routes
Go ahead and create a `middleware` folder in the root of your application directory. Inside this folder we will create `secured.js`.

```shell
.
|-- app.js
|-- bin
|   └-- www
|-- middleware
|   └-- secured.js
|-- public
|   |-- images
|   |-- javascripts
|   └-- stylesheets
|       └-- style.css
|-- routes
|   |-- index.js
|   └-- users.js
└-- views
    |-- error.pug
    |-- index.pug
    |-- layout.pug
    └-- user.pug
```

And create the following middleware function inside `secured.js`.

```javascript
// middleware/secured.js

module.exports = function () {
  return function secured (req, res, next) {
    if (req.user) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login')
  }
}
```

This middleware will look to see if there is a user attached to the request (`req.user`). If not, it will store the requested URL in a variable at `req.session.returnTo` and then redirect the user to `/login`.

Now we need to call our `secured` middleware on our `/users` route by including it in our `routes/users.js`.
```javascript
// routes/users.js

// ...
/* GET users listing. */
router.get('/', 
  secured(),
  function(req, res, next) {
    res.render('user', {
      title: 'Profile page',
      user: {}
    });
  });

module.exports = router;
```

:::note
At this point if we try to run our application and navigate to `/users` we will get an error as we have not yet implemented any session functionality. Let's go ahead and add that next.
:::

### Adding sessions to our application

To handle session functionality within our application we'll use a node module called `express-sessions`.

First, install the node module in our application
```shell
$ npm install express-session --save
```

Then require and configure `express-session` inside `app.js`

```javascript
// app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var sess = {
  secrets: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (process.env.NODE_ENV === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

// ...
```

and tell express to `app.use` the session
```javascript
// app.js

// ...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
// ...
```
:::note
Implementing session functionality will fix our session error, however now we will be redirected to the `/login` route, which doesn't exist and will return a 404. Let's implement that and start using Auth0 to avoid having to build our own user authentication system.
:::

### Adding the login route

At this point when a user navigates to our protected `/users` route our `secured` middleware will check that they have an active user session and if they do not it will redirect them to `/login`. In order to have this work as expected we need to create a `/login` route. We don't actually want to implement login within our application, but rather make use of Auth0's login and user management functionality. To do this we will create an `auth.js` include that will handle authentication and redirection to Auth0 for us.

Create the auth middleware `middleware/auth.js`
```javascript
// middleware/auth.js

module.exports = function (app) {
  // catch the /login route
  app.get('/login', 
    function (req, res) {
      res.send('To be implemented');
    });

  // return call to next middleware
  return function (req, res, next) {
    next();
  }
}
```

require the middleware and tell express to `app.use` it
```javascript
// app.js

// ...
var session = require('express-session');
var auth = require('./middleware/auth');

// ...

app.use(session(sess));
app.use(auth(app));
// ...
```

## Implementing user authentication with Auth0

No one wants to build a full login and user authentication system on their own and this Quickstart is no exception. In order to avoid building user authentication we'll use Auth0. In order to make using Auth0 as easy as possible we will use a couple of excellent node modules to handle the bulk of the auth transaction for us.

### Pasport.js

[Passport](http://www.passportjs.org/) is a node module for handling authentication transactions. It's extremely flexible and uses 'strategies' for various authentication providers. We're also going to use [passport-auth0](https://github.com/auth0/passport-auth0), an easily configured Auth0 strategy for Passport.

:::note
Passport handles all of the various calls to Auth0 as part of a standard OAuth and OpenID Connect transaction for us. To better understand what is happening during this transaction see: [Regular web app login flow](https://auth0.com/docs/flows/concepts/regular-web-app-login-flow).
:::

To start we need to install both node modules.
```shell
$ npm install passport passport-auth0 --save
```

Inside our `middleware/auth.js` file we'll update it to include both modules and configure the auth strategy.

```javascript
// middleware/auth.js

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// configure our callback URL to work locally or in production
var callback = (process.env.NODE_ENV === 'production') ?
  process.env.APP_HOST + process.env.AUTH0_CALLBACK_URL :
  'http://localhost:3000' + process.env.AUTH0_CALLBACK_URL;

var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: callback
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is a token used to call the Auth0 /userinfo API (not used in this quickstart)
    // extraParams.id_token is the user's JSON Web Token from authentication
    // profile will contain all the user's information 
    return done(null, profile);
  }
);

passport.use(strategy);

module.exports = function (app) {
  
  app.use(passport.initialize());
  app.use(passport.session());
  // ...
```
:::note
We are making use of environment variables here for the Auth0 configuration details. We will need to configure our application's environment variables, which we will get to in a minute. 
:::

Create functions for Passport to set and retrieve the user details from the session.
```javascript
// middleware/auth.js

// ...
passport.use(strategy);

// function to save the user object into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// function to retrieve the user object from the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = function (app) {
  // ...
```
:::note
In this example we store the entire user object in the session and then return the entire user object again when the application needs it. You could reduce the size of the session cookie by storing only a reference to the user.id in the session and then providing a function during `deserializeUser` to retrieve the user's records. You can learn more in the [passport documentation](http://www.passportjs.org/docs/configure/)
:::

We also need to modify our `/login` route to make use of the passport functionality
```javascript
// middleware/auth.js

// ...
  app.get('/login',
    passport.authenticate('auth0', {
      scope: 'openid email profile'
    }),
    function (req, res) {
      res.redirect('/');
    }
  );
  // ...
```

Before we can test our login functionality we need to now head over to Auth0 and get our application details to include in our environment variables.

<%= include('../_includes/_getting_started', { library: 'Node.js', callback: 'http://localhost:3000/callback' }) %>

## Configure Node.js with Auth0 environment variables

We are going to use environment variables to securely store our Auth0 application credentials and configuration. Using environment variables makes these values available to the application without exposing them in your uploaded source code.

::: warning
Do not put the `.env` file into source control. Otherwise, your history will contain references to your client secret.
:::
If you are using git, create a `.gitignore` file (or edit your existing one, if you have one already) and add `.env` to it. The `.gitignore` file tells source control to ignore the files (or file patterns) you list. Be careful to add `.env` to your `.gitignore` file and commit that change before completing the next step.

### Create the .env file

In the root of your application directory create a `.env` file and add your Auth0 variables from the previous step.
```plaintext
# .env

AUTH0_DOMAIN= ${account.namespace}
AUTH0_CLIENT_ID= ${account.clientId}
AUTH0_CLIENT_SECRET= YOUR_CLIENT_SECRET
AUTH0_CALLBACK_URL= '/callback'
APP_HOST= 
```
:::note
If your application has a production domain you can add it as the `APP_HOST` value above. 

E.g., `http://profileapp.com`
:::


### Enable the environment variables within Node.js
In order for your `.env` variables to be available within your node app you will use the [dotenv](https://www.npmjs.com/package/dotenv) node module which reads your `.env` file and converts the values into node environment vars.

Install `dotenv`.
```shell
$ npm install dotenv --save
```

And require the `dotenv` module in `app.js`.
```javascript
// app.js

// ...
var logger = require('morgan');
var session = require('express-session');
var dotenv = require('dotenv').config();
  // ...
```

## Callback and logout

The final step is to handle the response to `/callback` from Auth0 and also implement a `logout`.

### Handle the Auth0 callback

If you run your application now you will see that navigating to `/users` will redirect you to Auth0 for login. After login Auth0 will redirect back to your configured callback URL. As we have not configured the handling of this callback yet you should see a 404 for the `/callback` route.

Let's implement the callback handler now by adding it to our `auth.js` middleware
```javascript
// middleware/auth.js

// ...
// catch the login route
app.get('/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile'
  }),
  function (req, res, next) {
    res.redirect('/')
  }
);

// catch the callback route
app.get('/callback',
  function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        var returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/user');
      });
    })(req, res, next);
  }
);

// return call to next middleware
return function (req, res, next) {
  // ...
```
Here we call `passport.authenticate` with the request and response. We also define a function that passport calls to log the user in (`req.logIn`) and then redirect the user to their original destination URL.



########################################################

########################################################





## Configure Node.js to use Auth0

### Create the .env file

Create the `.env` file in the root of your app and add your Auth0 variables and values to it.

```
# .env
AUTH0_CLIENT_ID=${account.clientId}
AUTH0_DOMAIN=${account.namespace}
AUTH0_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

::: warning
Do not put the `.env` file into source control. Otherwise, your history will contain references to your client secret.
:::

If you are using git, create a `.gitignore` file (or edit your existing one, if you have one already) and add `.env` to it. The `.gitignore` file tells source control to ignore the files (or file patterns) you list. Be careful to add `.env` to your `.gitignore` file and commit that change before you add your `.env`.

```
# .gitignore
.env
```

### Install the dependencies

To get started, install the following dependencies.

* [passport](http://www.passportjs.org/) - an authentication middleware for Node.js
* [passport-auth0](https://github.com/auth0/passport-auth0) - an Auth0 authentication strategy for Passport
* [express-session](https://www.npmjs.com/package/express-session) - a middleware to manage sessions
* [dotenv](https://www.npmjs.com/package/dotenv) - a module to load environment variables from a `.env` file

```bash
# installation with npm
npm install passport passport-auth0 express-session dotenv --save
```

### Configure express-session

In `app.js`, include the `express-session` module and configure it. The `secret` parameter is a secret string that is used to sign the session ID cookie. Please use a custom value.

```js
// app.js

var session = require('express-session');

// config express-session
var sess = {
  secret: 'CHANGE THIS TO A RANDOM SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));
```

### Configure Passport with the application settings

In `app.js`, include the `passport` and `passport-auth0` modules, and configure Passport to use a new instance of `Auth0Strategy` with your Auth0 application settings. Use `passport.initialize()` and `passport.session()` to initialize Passport with persistent login sessions.

```js
// app.js

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: 
      process.env.AUTH0_CALLBACK_URL ||
      'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
```
Please make sure these last two commands are in your code after the application of the express middleware (`app.use(session(sess)`).

### Storing and retrieving user data from the session

In a typical web application, the credentials used to authenticate a user are only transmitted during the login request. If authentication succeeds, a session is established and maintained via a cookie set in the user's browser. Each subsequent request does not contain credentials, but rather the unique cookie that identifies the session.

To support login sessions, Passport serializes and deserializes user instances to and from the session. Optionally, you may want to serialize only a subset to reduce the footprint, i.e., `user.id`.

```js
// app.js

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
```

## Implement login, user profile and logout

In this example, following routes are implemented:

* `/login` triggers the authentication by calling Passport's `authenticate` method. The user is then redirected to the tenant login page hosted by Auth0.
* `/callback`is the route the user is returned to by Auth0 after authenticating. It redirects the user to the profile page (`/user`).
* `/user` displays the user's profile.
* `/logout` closes the local user session and redirects the user again to the root index `/`.

We will use the following routers:

* `routes/auth.js`, to handle authentication
* `routes/index.js`, to serve the home page
* `routes/users.js`, to serve the user profile

### Adding the authentication router

Start by creating a new router `routes/auth.js` to handle authentication.

In the authentication step, make sure to pass the `scope` parameter with values `openid email profile` to access email and the other attributes stored in the user profile. This is needed to display the user's information on the profile page.

```js
// routes/auth.js

var express = require('express');
var router = express.Router();
var passport = require('passport');

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
```

:::note
This tutorial implements logout by closing the local user session. After logging out, the user's session in the Auth0 authentication server is still open. For other implementations, please refer to the [logout documentation](/logout). 
:::

### Middleware to protect routes

Create a `secured` middleware to protect routes and ensure they are only accessible if logged in.

If the user is not logged in, the requested route will be stored in the session and the user will be redirected to the login page. Upon successful login, the user will be redirected to the previously requested URL (see callback route above).

```js
// lib/middleware/secured.js

module.exports = function () {
  return function secured (req, res, next) {
    if (req.user) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  };
};
```

### Create the user profile route

The `/user` route (the user's profile) should only be accessible if the user is logged in. Use the secured middleware to secure the route.

```js
// routes/users.js

var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
```

### Index route

If you don't have one yet, create an index route to serve the homepage.

```js
// routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
});

module.exports = router;
```

### Making the user available in the views

In the views and layouts, it is often necessary to conditionally render content depending on if a user is logged in or not. Other times, the user object might be necessary in order to customize the view.

Create a middleware `lib/middleware/userInViews.js` for this purpose.

```js
// userInViews.js

module.exports = function () {
  return function (req, res, next) {
    res.locals.user = req.user;
    next();
  };
};
```

### Including the routers and userInViews middleware

Include the new routers and the `userInViews` middleware in your app:

```js
// app.js

var userInViews = require('./lib/middleware/userInViews');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ..
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
// ..
```

### Implement navigation links 

Use `locals.user`, as implemented in the middleware, to customize the views. For example, we can use it to conditionally render links related to the user session in the layout.


```pug
//- views/layout.pug

  body
    // ...
    a(href="/") Home
    if locals.user
      a(href="/user") Profile
      a(href="/logout") Log Out
    else
      a(href="/login") Log In
    
    // ...
    block content
```

### Implement the user profile view 

Create a `views/user.pug` template. Use `locals.user` to access the user data in the session.

```pug
//- views/user.pug

extends layout

block content
  br
  .w3-container
    .w3-card-4
      header
      h1 Welcome #{user.nickname}
      img(src=user.picture)
      h2 User profile
      p This is the content of <code>req.user</code>.
      p Note: <code>_raw</code> and <code>_json</code> properties have been ommited.
      pre
        code #{userProfile}
```

## See it in action

Install the dependencies, start your app and point your browser to [http://localhost:3000](http://localhost:3000). Follow the **Log In** link to log in or sign up to your Auth0 tenant. Upon successful login or signup, you should be redirected to the user's profile page.

![login page](/media/articles/web/hosted-login.png)
