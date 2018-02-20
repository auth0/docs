---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 546
github:
  path: 03-Calling-an-API
sample_download_required_data:
  - client
  - api
---
<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope

In the `angularAuth0Provider.init` call, enter your API identifier as the value for `audience`. Set the scopes in the `scope` parameter.

```js
// app/app.js

angularAuth0Provider.init({
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Configure angular-jwt

<%= include('../_includes/_calling_api_access_token') %>

You can use the [angular-jwt](https://github.com/auth0/angular-jwt) module to automatically attach JSON Web Tokens to requests you make with Angular's `$http` service. 

Install angular-jwt using npm or yarn.

```bash
# installation with npm
npm install --save angular-jwt

# installation with yarn
yarn add angular-jwt
```

Reference the `angular-jwt` module from your application's main module. Inject `jwtOptionsProvider` and `$httpProvider`. In the provider, specify a `tokenGetter` function which retrieves the user's Access Token from local storage. The token can then be attached as an `Authorization` header. 

Whitelist any domains you want to enable authenticated `$http` calls for. 
Push `jwtInterceptor` into the `$httpProvider.interceptors` array.

```js
// app/app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = [
    // ...
    '$httpProvider',
    'jwtOptionsProvider'
  ];

  function config(
    // ...
    $httpProvider,
    jwtOptionsProvider
  ) {

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('access_token');
      },
      whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
```

## Make Authenticated Calls with `$http`

With `jwtInterceptor` in place, the user's Access Token is automatically attached to `$http` calls. 
When you make `$http` calls, your protected API resources become accessible to the user. 

```js
// app/ping/ping.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('PingController', pingController);

  pingController.$inject = ['$http', 'authService'];

  function pingController($http, authService) {

    var API_URL = 'http://localhost:3001/api';
    var vm = this;
    vm.auth = authService;
    vm.message = '';

    vm.securedPing = function() {
      vm.message = '';
      $http.get(API_URL + '/private').then(function(result) {
        vm.message = result.data.message;
      }, function(error) {
        vm.message = error.data.message || error.data;
      });
    }

  vm.securedScopedPing = function() {
      vm.message = '';
      $http.get(API_URL + '/private-scoped').then(function(result) {
        vm.message = result.data.message;
      }, function(error) {
        vm.message = error.data.message || error.data;
      });
    }
  }

})();
```

::: note
To learn more about configuration options for angular-jwt, see the [main project repo](https://github.com/auth0/angular-jwt).
:::

<%= include('../_includes/_calling_api_protect_resources') %>
