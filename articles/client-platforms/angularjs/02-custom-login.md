---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 Angular 1.x SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '02-Custom-Login'
}) %>

The previous step explained how you can log users into your application using the [Lock Widget](/libraries/lock). While Lock provides the simplest way to add authentication to your app, you also have the option of creating your own custom user interface.

::: panel-info Version Requirements
This quickstart and the accompanying sample demonstrate custom login with auth0.js version 8 and angular-auth0 version 2. If you are using auth0.js version 7, please see the [reference guide](/libraries/auth0js/v7) for the library, as well as the [legacy AngularJS custom login sample](https://github.com/auth0-samples/auth0-angularjs-sample/tree/auth0js-v7/02-Custom-Login).

Auth0.js version 8 verifies ID tokens during authentication transactions. Only tokens which are signed with the RS256 algorithm can be verified on the client side, meaning that your Auth0 client must be configured to sign tokens with RS256. See the [auth0.js migration guide](/libraries/auth0js/migration-guide#switching-from-hs256-to-rs256) for more details.
:::

## Add auth0.js

To implement a custom login screen, the **auth0.js** library and **angular-auth0** wrapper are required. Install these packages, along with angular-jwt, and add them to your project.

```bash
bower install angular-auth0#2.0.0-beta.1 angular-jwt
```

```html
<!-- auth0.js -->
<script type="text/javascript" src="bower_components/auth0.js/build/auth0.js"></script>
<!-- auth0-angular -->
<script type="text/javascript" src="bower_components/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

## Initialize angular-auth0

To make use of auth0.js, angular-auth0 must be initialized in the application's `config` block. This is where the `domain` and `clientID` for your application are set.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($locationProvider, angularAuth0Provider, jwtOptionsProvider) {
    // ...

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      responseType: 'token id_token',
      redirectUri: window.location.href
    });

    // Configure a tokenGetter so that the isAuthenticated
    // method from angular-jwt can be used
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });

    // Remove the ! from the hash so that
    // auth0.js can properly parse it
    $locationProvider.hashPrefix('');
  }

})();
```

To make use of the `isAuthenticated` method from angular-jwt, a `tokenGetter` needs to be configured on `jwtOptionsProvider`. This method will be useful later for determining whether or not users are currently authenticated so that various elements can be conditionally hidden or shown.

> **Note:** As of AngularJS 1.6, the default hash prefix is `!`. This prefix creates issues when auth0.js parses the hash. The snippet above demonstrates how to set the hash prefix to an empty string.

## Implement the Login Screen

A `login` controller and view can be used to take user input and make calls to an authentication service with that input.

Create a `login` controller and bind the `authService` (implemented below) to `vm.auth`.

```js
// components/login/login.controller.js

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

Create a `login` view with **username** and **password** `input` elements to allow users to enter their email address and password. You may also display a control to allow users to log in with their Google account. The `vm.username` and `vm.password` values should be passed to the `login` and `signup` method calls from the `authService`.

```html
<!-- components/login/login.html -->

<div id="login-container">
  <form>
    
    <div class="form-group">
      <label for="user">Username</label>
      <input
        class="form-control"
        id="username"
        type="text"
        name="username"
        ng-model="vm.username"
        ng-disabled="vm.loading"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        class="form-control"
        id="password"
        type="password"
        name="password"
        ng-model="vm.password"
        ng-disabled="vm.loading"
      />
    </div>

    <button
      class="btn btn-primary"
      type="submit"
      ng-disabled="vm.loading"
      ng-click="vm.auth.login(vm.username, vm.password)">
        Log In
    </button>
    <button 
      class="btn btn-primary"
      type="submit"
      ng-disabled="vm.loading"
      ng-click="vm.auth.signup(vm.username, vm.password)">
        Sign Up
    </button>

    <div>
      <a href="javascript:;" ng-click="vm.auth.loginWithGoogle()">
        Log In with Google
      </a>
    </div>
  </form>

</div>
```

The `authService` is the place where all the calls to angular-auth0, and thus to auth0.js, are made. The service requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions. These methods are called from the `login` view above.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', 'authManager'];

  function authService($state, angularAuth0, authManager) {

    function login(username, password) {
      angularAuth0.client.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password,
      }, function(err, authResult) {
        if (err) alert(err.description);
        if (authResult && authResult.idToken) {
          setUser(authResult);
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
    
    function handleParseHash() {
      angularAuth0.parseHash(function(err, authResult) {
        if (err) {
          console.log(err);
        }
        if (authResult && authResult.idToken) {
          setUser(authResult);
        }
      });
    }

    function logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
    }

    function setUser(authResult) {
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
    }

    function isAuthenticated() {
      return authManager.isAuthenticated();
    }

    return {
      login: login,
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      handleParseHash: handleParseHash,
      logout: logout,
      isAuthenticated: isAuthenticated
    }
  }
})();
```

The service has several other utility methods that are necessary to complete authentication transactions.

* The `handleParseHash` method is necessary for redirect-based authentication transactions which, in this example, include `signup` and `loginWithGoogle`. This method needs to be called when the app starts so that the authentication result (which comes back in the hash of a redirection) is properly handled.
* The `logout` method removes the user's tokens from local storage which effectively logs them out of the application.
* The `setUser` method takes an authentication result object and sets the access token and ID token values into local storage
* The `isAuthenticated` method checks for the user's authentication state based on the `id_token`'s expiry time.

The `handleParseHash` method needs to be called in the application's `run` block.

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(function (authService) {
      // Handle the authentication
      // result in the hash
      authService.handleParseHash();
    });

})();
```
