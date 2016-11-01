---
title: OAuth 2.0 API Authorization
description: This tutorial demonstrates how to use API authorization
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '13-OAuth2-Authorization'
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_region-support') %>

<%= include('../../_includes/_compat_warning') %>

# Before Starting

## Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## Create an Application

<%= include('../../_includes/_new_app_no_sample') %>

![App Dashboard](/media/articles/angularjs/spa_client_create.png)

Be sure to register the URL of your app in the Allowed Callback URLs in your Application Settings.

## Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

Take note of the API identifier and scopes you defined in the dashboard, as they will be used later.

## Add the Module Dependencies and Configure the Service

First, install the necessary dependencies and add references to them in your `index.html`.

```bash
bower install angular-auth0 angular-jwt
```

```html
<!-- auth0.js -->
<script type="text/javascript" src="bower_components/auth0.js/build/auth0.js"></script>
<!-- Angular wrapper for auth0.js -->
<script type="text/javascript" src="bower_components/angular-auth0/dist/angular-auth0.js"></script>
<!-- angular-jwt -->
<script type="text/javascript" src="bower_components/angular-jwt/dist/angular-jwt.js"></script>
```

Add the `auth0.auth0`, `angular-jwt` and `ui.router` module dependencies to your Angular app definition and configure `auth0.js` by calling the `init` method of the `angularAuth0Provider`.

```js
// app.js
(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  function config($stateProvider, angularAuth0Provider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('ping', {
        url: '/ping',
        controller: 'PingController',
        templateUrl: 'components/ping/ping.html',
        controllerAs: 'vm'
      });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      callbackURL: 'YOUR_CALLBACK_URL'
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
```

Add a call to `authService.registerAuthenticationListener()` and `authManager.checkAuthOnRefresh()` in the `run` method.

```js
// app.run.js
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  function run($rootScope, authService, authManager) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;
    // Process the auth token if it exists and fetch the profile
    authService.registerAuthenticationListener();
    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();
  }

})();
```

## Login

On a successful login, the hash in the URL bar will contain the user's `access_token` and `id_token`. These values can be retrieved and used with `angularAuth0.parseHash`.

```js
// components/auth/auth.service.js
(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(angularAuth0, authManager) {

    function login() {
      angularAuth0.login({
        responseType: 'id_token token',
        scope: 'openid profile {API SCOPES}',
        audience: '{API IDENTIFIER}'
      });
    }

    function registerAuthenticationListener() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        localStorage.setItem('access_token', result.accessToken);
        localStorage.setItem('id_token', result.idToken);
        authManager.authenticate();
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener
    }

  }
})();
```

Provide a control for the user to log in which calls the `login` method on the `authService`.

```html
<!-- components/home/home.html -->

<div class="text-center" ng-if="!isAuthenticated">
  <p>You are not yet authenticated. <a href="javascript:;" ng-click="vm.authService.login()">Log in.</a></p>
</div>
<div class="text-center" ng-if="isAuthenticated">
  <p>Thank you for logging in! <a href="javascript:;" ng-click="vm.authService.logout()">Log out.</a></p>
</div>
```

The `access_token` retrieved from the authentication process can be used to make authenticated API calls. Remember that using `response_type: token` means that you cannot get a `refresh_token`. The `id_token` can be used in your application for basic profile data. If you want to retrieve additional profile data for the user, you can use the `userinfo` endpoint with the `access_token` in the `Authorization` header. For more information, see [our API documentation](https://auth0.com/docs/api/authentication#!#get--userinfo).

## Making an Authenticated API Call

To attach the user's JWT as an `Authorization` header, we could write a service that returns a token and attaches it to all HTTP requests. However, the **angular-jwt** library already provides this functionality. Ensure that **angular-jwt** is added to your app as a dependency and configure it with `jwtOptionsProvider` in the `config` block. A `tokenGetter` function needs to be provided to inform **angular-jwt** how it should be retrieving the user's JWT.

```js
// app.js

(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'angular-jwt', 'ui.router'])
    .config(config);

  function config(jwtOptionsProvider, $httpProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('access_token');
      }],
      whiteListedDomains: ['localhost']
    });
	
    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
  }

})();
```

When you use `$http` to make requests to your API, the `access_token` will be attached as an `Authorization` header.

```js
$http.get('{YOUR API}').then(function(response) {
  console.log(response);
}, function(error) {
  console.log(error);
});
```

The Resource Server (API) should be configured to verify the JWT and any claims contained within it. Because the Resource Server is utilizing the RS256 signature method, tokens are signed using Auth0's private key for your account. Verification is done using the corresponding public key, which can be found at the following standard [JWKS (JSON Web Key set)](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html) URL: [https://${account.namespace}/.well-known/jwks.json]. You can use any [recommended JWT library](https://jwt.io) to validate the standard claims returned in the token. These details are outside the scope of this quickstart tutorial. More information can be found [in our documentation](https://auth0.com/docs/api-auth/config/asking-for-access-tokens).

## Log Out

In this implementation, a logout involves simply deleting the saved tokens from `localStorage` and calling the `unauthenticate` method of `authManager`.

```js
// components/auth/auth.service.js

(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  function authService(authManager) {

    // Logging out just requires removing the user's
    // access_token and id_token
    function logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    }

    return {
      ...
      logout: logout
    }
  }
})();
```