---
title: Calling an API
description: This tutorial demonstrates how to add authorization and access control to an AngularJS app with Auth0
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '05-Authorization',
  requirements: [
    'Angular 1.6'
  ]
}) %>

<%= include('../../_includes/_authz_preamble') %>

<%= include('../../_includes/_authz_assigning_role') %>

<%= include('../../_includes/_authz_check_admin_role') %>

Install the **jwt-decode** library so that the user's `id_token` can easily be decoded.

```bash
npm install --save jwt-decode
```

Create methods for checking the user's `role` and whether it is equal to `admin`.

```js
// src/app/auth/auth.service.ts

function getRole() {
  var namespace = 'https://example.com';
  var idToken = localStorage.getItem('id_token');
  if (!idToken) return null;
  return jwt_decode(idToken)[namespace + '/role'] || null;
}

function isAdmin() {
  return getRole() === 'admin';
}
``` 

The `isAdmin` method can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```html
<!-- src/navbar/navbar.html -->

<button
  class="btn btn-primary btn-margin"
  ng-if="vm.auth.isAuthenticated()
  && vm.auth.isAdmin()"
  ui-sref="admin">
    Admin
</button>
```

<%= include('../../_includes/_authz_protect_client_routes') %>

To prevent access to client-side routes based on a `role` completely, mark the routes you wish to protect with a flag of `requiresLogin: true`. To limit route access to users of a certain level, you may include the required `accessLevel`.

```js
// app/app.run.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$httpProvider',
    'lockProvider',
    'jwtOptionsProvider'
  ];

  function config(
    $stateProvider,
    $httpProvider,
    lockProvider,
    jwtOptionsProvider
  ) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: 'app/profile/profile.html',
        controllerAs: 'vm',
        data: {
          requiresLogin: true
        }
      })
      .state('admin', {
        url: '/admin',
        controller: 'AdminController',
        templateUrl: 'app/admin/admin.html',
        controllerAs: 'vm',
        data: { 
          requiresLogin: true,
          accessLevel: 'admin'
        }
      });
    // ...
  }

})();
```

> **Note:** The keys and values in the route definition `data` object are arbitrary. The shape of this information is at your discretion.

Use the `$stateChangeStart` event in your application's `run` block to detect whether the route being requested has requires that the user be authenticated, and whether they need to have a certain role. If those conditions aren't satisfied, you may reroute the user to the main route, or somewhere for them to log in.

```js
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', '$location', 'authService'];
    
  function run($rootScope, $location, authService) {
    // Handle the authentication
    // result in the hash
    authService.handleAuthentication();

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (!toState.data) return;
      
      var isAuthenticated = authService.isAuthenticated();
      var role = authService.getRole();
      var requiresLogin = toState.data.requiresLogin;
      var accessLevel = toState.data.accessLevel;

      if (
        (requiresLogin && !isAuthenticated) ||
        (accessLevel && accessLevel !== role)
      ) {
        $location.path('/');
      }
    });

  }

})();
```

The user will now be redirected to the main route unless they have a `role` of `admin`.

<%= include('../../_includes/_authz_client_routes_disclaimer') %>

<%= include('../../_includes/_authz_api_access_control') %>

```js
// app/app.js

// Initialization for the angular-lock library
lockProvider.init({ ..., options: {
    // ...
    auth: {
      // ...
      params: {
        scope: 'openid profile read:messages'
      }
    }
  }
});
```

<%= include('../../_includes/_authz_api_access_control_end') %>