---
title: Auth0 Angular 1.x Tutorial
description: This tutorial will show you how to use the Auth0 with Angular 1.x applications.
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '00-Starter-Seed'
}) %>

<%= include('_includes/_prerequisite') %>

${include('../\_callback')}

#### Create an Application Instance

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

#### Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details as query parameters to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you must add your application's URL in the app's **Allowed Callback URLs**.

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_authservice') %>

<%= include('_includes/_login') %>


### Step 5: Make Authenticated HTTP Requests

Authentication for Angular apps isn't that useful if it can't be used to access protected resources on the server. Once your server resources are protected by a JWT middleware, you can attach the user's JWT to the HTTP requests they make from your Angular app so they can access those resources. To do this, set a `tokenGetter` function in `jwtOptionsProvider.config` and push the `jwtInterceptor` that comes from **angular-jwt** onto the array of HTTP interceptors.

```js
// app.js

(function() {

  'use strict';

  angular
    .module('myApp', ['auth0.lock', 'angular-jwt', 'ngRoute'])
    .configure(function config($routeProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {

      jwtOptionsProvider.config({
        tokenGetter: function() {
          return localStorage.getItem('id_token');
        }
      });

      $httpProvider.interceptors.push('jwtInterceptor');

      ...

    });

})();
```

Now when a user is authenticated and they make HTTP requests, their JWT will be attached as an `Authorization` header which will permit them access to protected resources.

## Step 6: Keep the User Authenticated

Everything that has been set up thus far will work as long as the user doesn't refresh the page. If the page gets refreshed, however, the state will be lost and it will look to the user as if they aren't authenticated at all. This brings up an interesting question: from the perspective of a client-side application, like the ones built with Angular.js, what is it that determines whether or not a user is authenticated? Since the authentication we do we with JWTs is stateless by nature, the best indication we can go with is whether the user is holding an unexpired JWT.

We can use the `checkAuthOnRefresh` method from `authManager` to check for an unexpired JWT when the page is refreshed. If there is an unexpired JWT present, the user will remain authenticated on the client side.

```js
// app.run.js

(function() {

  'use strict';

  angular
    .module('app')
    .run(function($rootScope, authService, authManager) {

      ...

      // Use the authManager from angular-jwt to check for
      // the user's authentication state when the page is
      // refreshed and maintain authentication
      authManager.checkAuthOnRefresh();
    });

})();
```

## Step 7: Redirect the User on Unauthorized Requests

If the user's JWT expires, requests made to the server will be rejected and a `401 Unauthorized` error will be returned. This effectively means that the user has been logged out because they no longer have a valid JWT. In these cases, it is wise to listen for unauthorized requests and redirect the user to the **Login** page when that happens. You can do this with the `redirectWhenUnauthenticated` method that comes from `authManager`.

```js
// app.run.js

(function() {

  'use strict';

  angular
    .module('app')
    .run(function($rootScope, authService, authManager) {

      ...

      // Listen for 401 unauthorized requests and redirect
      // the user to the login page
      authManager.redirectWhenUnauthenticated();
    });

})();
```
