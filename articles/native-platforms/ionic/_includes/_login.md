## Create an Auth Service

The best way to have authentication utilities available across the application is to use an **Injectable** service.

You will need an `Auth0Lock` instance to receive your Auth0 credentials and an options object. For a full list of Lock's options, see the [customization docs](/libraries/lock/customization).

Your app will need to listen for Lock's `authenticated` event and have a callback registered to handle authentication. The callback has a single parameter that will have the user's authentication information and it will be invoked once the user is redirected after authenticating.

There is a property on the object that gets returned by Auth0 called `idToken` which is a [JSON Web Token](https://jwt.io/introduction) identifying the user. It is this token that can be used to give an indication in your Angular 2 application that the user is authenticated, and it is also used to access resources from an API.

For now, store the `idToken` attribute into `localStorage`.

In the `login` method, call `lock.show()` to display the login widget.

```js
// www/components/auth/auth.service.js

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

## Add the Lock Widget and angular-jwt

Add the Lock widget and the **angular-jwt** helper library by referencing `auth0.lock` and `angular-jwt` in your application's module definition. To configure the Lock widget, include your application's Client ID and Domain in the `init` method of the `lockProvider`.

```js
// www/app.js

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
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
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
You will also need to call `authService.checkAuthOnRefresh()` before Ionic is ready to check the user's authentication status at startup.

```js
// www/app.run.js

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

## Implement Login

To implement login, add a `LoginController`. Be sure to inject the `authService` service into the controller, and then call the `login` method to display the Login / Signup screen:

```js
// www/components/login/login.controller.js

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

})();
```

The code sample above defines a `LoginController` controller which has a `doLogin()` function that gets called when the controller is instantiated. This `doLogin()` function initializes Lock by calling the `login()` method.

Next, provide a view for the `LoginController`.

```html
<!-- www/components/login/login.html -->

<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="center">
    <div class="row">
      <div class="col"></div>
    <div>
  </ion-content>
</ion-view>

```

This view simply contains an `ion-view` component and inside that we have a `div` tag.

Lastly, configure `stateProvider` in `app.js` with the state responsbile for login.

```js
// www/app.js

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

### 3. Implement a Logout Button

To log the user out, you simply need to call the `unauthenticate` method of `authManager` and clear the user's information from the local storage. This can be done in a `logout` method in the `authService`.

```js
// www/components/auth/auth.service.js

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

A logout button needs to be added to call the `logout` method, and this can be done in the `home` view.

```html
<!-- www/components/home/home.html -->

<button class="button button-full button-dark" ng-click="vm.logout()">
  Log Out
</button>
```

## Keep the User Logged In

When the user exits the app, the mobile OS (iOS or Android) may unload it to recover some RAM.

The user's JWT and profile have already been saved in `localStorage`. To determine whether the user is authenticated on app startup, a check should be made for the JWT and profile when it loads.

```js
// www/components/auth/auth.service.js

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

This method has already been called in the `run` block above.
