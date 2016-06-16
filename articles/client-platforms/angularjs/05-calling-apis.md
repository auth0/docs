---
title: Calling APIs
description: test
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/04-Calling-Apis',
}) %>_

The reason for implementing authentication in the first place is to protect information. In this case your information is a resource served from a server of any sort. Auth0 provides squad of tools to assist you complete end to end authentication in an application. Auth0 suggests you conform to RFC standard by sending the token through Authorization header (though you are not restricted to that).

## Meet JWT Interceptor

You can write a service and inject it like a middleware in your HTTP request or response. That means that this service will need to finish it's business and probably return something before the HTTP request/response can continue. This concept is known as HTTP Interceptor.

We can actually write a service that returns a token and attaches it to all HTTP requests but instead of doing that, we can  make use of what `angular-jwt` already provides. With your app depending on `angular-jwt` you can inject `jwtInterceptorProvider` in your `config()` method, configure the provider's `tokenGetter` property with a function that returns a token and then push into the interceptor:

```js
angular.module('app', ['auth0', 'angular-jwt', 'angular-storage',])
.config(function Config(['$httpProvider', 'jwtInterceptorProvider', $httpProvider, jwtInterceptorProvider) {

  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    return store.get('token');
  }]

  $httpProvider.interceptors.push('jwtInterceptor');
}])
```

For CORS you will need to enable Authorization header if required:

```bash
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
```
With that your request will have Authorization in your request herders:

```bash
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
```

### Not sending the JWT for specific requests
Our basic example will attache the JWT to headers of all our requests which might not be the desired behavior. You can filter:

```js
angular.module('app', ['auth0', 'angular-jwt', 'angular-storage',])
.config(function Config(['$httpProvider', 'jwtInterceptorProvider', $httpProvider, jwtInterceptorProvider) {

  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    return store.get('token');
  }]

  $httpProvider.interceptors.push('jwtInterceptor');
}])
.controller('PingCtrl', ['$http', function ($http) {
  // This request will NOT send the token as it has skipAuthentication
  $http({
    url: '/hola',
    skipAuthorization: true
    method: 'GET'
  });
}])
```

### Avoiding Template Requests
Remember that template requests via `ui-router` or `ng-router` are HTTP requests. This means that Authorization headers will be attached as well and that might not be needed. You can get rid:

```js
angular.module('app', ['auth0', 'angular-jwt', 'angular-storage',])
.config(function Config(['$httpProvider', 'jwtInterceptorProvider', $httpProvider, jwtInterceptorProvider) {

  jwtInterceptorProvider.tokenGetter = ['store', 'config', function(store, config) {
    // Skip authentication for any requests ending in .html
    if (config.url.substr(config.url.length - 5) == '.html') {
      return null;
    }
    return store.get('token');
  }]

  $httpProvider.interceptors.push('jwtInterceptor');
}])
```

### Different Tokens Based on URLs
If for any reason you would want to send different tokens based on different URLs, you can do something like:

```js
angular.module('app', ['auth0', 'angular-jwt', 'angular-storage',])
.config(function Config(['$httpProvider', 'jwtInterceptorProvider', $httpProvider, jwtInterceptorProvider) {

  jwtInterceptorProvider.tokenGetter = ['store', 'config', function(store, config) {
      if (config.url.indexOf('http://auth0.com') === 0) {
       return store.get('auth0.token');
     } else {
       return store.get('token');
     }
  }]

  $httpProvider.interceptors.push('jwtInterceptor');
}])
```

### Sending Tokens as URL Params
You saw in the introduction that sending tokens as a header is just a standard and not compulsory. If you prefer to send via URL parameters, then:

```js
angular.module('app', ['auth0', 'angular-jwt', 'angular-storage',])
.config(function Config(['$httpProvider', 'jwtInterceptorProvider', $httpProvider, jwtInterceptorProvider) {
  // Will attach token as a URL param
  jwtInterceptorProvider.urlParam = 'token';
  jwtInterceptorProvider.tokenGetter = ['store', 'config', function(store, config) {
      if (config.url.indexOf('http://auth0.com') === 0) {
       return store.get('auth0.token');
     } else {
       return store.get('token');
     }
  }]

  $httpProvider.interceptors.push('jwtInterceptor');
}])
```

## Recap
- HTTP interceptors
- JWT HTTP interceptor
- Different ways to attach tokens to requests
