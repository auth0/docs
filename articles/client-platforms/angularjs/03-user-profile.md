---
title: User Profile
description: test
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/02-User-Profile',
}) %>_

It is simple to access users' information using the Angular SDK. User profiles can be accessed in 3 ways:

- In config when using redirect mode with the help of events (eg: `loginSuccess`);
- Via controllers when using pop with the help of callbacks
- Using the `getProfile()` method

### Accessing user profile in redirect mode

You can subscribe to custom events which are called at certain phases of authentication process. One of which is `loginSuccess` which you can access a user's profile from it's callback function. Redirect modes do not support signin in with callbacks, therefore, this event is the only way to get users' profiles. The event is configured in angular's `config` method using the `authProvider` as a dependency:

```js
/* ===== ./app.js ===== */
app.config(function myAppConfig (authProvider) {
  //Called when login is successful
  authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', '$rootScope',
  function($location, profilePromise, idToken, store, $rootScope) {
    // Successfully log in
    // Access to user profile and token
    profilePromise.then(function(profile){
      // profile
      $rootScope.redirectModeProfile = profile
    });
    $location.url('/');
  }]);
});
```

The profile is a JavaScript object that you can access it's properties. You have the profile data on Angular's scope object so you can bind to your view or do whatever you want with the information:

```html
<!-- ===== ./home/home.html ===== -->
<span>{{redirectModeProfile.name}}</span>
```
### Accessing user profile via controllers

When using popup mode, callbacks can be used to get a user's profile if the authentication is successful:
```js
app.controller('LoginCtrl', function ($scope, auth) {
  /* ===== ./login/login.js ===== */

  $scope.auth = auth;

  $scope.signin = function (){
    auth.signin({popup: true},
      function(profile, idToken){
        $scope.popupModeProfile = profile;
      },
      function(err) {
        $scope.err = err;
      });
  }
});
```

You can bind to view as well:

```html
<!-- ===== ./home/home.html ===== -->
  <p>Profile from controller: {{popupModeProfile.name}}</p>
```

### Accessing user profile with `auth.getProfile()`

At any given time, you can call `getProfile` on `auth` passing in a token as the only argument. The method returns a promise which you can wait to resolve and grab the profile data:

```js
auth.getProfile(token).then(function(profile){
  // Profile can be used from here
})
```

## Storing and retrieving profiles
Auth0 provides a convenient library for Angular called [Angular Storage](https://github.com/auth0/angular-storage) which uses `localStorage` or `sessionStorage` by default and cookies if those are not available to store data on the client (browser). You can refer to the previous on how to include the script and inject the Angular dependency.

Now update the controller to store the profile as soon as it is retrieved:

```js
/* ===== ./login/login.js ===== */
  // Don't forget to add store as a dependency
app.controller('LoginCtrl', function ($scope, auth, store) {
  // Add auth to $scope object so we can bind to view
  $scope.auth = auth;

  $scope.signin = function (){
    auth.signin({popup: true},
      function(profile, idToken){
        // Store user profile
        store.set('profile', profile);
        $scope.token = idToken;
        $scope.popupModeProfile = profile;
      },
      function(err) {
        $scope.err = err;
      });
  }
});

// ================= OR
/* ===== ./app.js ===== */
app.config(function myAppConfig (authProvider) {
  //Called when login is successful
  authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', '$rootScope',
  function($location, profilePromise, idToken, store, $rootScope) {
    // Successfully log in
    // Access to user profile and token
    profilePromise.then(function(profile){
      // profile
      $rootScope.redirectModeProfile = profile
    });
    $location.url('/');
  }]);
});
```

You can retrieve any of the stored details as well:

```js
/* ===== ./home/home.js.js ===== */
app.controller('HomeCtrl', ['$scope', 'store', function ($scope, store){
  $scope.popupModeProfile = store.get('profile');
}]);
```

## Authenticating user with profile
Just as you saw above, you can store a user's profile and have access to it from any part of your application. This becomes handy when handling page refresh as there is need to re-authenticate the user. Fortunately, Auth0 makes it easy to authenticate users with there profiles:

```js
.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$''location',
  function($rootScope, auth, store, jwtHelper, $location) {
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
        // Either show the login page
        // $location.path('/');
        // .. or
        // or use the refresh token to get a new idToken
        auth.refreshIdToken(token);
      }
    }

  });
}])
```

## Checking if user is authenticated or not
One other nice thing that is handy in the SDK is that you can use custom directives to check if a user is authenticated or not in your view:

```html
<p if-user> {{profile.name}} </p>
```

```html
<p if-not-user> Please log in </p>
```

## Recap

- Accessing user profile using events in config
- Accessing user profile in controllers
- Storing user profiles
- Authentication with profiles
- Authentication status directives
