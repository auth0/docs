---
title: Auth0 Angular 1.x Tutorial
description: This tutorial will show you how to use the Auth0 with Angular 1.x applications.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/00-Starter-Seed',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-angularjs-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

### Prerequisites
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Angular 1.5.8
:::

<%= include('../../_includes/_signup') %>

${include('../\_callback')}

#### Create an Application Instance

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

#### Configure Callback URLs

Callback URLs are URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and attaches some details as query parameters to it including a token. Callback URLs can be manipulated on the fly and that could be harmful. For security reasons, you must add your application's URL in the app's **Allowed Callback URLs**.

### Step 1: Installing Dependencies

The easiest way to add authentication to any app with Auth0 is to use the Lock widget. To use the Lock widget in your Angular 1.x apps, and to help manage authentication related tasks, you will need to install several libraries:

* auth0-lock
* angular-lock
* angular-jwt

**Installing Dependencies with npm**

```bash
npm install angular-lock angular-jwt
```

or,

**Installing Dependencies with Bower**

```bash
bower install auth0-lock angular-lock angular-jwt
```

Once installed, the scripts for these libraries can be included in your project.

**After Installation with npm**

```html
...

<script type="text/javascript" src="https://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>
<script src="node_modules/angular-lock/dist/angular-lock.js"></script>
<script src="node_modules/angular-jwt/dist/angular-jwt.js"></script>

...
```

or,

**After Installation with Bower**

```html
...

<script src="bower_components/auth0-lock/build/lock.js"></script>
<script src="bower_components/angular-lock/dist/angular-lock.js"></script>
<script src="bower_components/angular-jwt/dist/angular-jwt.js"></script>

...
```

To ensure that the Lock widget displays properly on all devices, add a `meta` tag to set the `viewport`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### Step 2: Add Configuration for Your App

This guide assumes that you are using Angular Router in your application, but you are free to use UI Router if you wish.

**Note:** If you are using HTML5 mode by setting `$locationProvider.html5Mode(true)`, add a hash to your `<base>` tag.

```html
  <base href="/#">
```

Inject the modules necessary for the application, including **angular-lock** and **angular-jwt**. Add configuration for an **angular-lock** instance with your application's client ID and domain using the `lockProvider`.

```js
// app.js

(function() {

  'use strict';

  angular
    .module('myApp', ['auth0.lock', 'angular-jwt', 'ngRoute'])
    .config(function($routeProvider, lockProvider) {

      lockProvider.init({
        clientID: '<%= account.clientId %>',
        domain: '<%= account.namespace %>'
      });

      $routeProvider
        .when( '/', {
          controller: 'homeController',
          templateUrl: 'components/home/home.html'
        })
        .when( '/login', {
          controller: 'loginController',
          templateUrl: 'components/login/login.html'
        });
    });    

})();
```

### Step 3: Create an Auth Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application.

At the most basic level, authentication with Auth0's Lock widget requires that the user send their credentials to Auth0 to be verified. If authentication is successful, a [JSON Web Token (JWT)](https://jwt.io/introduction) will be signed and sent back to the user. To do this, you can use Lock's `show` method to open the widget and then listen for successful authentication with the `authenticated` event. When the `authenticated` event is fired, the user's `id_token` will be returned which can then be used to get the user's profile with Lock's `getProfile` method.

The code for this should be kept in the `authService`, but it will be necessary to use the code in Angular's `run` block. To keep things clean, we can put it all in a single method called `registerAuthenticationListener`.

```js
// components/auth/auth.service.js

(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];

  function authService($rootScope, lock, authManager) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})();
```

When the user successfully authenticates, their JWT will be saved in local storage as `id_token` and their profile will be stringified and saved as `profile`. Depending on your setup, you may need to broadcast an event to notify controllers that the user's profile has been returned. This is done in the above example with `$rootScope.$broadcast`.

Now the `registerAuthenticationListener` method can be called in the `run` block so that `authenticated` events can be listened for when the app runs.

```js
// app.run.js

(function() {

  'use strict';

  angular
    .module('myApp')
    .run(function(authService) {

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      authService.registerAuthenticationListener();
    });

})();
```

### Step 4: Provide Controls for Login and Logout

The `authService` has a method for showing the Lock widget, but it hasn't been called anywhere yet. The place from which this method is called depends on how your application is set up, but it is common to do so from a header toolbar component or from a dedicated **login** or **user** view.

#### Log In

Start by creating a **login** controller and view.

```js
// components/login/login.controller.js

(function() {

  'use strict';

  angular
    .module('app')
    .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'authService'];

    function loginController($scope, authService) {

      // Put the authService on $scope to access
      // the login method in the view
      $scope.authService = authService;
    }

})();
```

With the `authService` injected in this controller, the `login` method can now be called from the view.

```html
  <!-- components/login/login.html -->

  ...

    <button class="btn btn-primary" ng-click="authService.login()">Log In</button>

  ...
```

When the user clicks the **Log In** button, the Lock widget will be displayed.

${browser}

#### Log Out

A button responsible for logging the user out can be placed in the header toolbar, but to do this, the toolbar needs to have access to the `authService`. This can be accomplished either by creating a controller and view for the header toolbar and injecting the auth service there, or by keeping the toolbar in the root view (commonly the `index.html` file) and relying on `$rootScope` to get access to the auth service. For this example, we'll attach the `authService` to `$rootScope`.

```js
// app.run.js

(function() {

  'use strict';

  angular
    .module('app')
    .run(function($rootScope, authService, authManager) {

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = authService;

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();
    });

})();
```

Then, in the toolbar you can provide a link or button for logging the user out which calls the `logout` method.

```html
  <!-- index.html -->

  ...

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/">Auth0 - Angular</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li ng-if="!isAuthenticated"><a href="#/login">Log In</a></li>
            <li ng-if="isAuthenticated"><a href="#/" ng-click="authService.logout()">Log Out</a></li>
          </ul>
        </div>
      </div>
    </nav>

  ...
```

In this example, the **Log In** link takes the user to the `/login` view and the **Log Out** link immediately calls the `logout` method to log the user out. These links are conditionally shown and hidden based on whether or not the user is currently authenticated, which is provided by the `isAuthenticated` property which comes from `authManager`.

### Step 5: Make Authenticated HTTP Requests

Authentication for Angular apps isn't that useful if it can't be used to access protected resources on the server. Once your server resources are protected by a JWT middleware, you can attach the user's JWT to the HTTP requests they make from your Angular app so they can access those resources. To do this, set a `tokenGetter` function in `jwtOptionsProvider.config` and push the `jwtInterceptor` that comes from **angular-jwt** onto the array of HTTP interceptors.

```js
// app.js

(function() {

  'use strict';

  angular
    .module('myApp', ['auth0.lock', 'angular-jwt', 'ngRoute'])
    .configure(function config($routeProvider, $http, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {

      jwtOptionsProvider.config({
        tokenGetter: function() {
          return localStorage.getItem('id_token');
        }
      });

      $http.interceptors.push('jwtInterceptor');

      ...

    });    

})();
```

Now when a user is authenticated and they make HTTP requests, their JWT will be attached as an `Authorization` header which will permit them access to protected resources.

### Step 6: Keep the User Authenticated

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

### Step 7: Redirect the User on Unauthorized Requests

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

That's all there is to adding authentication to your Angular 1.x app with Auth0!
