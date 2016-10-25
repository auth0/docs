---
title: Session Handling
description: This tutorial demonstrates how to integrate Auth0 with Angular 1.x to add session handling and logout to your web app.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '03-Session-Handling'
}) %>

In the previous steps, we enabled user login with the `Lock` widget and then with a custom UI using `auth0.js`. In this step, we will create a session for the user.

## Create a Session

Once the user is authenticated, we need to create a client-side session for them so that our Angular app knows that they are currently authenticated. To do this, we need to store the user's `id_token` in their browser, which is what we did in the [login](/quickstart/spa/angularjs/01-login) step.

> **NOTE**: This example uses `localStorage`, but you can use any storage library, including [angular-storage](https://github.com/auth0/angular-storage).

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(lock, authManager) {
    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });
    }
  });

})();

```

## Check Authentication State on Page Refresh

After the user authenticates, we call `authManager.authenticate()` which sets an application-wide flag to indicate that the user is logged in. However, when the page is refreshed, this state will be lost. To check if a user is authenticated on page refresh, we can use the `authManager.checkAuthOnRefresh()` method from **angular-jwt**. This allows us to check whether the user's JWT is expired or not. Since JWT is a __stateless__ manner of implementing user authentication, the best way to know if the user should be regarded as authenticated on the front end is to know whether the token they are holding is expired or unexpired.

```js
// app.run.js

(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  function run($rootScope, authService, lock, authManager) {
    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

  }

})();
```

Since the storage mechanism that you use for storing tokens on the front end is at your discretion, the **angular-jwt** library needs to know how to retrieve them. This is done by providing a function which returns the token, and it is this function that is used when `authManager.checkAuthOnRefresh` is called. Setup the `jwtOptionsProvider` in `app.js` with your `tokenGetter` function.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {
    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      }
    });
  }

})();
```

Now when the page is refreshed, the user's JWT will be checked for whether it is expired or not. If it isn't expired, the user will be regarded as authenticated.
