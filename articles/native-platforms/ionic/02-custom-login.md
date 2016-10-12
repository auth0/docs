---
title: Custom Login
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your Ionic app
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '02-Custom-Login',
  pkgFilePath: '02-Custom-Login/www/auth0.variables.js',
  pkgType: 'replace'
}) %>



The previous step explained how you can log users into your application using the Lock Widget. You do not need to use Lock, and can instead create a custom login page and UI if you wish.

If you are using social logins, you can also launch the login screen for a particular social login provider directly from your Ionic application.

## Update References

The custom login uses the `auth0.js` library, so it needs to be referenced instead of the Lock widget in your `index.html`. Replace the existing reference to `lib/auth0-lock/build/auth0-lock.js` with `lib/auth0.js/build/auth0.js`.

```html
<!-- Auth0's JS library -->
<script src="lib/auth0.js/build/auth0.js"></script>
<!-- auth0-angular -->
<script src="lib/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.js"></script>
```

## Implement the Login

For the login view, you must display fields for **Username** and **Password**, along with a **Login** to allow users to log in with their email address. For social login, a signle button can be supplied. 

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
    vm.loginWithGoogle = authService.loginWithGoogle;

    // Log in with username and password
    function login() {
      authService.login(vm.username, vm.password);
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
        email: username,
        password: password
      }, onAuthenticated, null);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
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
          template: 'Please check your credentials!'
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
