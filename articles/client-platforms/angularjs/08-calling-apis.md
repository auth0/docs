---
title: Calling APIs
description: This tutorial demonstrates how to make secure calls to an API
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs-sample',
  pkgBranch: 'master',
  pkgPath: '08-Calling-Api',
  pkgFilePath: '08-Calling-Api/auth0.variables.js',
  pkgType: 'replace'
}) %>

<%= include('../../_includes/_signup') %>

<%= include('../../_includes/_calling_apis') %>

## JWT Interceptor

To attach the user's JWT as an `Authorization` header, we could write a service that returns a token and attaches it to all HTTP requests. However, the **angular-jwt** library already provides this functionality. Ensure that **angular-jwt** is added to your app as a dependency and configure it with `jwtOptionsProvider` in the `config` block. A `tokenGetter` function needs to be provided to inform **angular-jwt** how it should be retrieving the user's JWT.

```js
/* ===== app.js ===== */
(function () {

	...

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider) {

    ...

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

## Not Sending the JWT for Specific Requests

This basic example will attach the JWT as an `Authorization` header to all requests. This may not be desired as some requests don't require authentication. You can choose not to send the JWT by specifying `skipAuthorization: true`.

```js 
/* ===== components/ping/ping.service.js ===== */

(function () {

  ...

  function PingController(authService, $http) {

    ...

    vm.ping = function () {
	  // This request will NOT send the token as it has skipAuthorization
      $http.get('http://localhost:3001/secured/ping', { skipAuthorization: true })
        .then(function (result) {
          vm.pingResult = result.data.text;
        }, function (error) {
          console.log(error);
          vm.pingResult = error.statusText;
        });
    }

  }

}());
```

## Avoiding Template Requests

Remember that template requests via `ui-router` or `ng-route` are HTTP requests. This means that `Authorization` headers will be attached as well and that might not be needed. You may provide some configuration to avoid sending the JWT for template requests.

```js
/* ===== app.js ===== */
(function () {

	...

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider) {

    ...

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
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
/* ===== app.js ===== */
(function () {

	...

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider) {

    ...

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
