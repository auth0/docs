---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 Angular 1.x SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '02-Custom-Login'
}) %>

The previous step explained how you can log users into your application using the Lock Widget. While Lock provides the simplest way to add authentication to your app, you also have the option of creating your own custom user interface if you like. Username/password and social authentication are supported when building a custom UI. If you are using social authentication, the login screen for a particular social provider can be launched directly from the custom UI that you create.

## Add `auth0.js`

To add custom login to your app, you need to use the `auth0.js` library. Add a reference to `auth0.js` in your `index.html`.

```html
<!-- Auth0's JS library -->
<script type="text/javascript" src="bower_components/auth0.js/build/auth0.js"></script>
<!-- auth0-angular -->
<script type="text/javascript" src="bower_components/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

## Implement the Login

In the login view, display a **Username** and **Password** field to allow the user to enter their email address and password, and also display a button which will allow the user to sign in with their Google account.

```html
<!-- components/login/login.html -->
<div id="login-container">
  <form>
    <fieldset>
      <label for="user">User</label>
      <input class="form-control" id="user" type="text" name="username" ng-model="vm.username" />
      <br>
      <label for="password">Password</label>
      <input class="form-control" id="password" type="password" name="password" ng-model="vm.password" />
      <br>
      <button class="btn btn-primary" type="submit" ng-click="vm.login()">Log In</button>
      <button class="btn btn-primary" type="submit" ng-click="vm.signup()">Sign Up</button>
    </fieldset>
  </form>

  <a href="" ng-click="vm.googleLogin()">Log In with Google</a><br/>
</div>
```

Add the `login` and `signup` methods to your controller.

```js
// components/login/login.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('loginController', loginController);

  function loginController(authService) {

    var vm = this;

    vm.authService = authService;

    vm.login = function () {
      authService.login(vm.username, vm.password, function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };

    vm.signup = function () {
      authService.signup(vm.username, vm.password, function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };

    vm.googleLogin = function () {
      authService.googleLogin(function (err) {
        if (err) {
          console.log("something went wrong: " + err.message);
        }
      });
    };
  }

})();
```

Change the `authService` to sign the user in with the supplied `username` and `password` fields, or alternatively launch the Google login dialog when the user clicks on the **Log In with Google** button. Be sure to inject `angularAuth0` into the service.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService($location, angularAuth0, authManager) {

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

Notice that in the `authenticateAndGetProfile` method (which is called when a user successfully authenticates) the `profile` and `token` values are saved to the local storage. These values can be retrieved from the local storage at a later stage, for example when you want to display the user's profile information.

Register the `authenticateAndGetProfile` in `app.run.js` so that authentication results get processed after login.

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(function (authService) {

      // Process the auth token if it exists and fetch the profile
      authService.authenticateAndGetProfile();
    });

})();
```
