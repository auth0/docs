---
title: Authorization
description: This tutorial demonstrates how assign roles to your users and how to use those claims to authorize or deny a user to access certain routes in the app
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '07-Authorization'
}) %>

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in the token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider supplies this type of information. Fortunately, Auth0 has an alternative, which is to create a rule for assigning different roles to different users.

## Create a Rule to Assign Roles

First, create a rule that assigns users to either an `admin` role or a single `user` role. Go to the [New Rule](https://manage.auth0.com/#/rules/new) page on the Auth0 dashboard and select the "Set Roles to a User" template under Access Control.

By default, this rule will assign the user an `admin` role if the user’s email contains `@example.com`. Otherwise, the user will be assigned a regular `user` role.

> **NOTE:** The authorization rule can be customized as needed and is not limited to setting roles of `admin` and `user`.

## Check if a User's Role is Present

Create a new file called `requireRole.js`. This file will contain a middleware that will be used to check for the existence of a role in a user's `app_metadata`. Since `app_metadata` is readonly for users, they are not able to manipulate their own authorization level.

```js
// requireRole.js

module.exports = function requireRole(role) {
  return function(req, res, next) {
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    if (roles.indexOf(role) != -1) {
      next();
    } else {
      res.redirect('/unauthorized');
    }
  }
}
```

## Restrict Routes Based on the User's Roles

To demonstrate how to restrict access to certain routes based on a user's roles, you can update the `routes/index.js` to include an `/admin` route and use the `requireRole` middleware on it.

```js
// routes/index.js

...

var requireRole = require('../requireRole');

...

router.get('/admin',
  requireRole('admin'),
  function(req, res) {
    res.render('admin');
  });

router.get('/unauthorized', function(req, res) {
  res.render('unauthorized', {env: env});
});

...
```

Next, add the required template for the `/admin` and `/unauthorized` routes.

```jade
// views/admin.jade

extends layout

block content
  h1 You are seeing this because you have the 'admin' role
```

```jade
// views/unauthorized.jade

extends layout

block content
  h1 Permission denied
  p Set "roles": ["admin"] in the user's app_metadata section.
```

The new `/admin` route requires the user to have a role of `admin` in their `app_metadata` and redirects to `/unauthorized` if the role is not present.
