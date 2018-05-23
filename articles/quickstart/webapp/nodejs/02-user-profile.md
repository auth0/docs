---
title: User Profile
description: This tutorial demonstrates how to fetch and update user profile information.
budicon: 292
github: 
  path: 02-User-Profile
---

## User Profile

After the user has authenticated, every express request has a `user` object with the entire user profile. 
By default, it is a minimal profile. Add the `profile` scope to the authentication scopes to get additional profile information. 

Add the `openid profile` value to the `scope` parameter in the `/login` route. 

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

## Show the User Profile

Modify the `/user` endpoint to display the user object. Update the `views/user.pug` template.

```pug
// views/user.pug

extends layout

block content
  img(src=user.picture)
  h2 Welcome #{user.nickname}!
  br
  h2 User Profile
  pre #{userProfile}
  br
  a(href='/logout') Logout
```

To have full access to the user profile on  `userProfile`, stringify the `user` object. Modify the `/` endpoint in `routes/user.js` to include `userProfile`.

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
