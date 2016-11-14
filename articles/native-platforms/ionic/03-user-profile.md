---
title: User Profile
description: This example demonstrates how to display the user's profile
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ionic-samples',
  path: '03-User-Profile',
  requirements: [
    'Ionic 1.3.1'
  ]
}) %>


You can obtain a user's profile from the `getProfile()` method.

## Accessing the User's Profile

At any given time, you can call `getProfile` on `lock` passing in a token and callback function.

```js
// www/components/auth/auth.service.js

(function() {
  ...
  function authService($rootScope, lock, authManager, jwtHelper) {
    ...
    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        ...
        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));

        });
        ...
      });
    }
    ...
  }
})();

```

The user's profile is being saved in local storage in the success callback and just needs to be retrieved for use from any place in the applciation. An example can be found in the `HomeController`.

```js
// www/components/home/home.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope'];

  function HomeController($state, authService, $scope) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    $scope.$on("$ionicView.beforeEnter", function() {

      authService.getProfileDeferred().then(function(profile) {
        vm.profile = profile;
      });

    });

    function login() {
      $state.go("login");
    }

    function logout() {
      authService.logout();

      // Clear VM value
      vm.profile = null;
    }

  }

}());
```

The user's profile is retrieved using the `getProfileDeferred()` method which is implemented in the `authService`.

```js
// www/components/auth/auth.service.js

(function() {
  ...
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
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.hide();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));

          // Redirect to default page
          location.hash = '#/';

          deferredProfile.resolve(profile);
        });
      });
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }
    ...
    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh,
      getProfileDeferred: getProfileDeferred
    }
  }
})();

```

> **Note:** You must retrieve the profile in the Ionic `beforeEnter` event to ensure it is read everytime the home view is activated. You can read more about view lifecycle and events in the [Ionic documentation](http://ionicframework.com/docs/api/directive/ionView/).

Once the profile is retrieved it can be bound to the view.

```html
<!-- www/components/home/home.html -->

 <ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <div ng-hide="isAuthenticated">
      <p>Welcome to the Auth0 Ionic Sample! Please log in:</p>
      <button class="button button-full button-positive" ng-click="vm.login()">
        Log In
      </button>
    </div>
    <div ng-show="isAuthenticated">

      <div class="list card">

        <div class="item item-avatar">
          <img src="{{ vm.profile.picture }}">
          <h2>{{ vm.profile.name }}</h2>
        </div>

        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>

      </div>


    </div>
  </ion-content>
</ion-view>
```
