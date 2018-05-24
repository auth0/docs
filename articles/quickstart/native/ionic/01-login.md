---
title: Login
default: true
description: This tutorial demonstrates how to add user login to an Ionic application using Auth0.
budicon: 448
github:
  path: 01-Login
---

<%= include('../_includes/_ionic_setup') %>

## Set Up URL Redirects

Use the `onRedirectUri` method from **auth0-cordova** when your app loads to properly handle redirects after authentication.

```js
// www/js/app.js

var Auth0Cordova = require('@auth0/cordova');

angular.module('yourApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // ...
    function handleUrl(url) {
      Auth0Cordova.onRedirectUri(url);
    }

    window.handleOpenURL = handleUrl;

  });
})

// ...
```

::: note
**Note:** The code samples shown in this tutorial assume that your app is using some kind of bundler like browserify or webpack to make npm modules available in a client application. The downloadable sample for this tutorial uses browserify to quickly bundle the JavaScript files for the app but you are free to use whichever bundler you like.
:::

## Create an Authentication Service and Configure Auth0

To coordinate authentication tasks, it's best to set up an injectable service that can be reused across the application. This service needs methods for logging users in and out, as well as checking their authentication state. Be sure to replace `YOUR_PACKAGE_ID` with the identifier for your app in the configuration block.

```js
// www/js/services.js

angular.module('starter.services', [])

.factory('Auth', function($rootScope) {

  var Auth0Cordova = require('@auth0/cordova');
  var auth0 = require('auth0-js');
  var userProfile = {};

  var auth0Config = {
    clientId: '${account.clientId}',
    domain: '${account.namespace}',
    callbackURL: location.href,
    packageIdentifier: 'YOUR_PACKAGE_ID'
  };

  auth0Config.clientID = auth0Config.clientId;

  var webAuth = new auth0.WebAuth(auth0Config);

  function setSession(authResult) {
    var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    window.localStorage.setItem('access_token', authResult.accessToken);
    window.localStorage.setItem('id_token', authResult.idToken);
    window.localStorage.setItem('expires_at', expiresAt);
  }

  function isAuthenticated() {
    var expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  function getProfile(cb) {
    var accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        userProfile = profile;
      }
      cb(err, profile);
    });
  }

  function login() {
    var client = new Auth0Cordova(auth0Config);

    var options = {
      scope: 'openid profile offline_access'
    };

    client.authorize(options, function(err, authResult) {
      if (err) {
        throw new Error(err);
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        $rootScope.$apply();
      }
    });
  }

  function logout() {
    window.localStorage.removeItem('profile');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');
  }

  return {
    login: login,
    logout: logout,
    getProfile: getProfile,
    isAuthenticated: isAuthenticated
  };
});

```

## Add Login and Logout Controls

Add controls to your app to allow users to log in and log out. The controls should call the `login` and `logout` methods from the `Auth` service. Start by injecting the `Auth` service in a controller.

```js
// www/js/controllers.js

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Auth) {
  $scope.auth = Auth;
})
```

The `Auth` service is now accessible in the view and its `login` method can be called.

```html
<!-- www/templates/tab-home.html -->

<button
  ng-if="!auth.isAuthenticated()"
  class="button button-block button-positive"
  ng-click="auth.login()">
    Log In
</button>

<button
  ng-if="auth.isAuthenticated()"
  class="button button-block button-assertive"
  ng-click="auth.logout()">
    Log Out
</button>
```

The **Log In** button is only displayed if the user has an unexpired Access Token in local storage which is the indication that they are authenticated. The **Log Out** button is only displayed if the user isn't authenticated.

## Display Profile Data

Your application will likely require some kind of profile area for users to see their information. Depending on your needs, this can also serve as the place for them to log out of the app.

Create a controller for a **Profile** area and make use of the `Auth` service within it.

```js
// www/js/controllers.js

angular.module('starter.controllers', [])

// ...
.controller('ProfileCtrl', function($scope, Auth) {
  $scope.auth = Auth;

  if (Auth.isAuthenticated()) {
    if (Auth.userProfile) {
      $scope.profile = Auth.userProfile;
    } else {

      Auth.getProfile(function(err, profile) {
        if (err) {
          return alert(err);
        }
        $scope.$evalAsync(function() {
          $scope.profile = profile;
        });
      });
    }
  }

});
```

The `getProfile` method from the `Auth` service makes a call to Auth0 for the user's profile and saves the result in a `userProfile` object in the `Auth` service.

The `ProfileCtrl` controller first checks whether the `userProfile` object is populated. If it is, that object is used to power the **Profile** view. If it isn't, a call to Auth0 is made for the profile.

Create a view for the profile.

```html
<!-- www/templates/tab-profile.html -->

<ion-view view-title="Profile">
  <ion-content class="padding">
    <div ng-if="!auth.isAuthenticated()">
      <p>Please log in to view your profile.</p>
    </div>
    <div ng-if="auth.isAuthenticated()" class="list card">
      <div class="item item-avatar">
        <img src="{{ profile.picture }}" alt="avatar">
        <h3>{{ profile.name }}</h3>
        <h4>{{ profile.nickname  }}</h4>
      </div>
      <div class="item item-body">
        <pre>{{ profile | json }}</pre>
      </div>
    </div>
  </ion-content>
</ion-view>
```

### Troubleshooting

#### Cannot read property 'isAvailable' of undefined

This means that you're attempting to test this in a browser. At this time you'll need to run this either in an emulator or on a device.
