---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 Angular 1.x SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '02-Custom-Login
}) %>


The previous step explained how you can log users into your application using the Lock Widget. You do not have to use Lock, and can instead create a custom login page and log the user in using a username and password they supply through a customer user interface.

If you are using social logins, you can also launch the login screen for a particular social login provider directly from your Angular 1.x application.

## Update References

The custom login uses the Auth0.js library to sign a user in, so you should therefor reference this library instead of the Lock widget in your `index.html`. Replace the existing reference to `lib/auth0-lock/build/auth0-lock.js` with `lib/auth0.js/build/auth0.js`:

```html
<!-- Auth0's JS library -->
<script type="text/javascript" src="bower_components/auth0.js/build/auth0.js"></script>
<!-- auth0-angular -->
<script type="text/javascript" src="bower_components/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

## Implement the Login

For the login view you must display a Username and Password field to allow the user to sign in with their email address and password, and also display a button which will allow the user to sign in with their Google account.

Go ahead and update your `login.html` you did in Step 1:

```html
<!-- components/login/login.html -->
<div class="jumbotron">
  <h2 class="text-center"><img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"></h2>
  <h2 class="text-center">Login</h2>
  <p class="text-center">{{message}}</p>
</div>

<div class="container">
  <div class="col-md-3">
    <div id="login-container">
      <form>
        <fieldset>
          <label for="user">User</label>
          <input class="form-control" id="user" type="text" name="user" ng-model="user" ng-disabled="loading"/>
          <br>
          <label for="password">Password</label>
          <input class="form-control" id="password" type="password" name="pass" ng-model="pass" ng-disabled="loading"/>
          <br>
          <button class="btn btn-primary" type="submit" ng-disabled="loading" ng-click="login()">Login</button>
          <button class="btn btn-primary" type="submit" ng-disabled="loading" ng-click="signup()">Sign Up</button>
        </fieldset>
      </form>

      <a href="" ng-click="googleLogin()">Login with Google</a><br/>
    </div>
  </div>
</div>
```

And `login.controller.js`:

```js
// components/login/login.controller.js
(function () {

  'use strict';

  angular
    .module('app')
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', 'authService'];

  function loginController($scope, authService) {

    // Put the authService on $scope to access
    // the login method in the view
    $scope.authService = authService;

    $scope.login = function () {
      // Show loading indicator
      $scope.message = 'loading...';
      $scope.loading = true;
      authService.login($scope.user, $scope.pass, function (err) {
        if (err) {
          $scope.message = "something went wrong: " + err.message;
          $scope.loading = false;
        }
      });
    };

    $scope.signup = function () {
      // Show loading indicator
      $scope.message = 'loading...';
      $scope.loading = true;
      authService.signup($scope.user, $scope.pass, function (err) {
        if (err) {
          $scope.message = "something went wrong: " + err.message;
          $scope.loading = false;
        }
      });
    };

    $scope.googleLogin = function () {
      $scope.message = 'loading...';
      $scope.loading = true;

      authService.googleLogin(function (err) {
        if (err) {
          $scope.message = "something went wrong: " + err.message;
          $scope.loading = false;
        }
      });
    };
  }

})();
```

Also change the `AuthService` to sign the user in with the supplied `username` and `password` fields, or alternatively launch the Google login dialog when the user clicks on the **Login with Google** button:

```js
// components/auth/auth.service.js
(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['angularAuth0', 'authManager', '$location'];

  function authService(angularAuth0, authManager, $location) {

    function login(username, password, callback) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password,
      }, callback);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
    }

    function googleLogin(callback) {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token'
      }, callback);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
        angularAuth0.getProfile(result.idToken, function (error, profileData) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profileData));
          $location.path('/');
        });
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }
    
    return {
      login: login,
      logout: logout,
      authenticateAndGetProfile: authenticateAndGetProfile,
      signup: signup,
      googleLogin: googleLogin
    }
  }
})();
```

Notice that in the `authenticateAndGetProfile` method, which is called when a user successfully authenticates, the `profile` and `token` values are saved to the local storage. These values can be retrieved from the local storage at a later stage, for example when you want to display the user's profile information which will be done in Step 4. 
