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

router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

```

## Showing the User Profile

We can modify the `/user` endpoint to display the user object. Update the `views/user.pug` template:

```pug
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  h2 User Profile
  pre #{userProfile}
  br
  a(href='/logout') Logout
```

To have full access to the user profile on  `userProfile`, we need to stringify the `user` object. Modify the `/` endpoint in `routes/user.js` to include `userProfile`.

```js
// routes/user.js

// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});

```

You can now present a basic user profile.
