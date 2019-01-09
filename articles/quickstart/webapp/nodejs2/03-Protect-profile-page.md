---
title: Protecting the profile page
description: This quickstart will teach the fundamentals of protecting parts of a Node.js application. We'll use Auth0 to greatly speed up the implementation of a user system.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - user profile
  - logout
  - nodejs
  - Express
contentType: tutorial
useCase: quickstart
github:
    path: 03-Protect-profile-page
---

in the previous sections we [created a basic node server using Express](/quickstart/webapp/nodejs2/01-Create-express-app) and [configured a profile page](/quickstart/webapp/nodejs2/02-Implement-profile-page) which will show basic user profile information when accessed at the `users/profile` URL.

In order to ensure certain pages in our application are only accessible to users with an authenticated user session we first need to implement session functionality within our app.

## Adding sessions to our application

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
## Middleware to protect routes

In this section we are going to restrict access to the `/users/profile` URL so that only users that with an authenticated session can access it. Let's implement some basic middleware to check for the existence of a user session (`req.user`) and if no user session exists we will redirect to a `/login` URL.

Go ahead and create a `middleware` folder in the root of your application directory. Inside this folder we will create a `secured.js` file.
```shell
.
|-- app.js
|-- bin
|   └-- www
└-- middleware
    └-- secured.js
// ...
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

This middleware returns a function called `secured` that looks to see if there is a user attached to the request (`req.user`). If not, it will store the originally requested URL in a variable at `req.session.returnTo` and then redirect the user to `/login`.

Now we need to call our `secured` middleware on our `/users/profile` route by including it in our `routes/users.js`.
```javascript
// routes/users.js
var express = require('express');
var router = express.Router();
var secured = require('../middleware/secured'); // include the secured middleware

// ...
/* GET profile listing. */
router.get('/profile', 
  secured(),
  function(req, res, next) {
    res.render('profile', {
      title: 'Profile page',
      user: req.user
    });
  });
// ...

module.exports = router;
```

:::note
If we test our application at this point we will be redirected to the `/login` URL which does not yet exist. Our app will respond with a 404. Let's implement the login route next.
:::

## Adding the login route

 In order to have this work as expected we need to create a `/login` route. We don't actually want to implement login within our application, but rather make use of Auth0's login and user management functionality. To do this we will create an `auth.js` include that will handle authentication and redirection to Auth0 for us.

Inside our `middleware` folder create an `auth.js` file.
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

Now when we navigate to any URL in our application that is `secured` we will be successfully redirected to the `/login` URL. Protecting any URL on our site is as simple as including the call to `secured();` in our router.

In the next section we will successfully avoid building our own entire login and user management system by [Implementing user authentication with Auth0](/quickstart/webapp/nodejs2/04-Authenticate-users)

