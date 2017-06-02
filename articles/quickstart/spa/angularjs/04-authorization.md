---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to your application
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '04-Authorization',
  requirements: [
    'AngularJS 1.6'
  ]
}) %>

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `angularAuth0` Config

Adjust the `angularAuth0` configuration to use a variable with any `scope`s you would like to request when users log in.

```js
// app/app.js

var REQUESTED_SCOPES = 'openid profile read:messages write:messages';

angularAuth0Provider.init({
  // ...
  scope: REQUESTED_SCOPES
});
``` 

<%= include('../_includes/_authz_set_session') %>

```js
// app/auth/auth.service.js

function setSession(authResult) {
  // ...
  var scopes = authResult.scope || REQUESTED_SCOPES || '';

  localStorage.setItem('scopes', JSON.stringify(scopes));
}
```

<%= include('../_includes/_authz_user_has_scopes') %>

```js
// app/auth/auth.service.js

// ...
function userHasScopes(scopes) {
  var grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
  for (var i = 0; i < scopes.length; i++) {
    if (grantedScopes.indexOf(scopes[i]) < 0) {
      return false;
    }
  }
  return true;
}

return {
  // ...
  userHasScopes: userHasScopes
}
```

## Conditionally Dislay UI Elements

The `userHasScopes` function can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```html
<!-- app/navbar/navbar.html -->

<button
  class="btn btn-primary btn-margin"
  ng-if="vm.auth.isAuthenticated() && vm.auth.userHasScopes(['write:messages'])"
  ui-sref="admin">
    Admin
</button>
```

## Protect Client-Side Routes

For some routes in your application, you may want to only allow access if the user is authenticated. If you are using UI Router v1, this check can be made in the `onEnter` hook for a specific state.

Define a function which uses the `authService` to check whether the user is authenticated and redirects to the home route if they are not. Use this function in the `onEnter` hook for whichever states you wish to protect.

```js
// app/app.js

$stateProvider
  // ...
  .state('ping', {
    url: '/ping',
    controller: 'PingController',
    templateUrl: 'app/ping/ping.html',
    controllerAs: 'vm',
    onEnter: checkAuthentication
  })

// ...

function checkAuthentication($transition$) {
  var $state = $transition$.router.stateService;
  var auth = $transition$.injector().get('authService');
  if (!auth.isAuthenticated()) {
    return $state.target('home');
  }
}
```

In this example, if an unauthenticated user tries to access the `/ping` route, they will be redirected to `/home`.

### Limit Route Access Based on `scope`

To prevent access to client-side routes based on a particular `scope`, continue to use the `onEnter` hook, but call a different function which passes a particular scope to the `userHasScopes` function from the `authService`.

```js
// app/app.js

$stateProvider
  // ...
  .state('admin', {
    url: '/admin',
    controller: 'AdminController',
    templateUrl: 'app/admin/admin.html',
    controllerAs: 'vm',
    onEnter: checkForScopes(['write:messages'])
  })

function checkForScopes(scopes) {
  return function checkAuthentication($transition$) {
    var $state = $transition$.router.stateService;
    var auth = $transition$.injector().get('authService');
    if (!auth.isAuthenticated() || !auth.userHasScopes(scopes)) {
      return $state.target('home');
    }
  }
}
```

The user will now be redirected to the `/home` route unless they have a `scope` of `write:messages`.

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>