---
title: Calling APIs
description: This tutorial demonstrates how to make secure calls to an API
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '08-Calling-Api'
}) %>

<%= include('../../_includes/_calling_apis') %>

## JWT Interceptor

To attach the user's JWT as an `Authorization` header, we could write a service that returns a token and attaches it to all HTTP requests. However, the **angular-jwt** library already provides this functionality. Ensure that **angular-jwt** is added to your app as a dependency and configure it with `jwtOptionsProvider` in the `config` block. A `tokenGetter` function needs to be provided to inform **angular-jwt** how it should be retrieving the user's JWT.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($httpProvider, jwtOptionsProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function () {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
```

Witht the `jwtInterceptor` configured, you can now send authenticated requests to an API that is protected by your Auth0 secret key.

```js
// components/ping/ping.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('PingController', PingController);

  function PingController($http) {

    vm.ping = function () {
      $http.get('http://localhost:3001/secured/ping')
        .then(function (result) {
          vm.pingResult = result.data.text;
        }, function (error) {
          vm.pingResult = error.statusText;
        });
    }
  }

}());
```

## Not Sending the JWT for Specific Requests

With this configuration, the user's JWT will be sent as an `Authorization` header in all `$http` requests. This may not be desired as some requests don't require authentication. You can choose to not send the JWT by specifying `skipAuthorization: true`.

```js 
// components/ping/ping.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('PingController', PingController);

  function PingController($http) {

    vm.ping = function () {
	  // This request will NOT send the token as it has skipAuthorization
      $http.get('http://localhost:3001/secured/ping', { skipAuthorization: true })
        .then(function (result) {
          vm.pingResult = result.data.text;
        }, function (error) {
          vm.pingResult = error.statusText;
        });
    }

  }

}());
```

## Template Requests

Remember that template requests via `ui-router` or `ng-route` are HTTP requests. This means that by default, `Authorization` headers will be attached when requesting these resources, which isn't required. You may provide some configuration to avoid sending the JWT for template requests.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($httpProvider, jwtOptionsProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        
        // Check for templates and return null to not attach the JWT
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
```

## Different Tokens Based on URLs

If for any reason you would want to send different tokens based on different URLs, you can configure the `tokenGetter` to do so.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($httpProvider, jwtOptionsProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
	  
        if (options && options.url.indexOf('http://auth0.com') === 0) {
          return localStorage.getItem('auth0.id_token');
        }
		
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
```
