---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users and use those claims to authorize or deny a user to access secure content in the app
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '06-Authorization',
  pkgFilePath: '06-Authorization/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

<%= include('../../_includes/_signup') %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/native/ionic/05-rules' }) %>

## Create a Rule to Assign Roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict Access to Secure Content

To restrict secure content to users with a role of `admin`, start by providing a function in any controller which checks the role. The `auth.isAdmin` function in this example will be defined later.

```js
// www/components/home/home.controller.js
 
// Restrict access to secure content
function showAdminContent() {

  if (auth.isAdmin()) {

    // Secure content

  } else {

    // Non-secure content

  }

  // common content

}
```

Add the `showAdminContent` method to `HomeController`.

```js
// www/components/home/home.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope', '$ionicPopup'];

  function HomeController($state, authService, $scope, $ionicPopup) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.showAdminContent = showAdminContent;

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

    // Restrict access to secure content
    function showAdminContent() {

      var popup = {};

      if (authService.isAdmin()) {

        // Secure content

        popup = {
          title: 'Congratulations!',
          template: 'You are viewing this because you are logged in and you have \'admin\' role'
        };

      } else {

        // Non-secure content

        popup = {
          title: 'Unauthorized',
          template: 'You are not allowed to see this content'
        };

      }

      // common content

      $ionicPopup.alert(popup);
    }

  }

}());
```

Create a new `Show Admin Content` item in the `home` template:

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
          <span ng-if="vm.profile.country" class="additional-info">Country (added by rule): <strong>{{ vm.profile.country }}</strong></span>
        </div>
        <!-- Show Admin Content item -->
        <a class="item" ng-click="vm.showAdminContent()">
          Show Admin Content
        </a>
        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>
      </div>
    </div>
  </ion-content>
</ion-view>
```

The `showAdminContent` method checks if the user is an admin using a new `isAdmin` function added to the `authService`. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin`.


```js
// www/components/auth/auth.service.js
(function() {

	...

  function authService($rootScope, lock, authManager, jwtHelper, $q) {

    ...

    function isAdmin() {
      return userProfile && userProfile.app_metadata
        && userProfile.app_metadata.roles
        && userProfile.app_metadata.roles.indexOf('admin') > -1;
    }

    return {
      
		...

      isAdmin: isAdmin

    }
  }
})();
```

Now if an user logs in with an email that contains `@example`, they will be see a popup informing them that they are authorized.

<div class="phone-mockup">
  <img src="/media/articles/native-platforms/ionic/image_authorization1.png" alt="Mobile example screenshot"/>
</div>
