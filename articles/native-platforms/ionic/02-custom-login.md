---
title: Custom Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
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

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `02-Custom-Login` folder of the sample project and running `ionic serve`
:::

The previous step explained how you can log users into your application using the Lock Widget. You do not have to use Lock, and can instead create a custom login page and log the user in using a username and password they supply through a customer user interface.

If you are using social logins, you can also launch the login screen for a particular social login provider directly from your Ionic application.

### 1. Update references

The custom login uses the Auth0.js library to sign a user in, so you should therefor reference this library instead of the Lock widget in your `index.html`. Replace the existing reference to `lib/auth0-lock/build/auth0-lock.js` with `lib/auth0.js/build/auth0.js`:

```html
<!-- Auth0's JS library -->
<script src="lib/auth0.js/build/auth0.js"></script>
<!-- auth0-angular -->
<script src="lib/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script src="lib/angular-jwt/dist/angular-jwt.js"></script>
```

### 2. Implement the login

For the login view you must display a Username and Password field to allow the user to sign in with their email address and password, and also display a button which will allow the user to sign in with their Google account.

Go ahead and update your `login.html` you did in Step 1:

```html
<!-- ===== www/components/login/login.html ===== -->
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

And `login.controller.js`:

```js
/* ===== www/components/login/login.controller.js ===== */
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

Also change the `AuthService` to sign the user in with the supplied `username` and `password` fields, or alternatively launch the Google login dialog when the user clicks on the **Login with Google** button:

```js
/* ===== www/components/auth/auth.service.js ===== */
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

Notice that in the `onAuthenticated` method, which is called when a user successfully authenticates, the `profile` and `token` values are saved to the local storage. These values can be retrieved from the local storage at a later stage, for example when you want to display the user's profile information which will be done in Step 3. 
