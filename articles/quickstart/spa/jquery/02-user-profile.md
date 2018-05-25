---
title: User Profile
description: This tutorial demonstrates how to fetch a user's information from Auth0.
budicon: 292
github:
  path: 02-User-Profile
---
<%= include('../_includes/_user_profile_preamble') %>

## Request the Profile Scope

To retrieve user information, request a scope of `openid profile` in the instance of the `WebAuth` object.

```js
// app.js

var webAuth = new auth0.WebAuth({
  // ...
  scope: 'openid profile'
});
``` 

## Make a Call for the User's Information

<%= include('../_includes/_user_profile_auth0js_method') %>

Add a function that calls the `client.userInfo` function to the `Auth` service.

```js
// app.js

var userProfile;

function getProfile() {
  if (!userProfile) {
    var accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, function(err, profile) {
      if (profile) {
        userProfile = profile;
        displayProfile();
      }
    });
  } else {
    displayProfile();
  }
}

function displayProfile() {
  // display the profile
  $('#profile-view .nickname').text(userProfile.nickname);
  $('#profile-view .full-profile').text(JSON.stringify(userProfile, null, 2));
  $('#profile-view img').attr('src', userProfile.picture);
}
```

<%= include('../_includes/_user_profile_in_memory') %>

## Add a Profile Template

Add a template to display the user's profile.

```html
<!-- index.html -->

<main class="container">
  <!-- home view -->
  <div id="home-view">
    <h4></h4>
  </div>

  <!-- profile view -->
  <div id="profile-view" class="panel panel-default profile-area">
    <div class="panel-heading"><h3>Profile</h3></div>
      <div class="panel-body">
        <img class="avatar" alt="avatar">
        <div>
          <label><i class="glyphicon glyphicon-user"></i> Nickname</label>
          <h3 class="nickname"></h3>
        </div>
        <pre class="full-profile"></pre>
      </div>
  </div>
</main>
```

<%= include('../_includes/_user_profile_additional_info') %>