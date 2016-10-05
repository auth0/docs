## Step 2: Add Configuration for Your App

This guide assumes that you are using Angular Router in your application, but you are free to use UI Router if you wish.

#### Note About HTML5 Mode and ngRouter

If you are using HTML5 mode by setting `$locationProvider.html5Mode(true)`, add a hash to your `<base>` tag.

```html
  <base href="/#">
```

If you are using ngRouter in your Angular app, you do not need use `lock.interceptHash()`.

Inject the modules necessary for the application, including **angular-lock** and **angular-jwt**. Add configuration for an **angular-lock** instance with your application's client ID and domain using the `lockProvider`.

```js
// app.js
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
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
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