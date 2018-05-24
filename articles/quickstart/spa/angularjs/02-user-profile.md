---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0.
budicon: 292
github:
  path: 02-User-Profile
---
<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

To retrieve user information, request a scope of `openid profile` in the `angularAuth0Provider` options. 

```js
// app/app.js

angularAuth0Provider.init({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Information

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a method that calls the `client.userInfo` method to the `authService` service.

```js
// app/auth/auth.service.js

var userProfile;

function getProfile(cb) {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
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

You can adjust how you show profile information to your users. Some applications have a dedicated profile section for displaying user information. The example below shows how to set it up. 

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

The component first looks for a profile cached on the service. If it doesn't find the profile, the component calls the `getProfile` function to get the user's profile from Auth0.

<%= include('../_includes/_user_profile_additional_info') %>
