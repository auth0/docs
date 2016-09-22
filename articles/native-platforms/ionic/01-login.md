---
title: Login
description: This tutorial will show you how to use the Auth0 Ionic SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ionic 1.3.1
:::

<%= include('../../_includes/_signup') %>

::: panel-info Running the Sample
At any point in time you can run this sample by going to the `01-Login` folder of the sample project and running `ionic serve`
:::

### 0. Create Auth0 service

The best way to have authentication utilities available across the application is to use an injectable service.
Notice the `authenticated` success callback which will store the `profile` and `idToken` in the Local Storage. These values can be retrieved at a later stage, for example when you want to display the user's profile which will be done in Step 3.

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper'];

  function authService($rootScope, lock, authManager, jwtHelper) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        console.log('authenticated');
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.hide();

        // Redirect to default page
        location.hash = '#/';

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));

        });
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
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh
    }
  }
})();

```

### 1. Add the module dependencies and configure the service

Add the `auth0.lock` and `angular-jwt` module dependencies to your angular app definition and configure the `Lock widget` by calling the `init` method of the `lockProvider`.

```js
/* ===== www/app.js ===== */
(function () {

  'use strict';

  angular
    .module('app', ['ionic', 'auth0.lock', 'angular-jwt'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'lockProvider', 'jwtOptionsProvider'];

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        }
      }
    });

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  }

})();
```

Add a call to `authService.registerAuthenticationListener()` in the `$ionicPlatform.ready` callback function and add `authService.checkAuthOnRefresh()` method as a trigger on `$locationChangeStart` event.
Also you will need call `authService.checkAuthOnRefresh()` before Ionic platform will be ready, to check user authenticated status at the application startup.

```js
/* ===== www/app.run.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform', '$rootScope', 'authService'];

  function run($ionicPlatform, $rootScope, authService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      //This event gets triggered on URL change
      $rootScope.$on('$locationChangeStart', authService.checkAuthOnRefresh);

    });

    // Check is the user authenticated before Ionic platform is ready
    authService.checkAuthOnRefresh();
  }

})();

```

### 2. Implement the login

To implement the login, you must add a Login Controller. Be sure to inject the `authService` service into the controller, and then call the `login` method to display the Login / Signup screen:

```js
/* ===== www/components/login/login.controller.js ===== */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authService'];

  function LoginController($state, authService) {
    var vm = this;

    function doLogin() {
      authService.login();
    }

    doLogin();
  }

} ());
```

The code sample above defines a `LoginController` controller which has a `doLogin()` function that gets called when the controller gets instantiated. This `doLogin()` function initializes Lock by calling the `login()` method.


Next we will need to create the view for this controller:

```html
<!-- ===== www/components/login/login.html ===== -->
<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="center">
    <div class="row">
      <div class="col"></div>
    <div>
  </ion-content>
</ion-view>

```

The view simply contains an `ion-view` component and inside that we have a `div` tag.  

Lastly you must add the state for the login to the State Provider. Head back to the `app.js` file, and in the `config` method be sure to add the state for the `/login` path:

```js
/* ===== www/app.js ===== */

(function () {

	...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

   ...
  }

})();

```

### 3. Implement a Logout button

To log the user out you simply need to call the `unauthenticate` method of `authManager`. Remember to also clear the information from the Local Storage. In the example below we have add a `logout` method to the `authService`:

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

	...

  function authService($rootScope, lock, authManager, jwtHelper) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

	...

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    ...

    return {
      ...
	  
      logout: logout,
	  
      ...
    }
  }
})();

```

Remember to also add a Logout button which calls this function. In our example we call this function from `HomeController`, so in our `home.html` file we add a logout button.

```html
<!-- ===== www/components/home/home.html ===== -->
<button class="button button-full button-dark" ng-click="vm.logout()">
  Log Out
</button>
```

### 4. Keep the user logged in after app switching

When the user exits your app, the mobile OS (iOS or Android) may unload your app at will to recover some RAM.

We already saved the user profile and tokens into `localStorage`. We just need to check for their existence and, if possible, fetch them when your app loads and let `authManager` know that the user is already authenticated.

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

	...

  function authService($rootScope, lock, authManager, jwtHelper) {

	...

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
      ...
	  
      checkAuthOnRefresh: checkAuthOnRefresh
    }
  }
})();

```

