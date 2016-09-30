---
title: Calling APIs
description: This tutorial will show you how to use angular2-jwt library in Ionic to make authenticated api calls.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ionic-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ionic-samples',
  pkgBranch: 'master',
  pkgPath: '07-Calling-Api',
  pkgFilePath: '07-Calling-Api/www/auth0.variables.js',
  pkgType: 'replace'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ionic 1.3.1
:::

<%= include('../../_includes/_signup') %>

The reason for implementing authentication in the first place is to protect information. In this case your information is a resource served from a server of any sort. Auth0 provides squad of tools to assist you complete end to end authentication in an application. Auth0 suggests you conform to RFC standard by sending the token through Authorization header (though you are not restricted to that).

## Meet JWT Interceptor

You can write a service and inject it like a middleware in your HTTP request or response. That means that this service will need to finish it's business and probably return something before the HTTP request/response can continue. This concept is known as HTTP Interceptor.

We can actually write a service that returns a token and attaches it to all HTTP requests but instead of doing that, we can  make use of what `angular-jwt` already provides. With your app depending on `angular-jwt` you can inject `jwtOptionsProvider` in your `config()` method, configure the provider's `tokenGetter` property with a function that returns a token and then push into the interceptor:

```js
/* ===== www/app.js ===== */
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

For CORS you will need to enable Authorization header if required:

```bash
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
```
With that your request will have Authorization in your request herders:

```bash
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
```

### Not sending the JWT for specific requests
Our basic example will attache the JWT to headers of all of our requests which might not be the desired behavior. You can filter:

```js 
/* ===== www/components/home/home.service.js ===== */
(function () {

	...
	
  function HomeController($state, authService, $scope, $http, $ionicPopup) {
    var vm = this;

	...
	
    vm.ping = ping;

	...

    function ping() {
	  // This request will NOT send the token as it has skipAuthentication
      $http.get(SERVER_PATH + '/ping', { skipAuthorization: true })
        .success(onPingSuccess)
        .error(onPingFail);
    }

	...

}());
```

### Avoiding Template Requests
Remember that template requests via `ui-router` or `ng-router` are HTTP requests. This means that Authorization headers will be attached as well and that might not be needed. You can get rid:

```js
/* ===== www/app.js ===== */
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

### Different Tokens Based on URLs
If for any reason you would want to send different tokens based on different URLs, you can do something like:

```js
/* ===== www/app.js ===== */
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

### Sending Tokens as URL Params
You saw in the introduction that sending tokens as a header is just a standard and not compulsory. If you prefer to send via URL parameters, then:

```js
/* ===== www/app.js ===== */
(function () {

	...
 
  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider, $httpProvider) {

    ...

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
	  urlParam: 'token',
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

## Recap
- HTTP interceptors
- JWT HTTP interceptor
- Different ways to attach tokens to requests
