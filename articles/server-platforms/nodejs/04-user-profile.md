---
title: User Profile
description: This tutorial demonstrates how to fetch user profile information
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '04-User-Profile',
  requirements: [
    'NodeJS 4.3 or superior',
    'Express 4.11'
  ]
}) %>

## User Profile

Getting the user's profile information is very simple with Auth0. After the user has authenticated, a `user` object
with the entire profile is attached to every express request.

## Showing the User Profile

We can modify the `/user` endpoint to display the user object. Add the following to the `views/user.jade` template:

```jade
extends layout

block content
  img(src="#{user.picture}")
  h2 Welcome #{user.nickname}!
  br
  a(href='/logout') Logout
  h2 User Profile
  pre #{userProfile}
```

To have full access to the user profile on  `userProfile`, we need to stringify the `user` object. Modify the `/` endpoint in `views/user.js` to include `userProfile`.

```js
// views/user.js

// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});
```
