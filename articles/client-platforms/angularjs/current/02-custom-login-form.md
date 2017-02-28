---
title: Custom Login Form
description: This tutorial demonstrates how to add a custom login form to an AngularJS application with Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '02-Custom-Login-Form',
  requirements: [
    'Angular 1.6'
  ]
}) %>

<%= include('../_includes/_custom_login_preamble') %>

## Create a Login Route

Create a controller and view to house the logiin form that should be used for your custom UI. In this example, the logic for all authentication transactions will be handled from the `authService`, which means the `LoginController` only needs to inject that service.

```js
// app/login/login.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('LoginController', loginController);

  loginController.$inject = ['authService'];

  function loginController(authService) {

    var vm = this;
    vm.auth = authService;

  }

})();
```

## Implement the Login Screen

Create a template with a `form` which allows users to pass in their email and password. This example will not make full use of Angular's form features, but rather will simply use template variables on the username and password inputs. The values from those inputs will be passed into the methods called on the Log In and Sign Up button's `ng-click`s. You may also supply a button to trigger social authentication.

```html
<!-- app/login.component.html -->

<div>
  <div class="row">
    <div class="col-sm-6">
      <h2>Username/Password Authentication</h2>

      <form>
        <div class="form-group">
          <label for="name">Email</label>
          <input
            type="email"
            class="form-control"
            ng-model="email"
            placeholder="Enter your email">
        </div>

        <div class="form-group">
          <label for="name">Password</label>
          <input
            type="password"
            class="form-control"
            ng-model="password"
            placeholder="Enter your password">
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          ng-click="vm.auth.login(email, password)">
            Log In
        </button>

        <button
          type="submit"
          class="btn btn-primary"
          ng-click="vm.auth.signup(email, password)">
            Sign Up
        </button>
      </form>

    </div>

    <div class="col-sm-6">
      <h2>Social Authentication</h2>

      <button
        type="submit"
        class="btn btn-default btn-danger"
        ng-click="vm.auth.loginWithGoogle()">
          Log In with Google
      </button>

    </div>
  </div>
</div>
```

## Create an Authentication Service

All authentication transactions should be handled from an injectable service. The service requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions. These methods are called from the `login` template above.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL for your client. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `client.login` method. Since `client.login` is an XHR-based transaction, the authentication result is handled in a callback and the `setSession` method is called to set the user's `access_token`, `id_token`, and `access_token` expiry time in local storage if the transaction is successful.

The `signup` method is a redirect-based flow and the authentication result is handled by the `handleAuthentication` method. This method looks for an `access_token` and `id_token` in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the user is redirected to the home route.

```js
// app/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout'];

  function authService($state, angularAuth0, $timeout) {

    function login(username, password) {
      angularAuth0.client.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      }, function(err, authResult) {
        if (err) alert(err);
        if (authResult && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        }
      });
    }

    function signup(username, password) {
      angularAuth0.redirect.signupAndLogin({
        connection: 'Username-Password-Authentication',
        email: username,
        password: password
      });
    }

    function loginWithGoogle() {
      angularAuth0.authorize({
        connection: 'google-oauth2'
      });
    }
    
    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function() {
            $state.go('home');
          });
          alert('Error: ' + err.error);
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
    
    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }
    
    function isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
```

The service has several other utility methods that are necessary to complete authentication transactions.

<%= include('../_includes/_custom_login_method_description') %>

The `handleAuthentication` method needs to be called in the application's `run` block.

```js
// app/app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['authService'];
    
  function run(authService) {
    // Handle the authentication
    // result in the hash
    authService.handleAuthentication();
  }

})();
```