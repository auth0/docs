---
lodash: true
title: AngularJS Tutorial
name: Angular.js
image: //auth0.com/lib/platforms-collection/img/angular.png
tags:
  - quickstart
snippets:
  dependancies: client-platforms/angularjs/dependancies
  setup: client-platforms/angularjs/setup
  use: client-platforms/angularjs/use
---

## AngularJS Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-angular/master/create-package?path=examples/widget-with-api&type=js@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**If you already have an existing application, follow the steps below.**

@@includes.callback@@

### 1. Add the Auth0 scripts and set the viewport

@@snippet(meta.snippets.dependancies)@@

This will include Auth0's angular module and its dependencies to the `index.html`file.

### 2. Add the module dependency and configure the service

Add the `auth0`, `angular-storage` and `angular-jwt` module dependencies to your angular app definition and configure `auth0` by calling the `init` method of the `authProvider`

@@snippet(meta.snippets.setup)@@

### 3. Implement the login

To implement the login, inject the `auth` service into any controller and call the `signin` method to show the Login / SignUp popup.

In the following example, a call is added to the `login` method of the `LoginCtrl` controller. On login success, the user's profile and token are saved to `localStorage`.

@@snippet(meta.snippets.use)@@

@@browser@@

__Note:__ There are multiple ways of implementing a login. The example above displays the Login Widget. However you may implement your own login UI by changing the line `<script src="//cdn.auth0.com/js/lock-7.5.min.js"></script>` to `<script src="//cdn.auth0.com/w2/auth0-6.js"></script>`. For more details, see the [auth0-angular repo](https://github.com/auth0/auth0-angular#with-your-own-ui).

### 4. Add a logout button

To add a logout button, call the `auth.signout` method to logout the user. Also remove the profile and token information saved in `localStorage`:

```js
$scope.logout = function() {
  auth.signout();
  store.remove('profile');
  store.remove('token');
}
```

```html
<input type="submit" ng-click="logout()" value="Log out" />
```


### 5. Configure secure calls to our API

To call an API you have implemented <%= configuration.api ? ' on ' + configuration.api : '' %>, be sure to send the [JWT token](/jwt) received on the login of each request by adding the `jwtInterceptor` to the list of `$http` interceptors:

```js
// app.js
myApp.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
  // ...

  // We're annotating this function so that the `store` is injected correctly when this file is minified
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
  // ...
});
```

Now you can regularly call this API with `$http`, `$resource` or any rest client as you would do normally and the [JWT token](/jwt) will be sent on each request.

### 6. Show the user's information

After a user has logged in, retrieve from the `auth` service the `profile` property, which has all of the user's information:

```html
<span>His name is {{auth.profile.nickname}}</span>
```

```js
// UserInfoCtrl.js
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
```

To discover all the available properties of the user's profile, see [user-profile](/user-profile).
__Note:__ The properties available depend on which social provider is used.

### 7. Keep the user logged in after the page refreshes

The user's profile and tokens are already saved to `localStorage`. To keep the user logged in, get the profile and tokens on each page refresh and let `auth0-angular` know the user is already authenticated.

```js
angular.module('myApp', ['auth0', 'angular-storage', 'angular-jwt'])
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});
```

### 8. All done!

You have completed the implementation of Login and Signup with Auth0 and AngularJS.

### Optional Steps
####Add routing

Most apps will need to authenticate users so that they may access certain routes. 

To enable access to a route:

1. set the `requiresLogin` property to `true`.

2. Add the `$routeProvider` configuration in the `config` method of our app.

3. Specify a login page to which users will be redirected if trying to access a route when not authenticated.

```js
// app.js
.config(function (authProvider, $routeProvider, $locationProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login.tpl.html',
    controller: 'LoginCtrl'
  });
  // Logged in route
  $routeProvider.when('/user-info', {
    templateUrl: 'userInfo.tpl.html',
    controller: 'UserInfoCtrl',
    requiresLogin: true
  });

  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: location.href,
    // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
    loginUrl: '/login'
  });
});
```

__Note__: If you are using ui-router, see this guide: [UI Router](https://github.com/auth0/auth0-angular/blob/master/docs/routing.md#ui-router).

#### Additional info

For additional info on how to use this SDK, see [Auth0 and AngularJS](https://github.com/auth0/auth0-angular/blob/master/README.md).
