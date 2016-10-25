---
title: Passwordless
description: This tutorial demonstrates how to use passwordless authentication
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '12-Passwordless'
}) %>

## Passwordless Authentication

Passwordless connections in Auth0 allow users to log in without the need to remember a password.

Without passwords, your application will not need to implement a password-reset procedure and users avoid the insecure practice of using the same password for many different applications.

## Configuration

Start by enabling a passwordless authentication connection in your Auth0 dashboard by navigating to [Connections > Passwordless](${manage_url}/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Update References

Install and reference the necessary libraries.

```bash
bower install angular-lock-passwordless
```

```html
<!-- index.html -->

<!-- Auth0 Lock-passwordless -->
<script type="text/javascript" src="bower_components/auth0-lock-passwordless/build/lock-passwordless.js"></script>
<!-- lock-passwordless-angular -->
<script type="text/javascript" src="bower_components/angular-lock-passwordless/dist/angular-lock-passwordless.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

## Add the Module Dependencies and Configure the Service

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lockPasswordless', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, lockPasswordlessProvider) {

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

    lockPasswordlessProvider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}'
    });
  }

})();
```

## Implement the `login` Method

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(lockPasswordless, authManager, $q, $state) {

    function login() {
      lockPasswordless.emailcode(function(error, profile, id_token) {
        if (error) {
          alert("Error: " + error);
          return;
        }
        localStorage.setItem('id_token', id_token);
        authManager.authenticate();
        localStorage.setItem('profile', JSON.stringify(profile));

        deferredProfile.resolve(profile);
        $state.go('home');
        lockPasswordless.close();
      });
    }

    return {
      login: login
    }
  }

})();
```