---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to your application.
budicon: 546
github:
  path: 04-Authorization
---

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `angularAuth0` Configuration

Add a local variable to `app/app.js` and initialize it with all the scopes you want to request when users log in.

Use that variable to set the scopes in the `angularAuth0Provider` initialization.

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

## Conditionally Display UI Elements

You can use the `userHasScopes` method with the `isAuthenticated` method to show and hide certain UI elements.

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

You may want to give access to some routes in your application only to authenticated users. If you are using UI Router v1, you can check if the user is authenticated with the `onEnter` hook for a specific state.

Define a function that uses the `authService` service to check if the user is authenticated. If the user is not authenticated, they are redirected to the home route. Use this function in the `onEnter` hook for any states you want to protect.

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

::: note
In this example, when an unauthenticated user tries to access the `/ping` route, they are redirected to the `/home` route.
:::

### Limit Route Access Based on Scopes

You can use the `onEnter` hook to prevent access to client-side routes based on scopes. Call a `checkForScopes` function that passes the scope you choose to the `userHasScopes` function from the `authService` service.

If the user does not have the `write:messages` scope, they are redirected to the main route.

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

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>
