---
section: libraries
title: Migrating Angular 1.x Applications to from Lock v9 to Lock v11
description: How to migrate Angular 1.x Applications from Lock v9 to v11
toc: true
tags:
  - libraries
  - lock
  - migrations
  - angular
---
# Migrating Angular 1.x Applications from Lock v9 to v11

This guide will help you migrating your Angular 1.x application from Lock 9 to Lock v11. 

<%= include('../../_includes/_get_lock_latest_version') %>

## Add the angular-lock library

Most Angular 1.x apps used the [auth0-angular](https://www.npmjs.com/package/auth0-angular) which is currently deprecated. This guide will use [auth0-lock](https://www.npmjs.com/package/auth0-lock) 3.0 to simplify using Lock v11.

Use npm to uninstall the old library and install the new one.

```
npm uninstall auth0-angular --save
npm install angular-lock --save
```

Then include it in your `index.html` file:

```html
<!-- index.html -->
<script src="node_modules/angular-lock/dist/angular-lock.min.js"></script>
```

## Update the app.js file

In your `app.js` file:

* Add `auth0.lock` to your Angular module
* Inject `lockProvider` in your configuration
* Initialize a Lock instance in `config()`
* Inject your authentication service in `run()` and call the method that listens for authentication events (we will implement changes in the authentication service next)

```js
// app.js
(function() {
  'use strict';

  angular
    .module('app', ['ngRoute', 
//   'auth0' 
     'auth0.lock']) // Add auth0.lock
      .config(config)
      .run(run);

  config.$inject = [
    '$locationProvider',
    '$routeProvider',
 // 'authProvider',
    'lockProvider' // Inject lockProvider
  ];

  function config(
    $locationProvider,
    $routeProvider,
//  authProvider
    lockProvider // Provide lockProvider
  ) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
  });

  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);

  // Configure Auth0 Lock instance
  // Read more about configuration here:
  // https://auth0.com/docs/libraries/lock/v11
  lockProvider.init({
     domain: '${account.namespace}'),
     clientID: '${account.clientId}',
     options: {
       autoclose: true,
       auth: {
         responseType: 'token id_token',
         audience: 'https://' + '${account.namespace}' + '/userinfo',
         params: {
           scope: 'openid profile email'
         }
       }
     }
   });
  }

  // Inject authentication service and
  // run method to handle authentication
  run.$inject = ['authService'];

  function run(authService) {
    authService.handleAuthentication();
  }

}());
```

## Update the authentication service

If you are using an authentication service, you will need to make a few minor changes there as well. Lock v11 provides events so you can execute functionality when the user is authenticated, when there is an authentication error, and so on. You can read more at the [Lock v11 documentation](/libraries/lock/v11).

```js
// auth.service.js
(function() {
  'use strict';

  angular.module('app').service('authService', authService);

  // Inject 'lock'
  authService.$inject = ['lock', '$location'];

  function authService(lock, $location) {
 
    function login() {
      // Display the Lock widget using the
      // instance initialized in the app.js config
      lock.show();
    }

    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      $location.path('/');
    }

    function handleAuthentication() {
      // Uncomment if you are not using HTML5Mode
      // lock.interceptHash();

      lock.on('authenticated', function(authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log('Authenticated!', authResult);
          _setSession(authResult);
        }
      });
      lock.on('authorization_error', function(err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      });
    }

    function _setSession(authResult) {
      // Set the time that the Access Token will expire
      var expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      // Save tokens and expiration to localStorage
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }

    function isAuthenticated() {
      // Check whether the current time is
      // past the Access Token's expiry time
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    return {
      login: login,
      logout: logout,
      handleAuthentication: handleAuthentication,
      isAuthenticated: isAuthenticated
    };
  }
})();
```

::: note
If you are not using a service, you can implement the `handleAuthentication()` method's functionality in your app's `run()` method, and implement the `login()`, `logout()`, and `_setSession()` functionality in the controller where your login is located.
:::

<%= include('../../_includes/_configure_embedded_login', { library : 'Lock v11'}) %>
<%= include('../../_includes/_change_get_profile') %>

## Behavioral Changes in Lock v11

<%= include('../../_includes/_popup_mode') %>
<%= include('../../_includes/_last_logged_in_window') %>
<%= include('../../_includes/_ip_ranges') %>
<%= include('../../_includes/_default_values_lock') %>
