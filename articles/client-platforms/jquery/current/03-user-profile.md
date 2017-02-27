---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0 to be displayed in a profile area in a jQuery application
budicon: 292
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '03-User-Profile',
  requirements: [
    'jQuery 3.1'
  ]
}) %>

<%= include('../../_includes/_user_profile_preamble') %>

## Request the Profile Scope

The `access_token` requires a `scope` of `openid profile` to successfully retrieve the user's information. Add this to your Lock instance.

```js
// app.js

var lock = new Auth0Lock(..., {
  // ...
  auth: {
    // ...
    params: {
      scope: 'openid profile'
    }
  }
});
``` 

## Make a Call for the User's Info

<%= include('../../_includes/_user_profile_lock_method') %>

Add a method which calls `getUserInfo` to the `authService`.

```js
// app.js

// ...
var userProfile;

//...
function getProfile() {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw 'Access token must exist to fetch profile';
  }
  lock.getUserInfo(accessToken, function(err, profile) {
    userProfile = profile;
    if (profile) {
      $('.avatar').attr('src', profile.picture);
      $('.nickname').append(profile.nickname);
      $('.full-profile').append(JSON.stringify(profile, null, 2));
    }
  });
}
```

<%= include('../../_includes/_user_profile_in_memory') %>

## Add a Profile Area

The way your user's information gets displayed depends on the needs of your application, but a common implementation is to provide a dedicated profile area. The exact details are, of course, at your discretion.

```html
<!-- index.html -->

<div class="route" id="profile">
  <div class="panel panel-default profile-area">
    <div class="panel-heading">
      <h3>Profile</h3>
    </div>
    <div class="panel-body">
      <img src="" class="avatar" alt="avatar">
      <div>
        <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
        <h3 class="nickname"></h3>
      </div>
      <pre class="full-profile"></pre>
    </div>
  </div>
</div>
```

<%= include('../../_includes/_user_profile_additional_info') %>