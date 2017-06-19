---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '03-Calling-an-API',
  requirements: [
    'AngularJS 1.6'
  ]
}) %>

<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope

Pass the API identifier for your newly created API as the `audience` value to `angularAuth0Provider`. Additionally, pass any of your newly created scopes to the `scope` key.

```js
// app/app.js

angularAuth0Provider.init({
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

At this point you should try logging into your application again to take note of how the `access_token` differs from before. Instead of being an opaque token, it is now a JSON Web Token which has a payload that contains your API identifier as an `audience` and any `scope`s you've requested.

::: note
By default, any user on any client can ask for any scope defined in the scopes configuration area. You can implement access policies to limit this behaviour via [Rules](/rules).
:::

## Configure angular-jwt

<%= include('../_includes/_calling_api_access_token') %>

The [angular-jwt](https://github.com/auth0/angular-jwt) module can be used to automatically attach JSON Web Tokens to requests made with Angular's `$http` service.

If you haven't already done so, install angular-jwt.

```bash
# installation with npm
npm install --save angular-jwt

# installation with yarn
yarn add angular-jwt
```

Reference the `angular-jwt` module from your application's main module and inject `jwtOptionsProvider` and `$httpProvider`. Specify a `tokenGetter` function in the provider which retrieves the user's `access_token` from local storage so that it can be attached as an `Authorization` header. Whitelist any domains you wish to enable authenticated `$http` calls for. Finally, push the `jwtInterceptor` into the `$httpProvider.interceptors` array.

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

With the `jwtInterceptor` in place, the user's `access_token` will automatically be attached to `$http` calls when they are made. You can now make `$http` calls as you normally would and, because the user's `access_token` will be included in the call, protected API resources will be accessible to them.

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
        vm.message = error;
      });
    }

  }

})();
```
::: note
To find out more about configuration options for angular-jwt, see the [main project repo](https://github.com/auth0/angular-jwt).
:::

<%= include('../_includes/_calling_api_protect_resources') %>
