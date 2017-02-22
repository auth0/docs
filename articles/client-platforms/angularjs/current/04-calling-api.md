---
title: Calling an API
description: This tutorial demonstrates how to use angular2-jwt in an AngularJS application to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '04-Calling-Api',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../../_includes/_calling_api_preabmle') %>

## Configure angular-jwt

<%= include('../../_includes/_calling_api_access_token') %>

The [angular-jwt](https://github.com/auth0/angular-jwt) library exists primarily to automatically attach JSON Web Tokens to requests made with Angular's `$http` service.

If you haven't already done so, install angular-jwt.

```bash
npm install --save angular-jwt
```

Include the installed `angular-jwt.js` file in your project.

```html
<!-- index.html -->

<script type="text/javascript" src="node_modules/angular-jwt/dist/angular-jwt.js"></script>
```

Use the `jwtOptionsProvider` from `angular-jwt` to define a `tokenGetter` function. This function needs to return the token that should be attached to `$http` calls which, in this case, is the `access_token`. Add the domains you wish to be callable to the `whiteListedDomains` array.

```js
// app/app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt'])
    .config(config);

  config.$inject = ['$httpProvider', 'lockProvider', 'jwtOptionsProvider'];

  function config($httpProvider, lockProvider, jwtOptionsProvider) {
    // ...
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

## Make Calls for Data

After angular-jwt is configured, you can use `$http` as you normally would. The difference now is that the `access_token` will be attached as an `Authorization` header in XHR requests sent with it.

Assuming you have an API which returns a `message` from some protected endpoint called `/private`, you could craft an API call as such:

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

<%= include('../../_includes/_calling_api_protect_resources') %>