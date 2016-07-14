---
title: Login
description: Login with Lock Tutorial
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/01-Login',
}) %>

#### 1: Configure The Angular Application
To use Auth0, your Angular app instance **MUST** depend on the Auth0 service:

```javascript
/* ===== ./app.js ===== */
angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute']);
```
We also injected the supporting dependencies as we will need them while we move on.

It is common to forget to bootstrap your app. You can do that the simple way in your entry `index.html` file (seed project already handled this):

```html
<html ng-app="YOUR-APP-NAME">
```

An Auth0-Angular app requires to be configured using `authProvider` by providing app instance config object to it:


Angular's `config()` skeleton with required dependency:
```javascript
/* ===== ./app.js ===== */
app.config(function myAppConfig (authProvider) {
  //authProvider init configuration
})
```

The `init()` method is used to configure Auth0 Angular SDK:

${snippet(meta.snippets.setup)}

#### 2A: Login

You have successfully configured you Angular App to use Auth0. Configs are vital but won't run an app, right? Let's add a login functionality:

```javascript
/* ===== ./login/login.js ===== */
app.controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth) {
  //
  $scope.auth = auth;
}]);
```

Your controller needs to depend on `auth` so as to have access to it's methods. You can bind the function as an event to an on-click event in your view:
```html
<!-- ===== ./login/login.html ===== -->
<a ng-click="auth.signin()">Login</a>
```

At this point, the lock widget will pop up showing a Sign In form, when you click the Login button. The widget has options for non-existing users to signup or reset there passwords.

${browser}

Your app will need to exit and the user taken to the authentication provider when you try to login. After authentication, the user will be redirected to the app but with all states of the app lost (or rather reset). The implication is that callbacks cannot be used with `auth.signin()`, therefore, no way to get hold of user authentication details. You can use events provided in the SDK to manage lifecycle efficiently. The events are configured in the `run()` method:

```javascript
/* ===== ./app.js ===== */
.run(['$rootScope', 'auth', function runFunction ($rootScope, auth){
  // Called when lock shows
  auth.lockOn('show', function () {
    alert('shown');
  });
  // Called when lock hides
  auth.lockOn('hide', function () {
    alert('hidden');
  });
  // Called when authentication is successful
  auth.lockOn("authenticated", function(authResult) {
    console.log(authResult);
    auth.getProfile(authResult.idToken).then(function (profile) {

      console.log(profile);

    })
  });
  // Called when authentication fails
  auth.lockOn("error", function(error) {
    console.log(error);
  });
}])
```

The Lock widget also gives you the power to specify additional fields for the signup form. Email and password might not just suit your project specification and you would need to get more user details. You can specify more fields while configuring the application:

```js
authProvider.init({
    domain: 'samples.auth0.com',
    clientID: 'gbVTAtzkesLnTcZQOhxec3S6bSpe31Je',
    loginUrl: '/login',
    additionalSignUpFields: [{
      name: "address",                              // required
      placeholder: "enter your address",            // required
      icon: "https://example.com/address_icon.png", // optional
      prefill: "street 123",                        // optional
      validator: function(value) {                  // optional
        // only accept addresses with more than 10 chars
        return value.length > 10;
      }
    }]
  });
```

You can see more options to make Lock better for your need here: https://auth0.com/docs/libraries/lock/v10/new-features

#### 3: Routes Access Restrictions
You can protect Angular routes that you do not want guest users to have access to. You do so by adding another property called `requiresLogin` to the routes configuration:

```javascript
/* ===== ./app.js ===== */
$routeProvider
  .when( '/', {
    controller: 'HomeCtrl',
    templateUrl: 'home/home.html',
    requiresLogin: true
  })
  .when( '/settings', {
    controller: 'SettingsCtrl',
    templateUrl: 'settings/settings.html',
    requiresLogin: true
  })
  .when( '/login', {
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
 // ...rest of config
```

Then in init method, add a fallback URL (`loginUrl`) when a user is denied access:

```javascript
authProvider.init({
  domain: '<%= account.namespace %>',
  clientID: '<%= account.clientId %>',
  loginUrl: '/login'
});
```

If you choose to use UI Router:

```javascript
$stateProvider
  .state('settings', {
    url: '/settings',
    templateUrl: 'settings/settings.html',
    controller: 'SettingsCtrl',
    data: { requiresLogin: true }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
```

```javascript
authProvider.init({
  domain: '<%= account.namespace %>',
  clientID: '<%= account.clientId %>',
  loginState: 'login'
});
```

#### 4: Handling Tokens and Re-authenticating Users
As you have seen, it is difficult to manage states in SPA if you are dealing with a lot of redirects and page reloads. One thing you need to make available to the client (browser) no matter what actions the user perform is the authentication token. What you can do is use the Angular Storage library to persist users tokens and profile details to the browser's storage (sessionStorage or localStorage). With that strategy, you can always use the user's profile to re-authenticate them, or do a token refresh if the token is no longer valid. Update the `signin` logic to store the credentials prior to authentication:

```javascript
/* ===== ./app.js ===== */
.run(['$rootScope', 'auth', 'store', function runFunction ($rootScope, auth, store){
// Wrapper function to handle profile and toke storage
  var saveUserInfo = function(profile, token) {
    store.set('profile', profile);
    store.set('token', token);
  };
// Called when authentication is successful
  auth.lockOn("authenticated", function(authResult) {
    console.log(authResult);
    auth.getProfile(authResult.idToken).then(function (profile) {

      console.log(profile);
      // Save user info to local storage
      saveUserInfo(profile, authResult.idToken);
    })
  });
}])
```

With a persisted token and profile, you can do the following when you loose state (eg: page reload):

```javascript
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', function($rootScope, auth, store, jwtHelper, $location) {
  // Listen to a location change event
  $rootScope.$on('$locationChangeStart', function() {
    // Grab the user's token
    var token = store.get('token');
    // Check if token was actually stored
    if (token) {
      // Check if token is yet to expire
      if (!jwtHelper.isTokenExpired(token)) {
        // Check if the user is not authenticated
        if (!auth.isAuthenticated) {
          // Re-authenticate with the user's profile
          // Calls authProvider.on('authenticated')
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Show the login page
         $location.path('/');
      }
    }

  });
}])
```

First thing to note is that we just introduced a dependency which is from the Angular JWT library. The `jwtHelper` helps you to check if the user's token is valid by passing the token to it's `isTokenExpired()` method. The most interesting to to note is that we listen to Angular's location change event, so some important check on the token and authentication status, and then re-authenticate the user with the stored profile. If the token is invalid, you can redirect to login page.


### Recap
You have seen how to:
- Setup Auth0 in an Angular project
- Configure Angular with Auth0 credentials and authentication status events
- Authentication
- Managing routes
- Handling tokens
- Battling SPA challenges
