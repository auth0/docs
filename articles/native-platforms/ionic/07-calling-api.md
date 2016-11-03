---
title: Calling APIs
description: This tutorial demonstrates how to make secure calls to an API
budicon: 546
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-ionic-samples',
  path: '07-Calling-Api'
}) %>


<%= include('../../_includes/_calling_apis') %>

## JWT Interceptor

To attach the user's JWT as an `Authorization` header, we could write a service that returns a token and attaches it to all HTTP requests. However, the **angular-jwt** library already provides this functionality. Ensure that **angular-jwt** is added to your app as a dependency and configure it with `jwtOptionsProvider` in the `config` block. A `tokenGetter` function needs to be provided to inform **angular-jwt** how it should be retrieving the user's JWT.

```js
// www/app.js

(function () {

  ...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $httpProvider) {

    ...

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

  }

})();
```

## Not Sending the JWT for Specific Requests

This basic example will attach the JWT as an `Authorization` header to all requests. This may not be desired as some requests don't require authentication. You can choose not to send the JWT by specifying `skipAuthorization: true`.

```js
// www/components/home/home.service.js

(function () {

  ...

  function HomeController($state, authService, $scope, $http, $ionicPopup) {
    var vm = this;

  ...

    vm.ping = ping;

  ...

    function ping() {
    // This request will NOT send the token as it has skipAuthorization
      $http.get(SERVER_PATH + '/ping', { skipAuthorization: true })
        .success(onPingSuccess)
        .error(onPingFail);
    }

  ...

}());
```

## Avoiding Template Requests

Remember that template requests via `ui-router` or `ng-route` are HTTP requests. This means that `Authorization` headers will be attached as well and that might not be needed. You may provide some configuration to avoid sending the JWT for template requests.

```js
// www/app.js

(function () {

  ...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $httpProvider) {

    ...

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function(options) {
    // Skip authentication for any requests ending in .html
    if (options.url.substr(options.url.length - 5) == '.html') {
      return null;
    }

        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

  }

})();
```

## Different Tokens Based on URLs

If for any reason you would want to send different tokens based on different URLs, you can configure the `tokenGetter` to do so.

```js
// www/app.js

(function () {

  ...

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $httpProvider) {

    ...

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function(options) {
        if (options.url.indexOf('http://auth0.com') === 0) {
          return localStorage.getItem('auth0.id_token');
        } else {
          return localStorage.getItem('id_token');
        }

        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

  }

})();
```
