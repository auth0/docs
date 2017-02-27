---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0 to be displayed in a profile area in an AngularJS application
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '03-User-Profile',
  requirements: [
    'Angular 1.6'
  ]
}) %>

<%= include('../../_includes/_user_profile_preamble') %>

## Request the Profile Scope

The `access_token` requires a `scope` of `openid profile` to successfully retrieve the user's information. Add this to your Lock instance.

```js
// src/app/auth/auth.service.ts

lockProvider.init({ ..., options: {
    // ...
    auth: {
      // ...
      params: {
        scope: 'openid profile'
      }
    }
  }
});
``` 

## Make a Call for the User's Info

<%= include('../../_includes/_user_profile_lock_method') %>

Add a method which calls `getUserInfo` to the `authService`.

```js
// app/auth/auth.service.js

// ...
var userProfile;

//...
function getProfile(cb) {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw 'Access token must exist to fetch profile';
  }
  lock.getUserInfo(accessToken, function(err, profile) {
    if (profile) {
      setUserProfile(profile);
    }
    cb(err, profile);
  });
}

function setUserProfile(profile) {
  userProfile = profile;
}

function getCachedProfile() {
  return userProfile;
}
```

<%= include('../../_includes/_user_profile_in_memory') %>

## Add a Profile Area

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

Create a new controller called `profileController`.

```js
// app/profile/profile.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('ProfileController', profileController);

  profileController.$inject = ['authService', '$rootScope'];

  function profileController(authService, $rootScope) {

    var vm = this;
    vm.auth = authService;
    vm.profile;

    if (authService.getCachedProfile()) {
      vm.profile = authService.getCachedProfile();
    } else {
      authService.getProfile(function(err, profile) {
        vm.profile = profile;
      });
    }

  }

})();
```

The controller injects the `authService`, from which it checks for a populated `userProfile` object. If none is found, it makes a call to `getProfile` to retrieve the user's information.

The user's information can be displayed in a template.

```html
<!-- app/profile/profile.html -->

<div class="panel panel-default profile-area">
  <div class="panel-heading"><h3>Profile</h3></div>
  <div class="panel-body">
    <img ng-src="{{ vm.profile.picture }}" class="avatar" alt="avatar">
    <div>
      <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
      <h3 class="nickname">{{ vm.profile.nickname }}</h3>
    </div>
    <pre class="full-profile">{{ vm.profile | json }}</pre>
  </div>
</div>
```

<%= include('../../_includes/_user_profile_additional_info') %>