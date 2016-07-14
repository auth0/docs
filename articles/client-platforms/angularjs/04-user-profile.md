---
title: User Profile
description: How to access the user profile from within the app
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/04-User-Profile',
}) %>


## Fetching user profile with with `getProfile()`

You can subscribe to custom events which are called at certain phases of authentication process. One of which is `authenticated` which you can access a user's profile from it's handler. The event is configured in angular's `run` method using the `authProvider` as a dependency:

```js
/* ===== ./app.js ===== */
app.run(function myAppConfig (auth) {
  // Called when authentication is successful
    auth.lockOn("authenticated", function(authResult) {
      // Fetch profile
      auth.getProfile(authResult.idToken).then(function (profile) {
        // Bind
        $rootScope.userProfile = profile;

      })
    });
});
```

The profile is a JavaScript object that you can access it's properties. You have the profile data on Angular's scope object so you can bind to your view or do whatever you want with the information:

```html
<!-- ===== ./home/home.html ===== -->
<span>{{userProfile.name}}</span>
```

## Storing and retrieving profiles
Auth0 provides a convenient library for Angular called [Angular Storage](https://github.com/auth0/angular-storage) which uses `localStorage` or `sessionStorage` by default and cookies if those are not available to store data on the client (browser). You can refer to the previous on how to include the script and inject the Angular dependency.

Now update the event to store the profile as soon as it is retrieved:

```js
/* ===== ./app.js ===== */
app.run(function myAppConfig (auth) {
  var saveUserInfo = function(profile, token) {
   store.set('profile', profile);
   store.set('token', token);
 };
  // Called when authentication is successful
    auth.lockOn("authenticated", function(authResult) {
      // Fetch profile
      auth.getProfile(authResult.idToken).then(function (profile) {
        // Save user info to local storage
        saveUserInfo(profile, authResult.idToken);
        // Bind
        $rootScope.userProfile = profile;

      })
    });
});
```

You can retrieve any of the stored details as well:

```js
/* ===== ./home/home.js.js ===== */
app.controller('HomeCtrl', ['$scope', 'store', function ($scope, store){
  $scope.userProfile = store.get('profile');
}]);
```

```html
<div class="row">
   <div class="col-md-6 col-md-offset-3">
     <h3>Profile</h3>
     <img src="{{userProfile.picture}}" alt="">
     <p><strong>Name: </strong> {{userProfile.name}}</p>
     <p><strong>Email: </strong> {{userProfile.email}}</p>
     <p><strong>Nickname: </strong> {{userProfile.nickname}}</p>
     <p><strong>Created At: </strong> {{userProfile.created_at}}</p>
     <p><strong>Updated At: </strong> {{userProfile.updated_at}}</p>
   </div>
 </div>
```

![User profile](/media/articles/angularjs/user_profile.png)

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

## Recap

- Accessing user profile using events in config
- Accessing user profile in controllers
- Storing user profiles
- Authentication with profiles
