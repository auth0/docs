---
title: Login
description: This tutorial will show you how to use the Auth0 Angular SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/auth0.variables.js',
  pkgType: 'replace'
}) %>


### 0. Create Auth0 service

The best way to have authentication utilities available across the application is to use an injectable service.
Notice the `authenticated` success callback which will store the `id_token` in the Local Storage. This value can be retrieved at a later stage.

```js
/* ===== components/auth/auth.service.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager'];

  function authService(lock, authManager) {

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})();
```

### 1. Add the module dependencies and configure the service

Add the `auth0.lock`, `angular-jwt` and `ui.router` module dependencies to your angular app definition and configure the `Lock widget` by calling the `init` method of the `lockProvider`.

```js
/* ===== app.js ===== */
(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
```

Add a call to `authService.registerAuthenticationListener()` and to `lock.interceptHash()` in the `run` method.

```js
/* ===== app.run.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock'];

  function run($rootScope, authService, lock) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    //Register the synchronous hash parser
    lock.interceptHash();
  }

})();
```

### 2. Implement the login

To implement the login, you must add a Login Controller. Be sure to inject the `authService` service into the controller.

```js
/* ===== components/login/login.controller.js ===== */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController(authService) {

    var vm = this;
    vm.authService = authService;

  }

}());
```

Next we will need to create the view for this controller:

```html
<!-- ===== components/login/login.html ===== -->
<div class="jumbotron">
  <h2 class="text-center"><img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"></h2>
  <h2 class="text-center">Login</h2>
  <div class="text-center">
    <button class="btn btn-primary" ng-click="vm.authService.login()">Log In</button>
  </div>
</div>
```

Lastly you must add the state for the login to the `$stateProvider`. Head back to the `app.js` file, and in the `config` method be sure to add the state for the `/login` path:

```js
/* ===== app.js ===== */

(function () {

	...

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      });

    ...
	
  }

})();
```

### 3. Implement a Logout button

To log the user out you simply need to call the `unauthenticate` method of `authManager`. Remember to also clear the information from the Local Storage. In the example below we have add a `logout` method to the `authService`:

```js
/* ===== components/auth/auth.service.js ===== */
(function () {

	...

  function authService(lock, authManager) {

    ...

    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
    }
	
	...

  }
})();
```

Remember to also add a Logout button which calls this function. In our example we call this function from `HomeController`, so in our `home.html` file we add a logout button.

```html
<!-- ===== components/home/home.html ===== -->
...

  <div class="text-center" ng-if="isAuthenticated">
    <p>Thank you for logging in! <a href="javascript:;" ng-click="vm.authService.logout()">Log out.</a></p>
  </div>
  
...
```