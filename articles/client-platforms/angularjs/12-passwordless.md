---
title: Passwordless
description: This tutorial demonstrates how to use passwordless authentication
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '12-Passwordless
}) %>


## Passwordless Authentication

Passwordless connections in Auth0 allow users to login without the need to remember a password. 

This improves the user experience, especially on mobile applications, since users will only need an <% if (withFingerprint) { %> email address, phone number or fingerprint <% } else { %> email address or phone number <% } %> to register for your application.

Without passwords, your application will not need to implement a password-reset procedure and users avoid the insecure practice of using the same password for many purposes.

In addition, the credential used for authentication is automatically validated since the user just entered it at sign-up.

## Configuration

These connections use an authentication channel like <% if (withFingerprint) { %> SMS, e-mail or Touch ID <% } else { %> SMS or e-mail <% } %>. Each of these channels can be configured in the dashboard under [Connections > Passwordless](${manage_url}/#/connections/passwordless).

![](/media/articles/connections/passwordless/passwordless-connections.png)

## Update References

```html
// index.html

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

  config.$inject = ['$stateProvider', 'lockPasswordlessProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, lockPasswordlessProvider, $urlRouterProvider, jwtOptionsProvider) {

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
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
```

## Implement the `login` Method

```js
// components/auth/auth.service.js

(function() {

  function authService(lockPasswordless, authManager, $q, $state) {

    ...

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

    ...

    return {
      login: login,
    }
  }
})();
```