---
title: User Profile
description: This example shows how to display the user's profile
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '03-User-Profile',
  pkgFilePath: '03-User-Profile/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ionic 1.3.1
:::

<%= include('../../_includes/_signup') %>

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `03-Custom-Login` folder of the sample project and running `ionic serve`
:::

You can access obtain a user's profile from the `getProfile()` method.

### Accessing user profile with `lock.getProfile()`

At any given time, you can call `getProfile` on `lock` passing in a token and callback function.

```js
/* ===== www/components/auth/auth.service.js ===== */
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

As you can see we are storing the `profile` in Local storage in the success callback. Once that is done, all you need to do is to retrieve the profile from Localstorage at a later stage. An example can be found in the `HomeController`:

```js
/* ===== www/components/home/home.controller.js ===== */
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

We get the user profile using the `getProfileDeferred()` method which implemented in `authService` service:

```js
/* ===== www/components/auth/auth.service.js ===== */
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

::: panel-info This is info
Note that you must retrieve the profile in the Ionic `beforeEnter` event to ensure it is read everytime the home view is activated. You can read more about View LifeCycle and Events in the [Ionic Documentation](http://ionicframework.com/docs/api/directive/ionView/).
:::

Once the profile is retrieved you can bind it to the view:

```html
<!-- ===== ./www/components/home/home.html ===== -->
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
