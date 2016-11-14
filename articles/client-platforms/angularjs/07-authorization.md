---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users, and use those claims to authorize or deny a user to access secure content in the app
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '07-Authorization'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/angularjs/06-rules' }) %>

## Create a Rule to Assign Roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict Access to Secure Content

To restrict secure content to users with a role of `admin`, subscribe to the `$stateChangeStart` event.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService($rootScope, lock, authManager) {

    $rootScope.$on('$stateChangeStart', function(event, nextRoute) {
      if (nextRoute.controller === 'AdminController') {
        if (!isAdmin()) {
          alert('You are not allowed to see the Admin content');
          return event.preventDefault();
        }
      }
    });

    function isAdmin() {
      return userProfile && userProfile.app_metadata
        && userProfile.app_metadata.roles
        && userProfile.app_metadata.roles.indexOf('admin') > -1;
    }
  }

})();
```

Now you can create content that should only be visible to those with a role of `admin`.

```html
<!-- components/admin/admin.html -->

<h2>Admin</h2>
<p>You are viewing this because you are logged in and you have 'admin' role</p>
```

Every time the `$stateChangeStart` event fires, a check is done to determine whether the user is an `admin` using a new `isAdmin` function added to the `authService`. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin`.


> **Note:** Users have no control over their own `app_metadata`, so there is no risk of a user modifying their own access level in Auth0. Keep in mind, however, that the payload of a JSON Web Token can be modified in debuggers such as [jwt.io](https://jwt.io). If a user does this, their JWT will be invalidated and become unusable for accessing server resources; however, the user would be able to access client side routes with a modified payload. Be sure to keep sensitive information out of the client side completely and rely on XHR requests for that information as this will ensure that resources are properly protected.

Now if an user logs in with an email that contains `@example`, they will be allowed access to the `/admin` route.
