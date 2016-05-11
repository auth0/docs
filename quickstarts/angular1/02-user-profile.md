---
title: User Profile
name: Angularjs-user-profile
alias:
  - angular
  - angularjs
language:
  - Javascript
framework:
  - AngularJS
image: /media/platforms/angular.png
tags:
  - quickstart
  - angular
snippets:
  dependencies: /quickstarts/angular1/snippets/dependencies
  init: /quickstarts/angular1/snippets/init
  head: /quickstarts/angular1/snippets/head
alias:
  - angular
---

TODO: Find out how to configure angular-sample URL
<%= include('../_includes/_package', {
  pkgRepo: 'auth0-angular',
  pkgBranch: 'master',
  pkgPath: 'examples/widget-redirect',
  pkgFilePath: null,
  pkgType: 'js'
}) %>_

It is simple to access users' information using the Angular SDK. User profiles can be accessed in 2 ways:

- In config using events (eg: `loginSuccess`);
- Via controllers

## Accessing user profile with events

You can subscribe to custom events which are called at certain phases of authentication process. One of which is `loginSuccess` which you can access a user's profile from it's callback function. The event is configured in angular's `config` method using the `authProvider` as a dependency:

```js
app.config(function myAppConfig (authProvider) {
  uthProvider.on('loginSuccess', function($rootScope, profile) {
    // You can attach it to your global scope
    // and have access to it across your application
    $rootScope.profile = profile;
  });
});
```

The profile is a JavaScript object that you can access it's properties. You have the profile data on Angular's scope object so you can bind to your view or do whatever you want with the information:

```html
<span>{{profile.name}}</span>
```
## Accessing user profile via controllers

It might not be convenient enough to subscribe to a global event. It is normal to want to just grab the user profile immediately after authentication (sign in or sign up). You can do this in your controller:

```js
app.controller('LoginCtrl', function ($scope, auth) {
  // Add auth to $scope object so you can bind to view
  $scope.auth = auth;

  $scope.signin = function (){
    auth.signin({}, //The first argument is used to configure Auth0
      function(profile, idToken){
        $scope.token = idToken;
        $scope.controllerProfile = profile;
      },
      function(err) {
        $scope.err = err;
      });
  }
});
```

You can bind to view as usual:

```html
  <p>Profile from controller: {{controllerProfile.name}}</p>
```

## Storing and retrieving tokes
The challenge in most SPA application is persisting state (data).  Once there is a refresh, the profile in our scope object gets wiped. The best way to manage this is store this profile on the user's browser and maybe re-authenticate the user if a page refresh occurs.

Auth0 provides a convenient library for Angular called [Angular Storage](https://github.com/auth0/angular-storage) which uses `localStorage` or `sessionStorage` by default and cookies if those are not available. We already included it in out HTML in step 1 of this quickstart but you can still add it if you are yet to do so:

```html
<script src="http://cdn.rawgit.com/auth0/angular-storage/master/dist/angular-storage.js" type="text/javascript"> </script>
```

It is an Angular dependent library so add it to your angular app:

```js
angular.module('app', ['auth0', 'angular-storage']);
```

Now update the controller to store the profile as soon as it is retrieved:

```js
  // Don't forget to add store as a dependency
app.controller('LoginCtrl', function ($scope, auth, store) {
  // Add auth to $scope object so we can bind to view
  $scope.auth = auth;

  $scope.signin = function (){
    auth.signin({}, //The first argument is scope of data you need to return
      function(profile, idToken){
        // Store user profile
        store.set('profile', profile);
        $scope.token = idToken;
        $scope.controllerProfile = profile;
      },
      function(err) {
        $scope.err = err;
      });
  }
});
```

At this point, no matter the amount of refresh that hits the app, you can still access the user details from the browser storage.

## Authenticating user with profile
Just as you saw above, you can store a user's profile and have access to it from any part of your application. This becomes handy when handling page refresh as there is need to authenticate user. Fortunately, Auth0 makes it easy to authenticate users with there profiles:

```js
app.run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {

    var token = store.get('token');
    if (token) {
      if (!auth.isAuthenticated) {
        //Re-authenticate user if token is valid
        auth.authenticate(store.get('profile'), token);
      }
    }
  });
});
```

All you need do is listen to `locationChangeStart` event and re-authenticate the user with the profile stored in the browser. As seen, above, the token can also be stored and retrieved from the browser storage. What would be nice to consider is making sure the token is still valid (not expired) but will talk more on that in subsequent sections.

## Checking if user is authenticated or not
One other nice thing that is handy is that you can use custom directives to check if user authenticated or not in your view:

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
