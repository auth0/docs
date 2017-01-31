---
title: Custom Login
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your Ionic app
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ionic-samples',
  path: '02-Custom-Login',
  requirements: [
    'Ionic 1.3.1'
  ]
}) %>

The previous step explained how you can log users into your application using the Lock Widget. You do not necessarily need to use Lock, instead, you can create a custom login page and UI if you wish.

If you are using social logins, you can also launch the login screen for a particular social login provider directly from your Ionic application.

## Add auth0.js

To implement a custom login screen, the **auth0.js** library and **angular-auth0** wrapper are required. Install these packages, along with angular-jwt, and add them to your project.

```bash
bower install auth0.js#7.6.1 angular-auth0#1.0.6 angular-jwt
```

```html
<!-- auth0.js library -->
<script src="lib/auth0.js/build/auth0.js"></script>
<!-- angular-auth0 -->
<script src="lib/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.js"></script>
```

## Implement the Login

For the login view, you must display fields for **Username** and **Password**, along with a **Login** to allow users to log in with their email address. For social login, a single button can be supplied.

```html
<!-- www/components/login/login.html -->

<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="padding">
    <div class="list list-inset">
      <label class="item item-input">
        <input type="text" placeholder="Username" ng-model="vm.username">
      </label>
      <label class="item item-input">
        <input type="password" placeholder="Password" ng-model="vm.password">
      </label>
    </div>
    <button class="button button-block button-calm" ng-click="vm.login()">Login</button>
    <button class="button button-block button-calm" ng-click="vm.signup()">Signup</button>
    <button class="button button-block button-google icon ion-social-googleplus-outline" ng-click="vm.loginWithGoogle()">
      Login with Google
    </button>
  </ion-content>
</ion-view>
```

This view is calling a `login` and `loginWithGoogle` which should be defined in the controller.

```js
// www/components/login/login.controller.js

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['authService'];

  function LoginController(authService) {
    var vm = this;

    vm.login = login;
    vm.signup = signup;
    vm.loginWithGoogle = authService.loginWithGoogle;    

    // Log in with username and password
    function login() {
      authService.login(vm.username, vm.password);
    }

    function signup() {
      authService.signup(vm.username, vm.password);
    }

  }

})();
```

The `AuthService` needs to be adjusted to accept the supplied `username` and `password` values, or alternatively launch the Google login dialog when the user taps on the **Login with Google** button.

```js
//  www/components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'angularAuth0', 'authManager', 'jwtHelper', '$location', '$ionicPopup'];

  function authService($rootScope, angularAuth0, authManager, jwtHelper, $location, $ionicPopup) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login(username, password) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        ppopup: true,
        email: username,
        password: password
      }, onAuthenticated, null);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        popup: true,
        email: username,
        password: password
      }, onAuthenticated, null);
    }

    function loginWithGoogle() {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token',
        popup: true
      }, onAuthenticated, null);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        onAuthenticated(null, result);
      } else if (result && result.error) {
        onAuthenticated(result.error);
      }
    }

    function onAuthenticated(error, authResult) {
      if (error) {
        return $ionicPopup.alert({
          title: 'Login failed!',
          template: error
        });
      }

      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      angularAuth0.getProfile(authResult.idToken, function (error, profileData) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profileData));
        userProfile = profileData;

        $location.path('/');
      });
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
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      checkAuthOnRefresh: checkAuthOnRefresh,
      authenticateAndGetProfile: authenticateAndGetProfile
    }
  }
})();

```

Notice that in the `onAuthenticated` method, which is called when a user successfully authenticates, the `profile` and `token` values are saved to the local storage. These values can be retrieved from local storage at a later stage, such as when you want to display the user's profile information.

The `authenticateAndGetProfile` method should be called in the application's `run` block so that it is triggered when the user logs in or signs up.

```js
// www/app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform', 'authService'];

  function run($ionicPlatform, authService) {

    $ionicPlatform.ready(function () {
      if (window.t && window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      // Use the authManager from angular-jwt to check for
      // the user's authentication state when the page is
      // refreshed and maintain authentication
      authService.checkAuthOnRefresh();

      // Process the auth token if it exists and fetch the profile
      authService.authenticateAndGetProfile();

    });

  }

})();
```
