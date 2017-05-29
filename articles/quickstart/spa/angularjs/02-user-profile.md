---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0
budicon: 292
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '02-User-Profile',
  requirements: [
    'AngularJS 1.6'
  ]
}) %>

<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

The user's `access_token` requires a `scope` of `openid profile` to successfully retrieve their information. In the `angularAuth0Provider` options, specify that you would like to ask for these scopes.

```js
// app/app.js

angularAuth0Provider.init({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Info

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method which calls `client.userInfo` to the `authService`.

```js
// app/auth/auth.service.js

var userProfile;

function getProfile(cb) {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }
  angularAuth0.client.userInfo(accessToken, function(err, profile) {
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

<%= include('../_includes/_user_profile_in_memory') %>

## Add a Profile Component

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

Create a new controller and view to display the profile.

```js
// app/profile/profile.controller.js

(function () {

  'use strict';

  angular
    .module('app')
    .controller('ProfileController', profileController);

  profileController.$inject = ['authService'];

  function profileController(authService) {

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

When the component is initialized, it first looks for a profile held in memory on the service. If none is found, it calls the `getProfile` function to fetch the user's profile from Auth0.

<%= include('../_includes/_user_profile_additional_info') %>