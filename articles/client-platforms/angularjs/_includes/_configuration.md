## Step 2: Add Configuration for Your App

This guide assumes that you are using Angular Router in your application, but you are free to use UI Router if you wish.

#### Note About HTML5 Mode and UI Router

If you are using HTML5 mode by setting `$locationProvider.html5Mode(true)`, add a hash to your `<base>` tag.

```html
  <base href="/#">
```

If you are using UI Router in your Angular app, use `lock.interceptHash()` to ensure that the `authenticated` event from Lock is fired.

```js
// app.run.js

(function() {

  'use strict';

  angular
    .module('app')
    .run(function($rootScope, authService, authManager, lock) {

      // Intercept the hash that comes back from authentication
      // to ensure the `authenticated` event fires
      lock.interceptHash();

      ...

    });
})();
```

Inject the modules necessary for the application, including **angular-lock** and **angular-jwt**. Add configuration for an **angular-lock** instance with your application's client ID and domain using the `lockProvider`.

```js
// app.js

(function() {

  'use strict';

  angular
    .module('myApp', ['auth0.lock', 'angular-jwt', 'ngRoute'])
    .config(function($routeProvider, lockProvider) {

      lockProvider.init({
        clientID: '<%= account.clientId %>',
        domain: '<%= account.namespace %>'
      });

      $routeProvider
        .when( '/', {
          controller: 'homeController',
          templateUrl: 'components/home/home.html'
        })
        .when( '/login', {
          controller: 'loginController',
          templateUrl: 'components/login/login.html'
        });
    });    

})();
```