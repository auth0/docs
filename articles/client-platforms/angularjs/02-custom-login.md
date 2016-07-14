---
title: Custom Login
description: Learn how to login with custom widget rather than Lock
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/02-Custom-Login',
}) %>

The previous step explains how login but with a widget called Lock. Lock is completely optional so you can build an application with Auth0 using your custom design without having to include Lock. You just need to use the [Auth0.js library](https://github.com/auth0/auth0.js). Let's see how.

## Login
The setup and APIs for logging in with Lock is same in this situation but with just an extra configuration.

```js
/* ===== ./login/login.js ===== */
// Login
$scope.login = function () {
  // Show loading indicator
  $scope.message = 'loading...';
   $scope.loading = true;
   auth.signin({
     connection: 'Username-Password-Authentication',
     username: $scope.user,
     password: $scope.pass,
     authParams: {
       scope: 'openid name email' //Details: https://auth0.com/docs/scopes
     }
   }, onLoginSuccess, onLoginFailed);
 };
```

Notice that this time we specify the type of connection, and if `Username-Password-Authentication` provide the username and password for the authentication. When performing a social login, you do not need to supply these properties actually but rather tell Auth0 which provider we want to use:

```js
/* ===== ./login/login.js ===== */
$scope.googleLogin = function () {
  // Show loading indicator
  $scope.message = 'loading...';
  $scope.loading = true;

  auth.signin({
    popup: true,
    connection: 'google-oauth2',
    scope: 'openid name email'
  });
};
```

You can then provide event handlers to handle each process:

```js
/* ===== ./app.js ===== */
//Called when login is successful
   authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', '$rootScope',
   function($location, profilePromise, idToken, store, $rootScope) {
     // Successfully log in
     // Access to user profile and token
     profilePromise.then(function(profile){
       // Empty loading message
        $rootScope.message = '';
        //Store credentials
        store.set('profile', profile);
        store.set('token', idToken);
        // Hide loading indicator
        $rootScope.loading = false;
        // Go home
        $location.path('/');
     });
   }]);

   //Called when login fails
   authProvider.on('loginFailure', function() {
     // If anything goes wrong
      $rootScope.message = 'invalid credentials';
      // Hide loading indicator
      $rootScope.loading = false;
   });

```

## Sign Up

Signup uses same options as signin API:

```js
/* ===== ./login/login.js ===== */
$scope.signup = function () {
  $scope.message = 'loading...';
 $scope.loading = true;
 auth.signup({
   connection: 'Username-Password-Authentication',
   username: $scope.user,
   password: $scope.pass,
   authParams: {
     scope: 'openid name email'
   }
 });
}
```

Below is the HTML template of the examples given above:

```html

<div class="jumbotron">
  <h2 class="text-center"><img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"></h2>
  <h2 class="text-center">Login</h2>
  <p class="text-center">{{message}}</p>
</div>

<div class="container">
  <div class="col-md-6 col-md-3">
    <div id="login-container">
      <form>
        <fieldset>
          <input class="form-control" type="text" name="user" ng-model="user" ng-disabled="loading" />
          <br>
          <input class="form-control" type="password" name="pass" ng-model="pass" ng-disabled="loading" />
          <br>
          <button class="btn btn-primary" type="submit" ng-disabled="loading" ng-click="login()">Login</button>
          <button class="btn btn-primary" type="submit" ng-disabled="loading" ng-click="signup()">Sign Up</button>
        </fieldset>
      </form>

      <a href="" ng-click="googleLogin()">Login with Google</a><br/>
    </div>
  </div>
</div>
```

![Custom Login](/media/articles/angularjs/custom_login.png)

Now you see we can do with Lock and roll out our own fancy login/signup widget.

## Recap
- Custom Login
- Custom Sign up
- Custom OAuth
