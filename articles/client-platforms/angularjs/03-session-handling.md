---
title: Session Handling
description: This tutorial demonstrates how to integrate Auth0 with Angular 1.x to add session handling and logout to your web app.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '03-Session-Handling
}) %>

In the previous steps of this tutorial, we enabled user login with the `Lock` widget and then with `auth0.js`. 

In this step, we will create a session for the user.

## Create Session

Once the user is authenticated, we need to create a client-side session for them so that our Angular 1.x app knows that they are currently authenticated. To do this, we need to store the value of the `id_token` attribute that is returned in the Lock `authenticated` callback parameter.

**NOTE**: This example uses `localStorage`, but you can use any storage library.

```js
// components/auth/auth.service.js

(function () {

	...

  function authService($rootScope, lock, authManager, jwtHelper) {

    ...

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });
    }

    ...
})();

```

## Check Session

To check if a user is authenticated, we can use `jwtHelper.isTokenExpired` from [angular-jwt](https://github.com/auth0/angular-jwt) which allows us to check whether the user's JWT is expired or not. Since JWT is a "stateless" manner of doing user authentication, the best way to know if the user should be regarded as authenticated on the front end is to know whether the token is unexpired.

```js
// components/auth/auth.service.js

(function () {

  function authService($rootScope, lock, authManager, jwtHelper) {
  
	...

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }

    ...
	
})();
```

To use this service, inject `authService` into your component `run` method and call `authService.checkAuthOnRefresh()`:

```js
// app.run.js

(function () {

  function run($rootScope, authService, lock) {
  
    ...
	
    authService.checkAuthOnRefresh();
  }

})();
```


