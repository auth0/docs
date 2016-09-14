---
title: User Profile
description: This tutorial will show you how to fetch user profile information.
---

## NodeJS Web App Tutorial

You can get started by downloading the seed project and following the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-nodejs-webapp-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-nodejs-webapp-sample',
  pkgBranch: 'master',
  pkgPath: '04-User-Profile',
  pkgType: 'server'
}) %>

## 1. User Profile

Getting the user profile information is very simple. After the user has authenticated a `user` object
with the entire profile is attached to every express request.

## 2. Showing the User Profile

Let's modify the `/user` endpoint to display the user object, add the following to the `views/user.jade` template

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

The only change left to do is to strigify the `user` object into the `userProfile` variable
Modify the `/` endpoint in `views/user.js` to look like:

```js
/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user ,
    userProfile: JSON.stringify(req.user, null, '  ')
  });
});
```

That's it.
