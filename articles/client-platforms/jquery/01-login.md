---
title: Login
description: This tutorial demonstrates how to use the Auth0 jQuery SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '01-Login'
}) %>

${include('../\_callback')}

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_login') %>

## 4. Retrieve the User Profile and Display User Information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```js
//retrieve the profile

var id_token = localStorage.getItem('id_token');
if (id_token) {
  lock.getProfile(id_token, function (err, profile) {
    if (err) {
      return alert('There was an error getting the profile: ' + err.message);
    }
    // Display user information
    $('.nickname').text(profile.nickname);
    $('.avatar').attr('src', profile.picture);
  });
}
```

```html
  <!-- index.html -->

  <img class="avatar">
  <p>Welcome <span class="nickname"></span></p>
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

## 5. Log Out

In this implementation, a logout involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
// app.js

localStorage.removeItem('id_token');
userProfile = null;
window.location.href = "/";
```
