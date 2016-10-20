---
title: API Authorization
description: This tutorial demonstrates how to use API authorization
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '13-API-Authorization
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_preview-warning') %>
<%= include('../../_includes/_compat_warning') %>

# Before Starting

## Enable OAuth2 as a Service

<%= include('../../_includes/_configure_oauth2aas') %>

## Create an Application

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

Be sure to register the URL of your app in the Allowed Callback URLs in your Application Settings.

## Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

Take note of the API Identifier and Scopes you defined in the Dashboard, as they will be used later.


# Configuring Your Application

## Initialize

First, add the references to the libraries to your application's

```html
<!-- Auth0 Lock -->
<script type="text/javascript" src="bower_components/auth0-lock/build/lock.js"></script>
<!-- lock-angular -->
<script type="text/javascript" src="bower_components/angular-lock/dist/angular-lock.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

## Add the Module Dependencies and Configure the Service

Add the `auth0.lock`, `angular-jwt` and `ui.router` module dependencies to your angular app definition and configure the `Lock widget` by calling the `init` method of the `lockProvider`.

```js
// app.js
(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$httpProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider) {

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

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          responseType: 'id_token token',
          params: {
            scope: 'openid profile {API SCOPES}',
            audience: '{API IDENTIFIER}'
          }
        }
      }
    });

    $urlRouterProvider.otherwise('/home');

  }

})();
```

Add a call to `authService.registerAuthenticationListener()`, `authManager.checkAuthOnRefresh()` and to `lock.interceptHash()` in the `run` method.

```js
// app.run.js
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock', 'authManager'];

  function run($rootScope, authService, lock, authManager) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // Register synchronous hash parser
    lock.interceptHash();
  }

})();
```

## Login

Once you have succesfully authenticated, the Lock widget will fire `authenticated` event and will append a few extra parameters. These include an `access_token` and an `id_token`, both JSON Web Tokens (JWTs). You can grab the tokens as follows:

```js
// components/auth/auth.service.js
(function () {

  function authService(lock, authManager, $q, $http) {

   ...

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);

        authManager.authenticate();

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
        });

      });
    }

  }
})();
```

The `access_token` will be used to make an Authenticated API call. Remember that using `response_type: token` means that you cannot get a `refresh_token`. The `id_token` can be used in your application for basic profile data. If you want to retrieve additional profile data for the user, you can use the `userinfo` endpoint with the `access_token` in the `Authorization` header. For more information, see [our API documentation](https://auth0.com/docs/api/authentication#!#get--userinfo).

## Making an Authenticated API Call

To attach the user's JWT as an `Authorization` header, we could write a service that returns a token and attaches it to all HTTP requests. However, the **angular-jwt** library already provides this functionality. Ensure that **angular-jwt** is added to your app as a dependency and configure it with `jwtOptionsProvider` in the `config` block. A `tokenGetter` function needs to be provided to inform **angular-jwt** how it should be retrieving the user's JWT.

```js
// app.js
(function () {

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $httpProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('access_token');
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

And then simply make HTTP request to your API:

```js
$http.get('{YOUR API}').then(function(response) {
  console.log(response);
});
```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json]. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).

## Log Out

In this implementation, a logout involves simply deleting the saved tokens from `localStorage` and call the `unauthenticate` method of `authManager`:

```js
// components/auth/auth.service.js
(function () {

  function authService(lock, authManager, $q, $http) {

    // Logging out just requires removing the user's
    // access_token, id_token and profile
    function logout() {
      deferredProfile = $q.defer();
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = null;
    }
  }
})();
```