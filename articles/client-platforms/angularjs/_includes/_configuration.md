## Add the Module Dependencies and Configure the Service

Add the `auth0.lock`, `angular-jwt` and `ui.router` module dependencies to your Angular app definition and configure the Lock widget by calling the `init` method on `lockProvider`. This is where your Auth0 client ID and domain can be set up.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}'
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
```

Add a call to `authService.registerAuthenticationListener()` and to `lock.interceptHash()` in the `run` block of your application.

```js
// app.run.js

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

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();
  }

})();
```