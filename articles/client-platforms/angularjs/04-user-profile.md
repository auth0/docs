---
title: User Profile
description: This tutorial demonstrates how to display the user's profile
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '04-User-Profile
}) %>

You can obtain a user's profile from the `getProfile()` method.

## Accessing the User's Profile with `lock.getProfile()`

At any given time, you can call `getProfile` on `lock` passing in a token and callback function.

```js
/* ===== components/auth/auth.service.js ===== */
(function () {

  function authService($rootScope, lock, authManager, jwtHelper, $q) {

    ...
   
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
        });

      });
    }
	
  }
})();
```

We are storing the `profile` in Local storage in the success callback. Once that is done, all that is needed is to retrieve the profile from local storage at a later stage. An example can be found in the `HomeController`:

```js
/* ===== components/home/home.controller.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService'];

  function HomeController(authService) {

    var vm = this;
    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
      vm.profile = profile;
    });

  }

}());
```

We get the user profile using the `getProfileDeferred()` method which implemented in `authService` service:

```js
/* ===== components/auth/auth.service.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper', '$q'];

  function authService($rootScope, lock, authManager, jwtHelper, $q) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      deferredProfile = $q.defer();
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = null;
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
        });

      });
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh,
      getProfileDeferred: getProfileDeferred
    }
  }
})();
```

Once the profile is retrieved you can bind it to the view:

```html
<!-- ===== components/home/home.html ===== -->
<div class="jumbotron">
  <h2 class="text-center"><img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"></h2>
  <h2 class="text-center">Home</h2>
  <div class="text-center" ng-if="!isAuthenticated">
    <p>You are not yet authenticated. <a href="#/login">Log in.</a></p>
  </div>
  <div class="text-center" ng-if="isAuthenticated">
    <h2>Welcome, {{ vm.profile.nickname }}</h2>
    <img ng-src="{{ vm.profile.picture }}">
  </div>
</div>
```
