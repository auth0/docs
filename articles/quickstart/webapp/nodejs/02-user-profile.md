---
title: User Profile
description: This tutorial demonstrates how to fetch and update user profile information
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '02-User-Profile',
  requirements: [
    'NodeJS 4.3 or higher',
    'Express 4.11'
  ]
}) %>

## User Profile

Getting the user's profile information is very simple with Auth0. After the user has authenticated, a `user` object
with the entire profile is attached to every express request. By default this will be a minimal profile, to retrieve additional profile information
the `profile` scope should be added to the authentication scopes.

Modify the `/login` route so the `scope` parameter has the value `openid profile`

```js
// routes/index.js

router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  scope: 'openid profile'}),
  function(req, res) {
    res.redirect("/");
});
```

## Showing the User Profile

We can modify the `/user` endpoint to display the user object. Update the `views/user.pug` template:

```pug
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  a(href='/logout') Logout
  h2 User Profile
  pre #{userProfile}
```

To have full access to the user profile on  `userProfile`, we need to stringify the `user` object. Modify the `/` endpoint in `routes/user.js` to include `userProfile`.

```js
// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});
```

You can see there is enough information now to present a basic user profile.

## Management API

Although a basic user profile is useful, there are many times you want to take advantage of Auth0's additional profile properties such as `user_metadata` that allow you to store custom information about the user.

### Retrieve a complete user profile

In order to do so, you need to perform a call to the [Auth0 Management API](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) and perform a **GET** for the given user. You will require to pieces of information to perform this request, the **id** of the user which you can obtain from the `sub` value in the user's profile and the **idToken** yielded during the authentication of the user.

### Exposing the idToken

Currently you have access to the user's **Profile**, open `app.js` and update the `strategy` to expose the `extraParams` which includes the **idToken** to the `user` object.

```js
// app.js

var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, {
      profile: profile,
      extraParams: extraParams
    });
  });
```

### Calling the Management API

We are going to be using [require-promise](https://github.com/request/request-promise) to perform API calls to the Management API.

Install the necessary packages:

```bash
# installation with npm
npm install request request-promise --save

# installation with yarn
yarn add request request-promise
```

### Retrieve a full user profile

Open `routes/user.js` and add *request-promise*:

```js
var rp = require('request-promise');
```

You will need the Auth0 Domain, so add:

```js
var env = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
};
```

Now time to update the `/user` route with a call to the Management API

```js
// routes/user.js

router.get('/', ensureLoggedIn, function(req, res, next) {
  var idToken = req.user.extraParams.id_token;
  var userId = req.user.profile._json.sub

  var options = {
    method: 'GET',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    auth: {
      'bearer': idToken
    },
    json: true
  };

  rp(options)
    .then(function (profile) {
      req.session.passport.user.fullProfile = profile // Update the stored profile
      res.render('user', {
        user: req.user.fullProfile,
        userProfile: JSON.stringify(req.user.fullProfile, null, 2)
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect('/');
    });
});
```

You should now see a complete profile including the `user_metadata`.

## Update the User Profile

You can store additional user information in the user metadata. In order to do so, you need to perform a call to the [Auth0 Management API](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id) and perform a **PATCH** for the given user.
Once again you need the **id** of the user which you can obtain from the `sub` value in the user's profile and the **idToken`** yielded during authentication.

## Update route

Let's add a new route for `/user/update` this will take a form POST from the `user` page, update the user's profile via an API call to the Management API and then refresh the user's profile.

### Add a form to the user view

You are going to add an input field for the user's **Country**.

Replace the contents of `views/user.pug` with:

```txt
extends layout

block content
  img(src=user.picture)
  h2 Welcome #{user.nickname}!
  br
  form(method='POST' action='/user/update')
            div.form-group
              label(for='country') Country
              input.form-control(type='text' id='country' placeholder=user.user_metadata.country name='country')
            button.btn.btn-primary(type='submit') Update Profile User Metadata
  br
  a(href='/logout')
    button() Logout
  h2 User Profile
  pre #{userProfile}
```

### Add an update route

```js
// routes/user.js

router.post('/update', ensureLoggedIn, function(req, res, next) {
  var idToken = req.user.extraParams.id_token;
  var userId = req.user.profile._json.sub
  var country = req.body.country

  var userData = { "user_metadata": { "country": country } }

  var options = {
    method: 'PATCH',
    uri: 'https://' + env.AUTH0_DOMAIN + '/api/v2/users/' + userId,
    body: userData,
    auth: {
      'bearer': idToken
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (profile) {
      req.session.passport.user.fullProfile = profile
      res.redirect('/user');
    })
    .catch(function (err) {
      console.log("Patch Failed:" + err);
      res.redirect('/user');
    });
});
```

Now you can update the user's profile with custom metadata.
