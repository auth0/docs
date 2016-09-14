---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* NodeJS 4.3 or superior
* Express 4.11
:::

Many identity providers will supply access claims, like roles or groups, with the user. You can request these in the token by setting `scope: openid roles` or `scope: openid groups`. However, not every identity provider supplies this type of information. Fortunately, Auth0 has an alternative, which is to create a rule for assigning different roles to different users.

## 1. Create a Rule to Assign Roles

First, you will create a rule that assigns users to either an `admin` role or a single `user` role. Go to the [New Rule](https://manage.auth0.com/#/rules/new) page on the Auth0 dashboard, and select the Set Roles to a User template under Access Control.

By default, this rule will assign the user an `admin` role if the user’s email contains `@example.com`. Otherwise, the user will be assigned a regular `user` role.

NOTE: You can set roles other than `admin` and `user`; you can even customize the rule as needed.

## 2. Check if a User's Role is Present

Create a new file called `requireRole.js`

```js
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

## 3. Restrict a Route based on User's Roles

To demonstrate how to restrict access to certain routes based on a user's roles, you can update the `routes/index.js` file as shown below.

First add the necessary imports

```js
...
var requireRole = require('../requireRole');
...
```

Then create the following two routes

```js
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

And the required templates

`views/admin.jade`

```jade
extends layout

block content
  h1 You are seeing this because you have the 'admin' role
```

`views/unauthorized.jade`

```jade
extends layout

block content
  h1 Permission denied
  p Set "roles": ["admin"] in the user's app_metadata section.
```

The new `/admin` route requires the current user to have an __admin__ role, and redirects to `/unauthorized` otherwise.
