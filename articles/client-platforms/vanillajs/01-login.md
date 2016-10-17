---
title: Login
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '01-Login'
}) %>


**If you have an existing application, follow the steps below.**

${include('../\_callback')}

<%= include('_includes/_login') %>

### 4. Retrieve the User Profile and Display User Information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```js
// app.js

...

var retrieve_profile = function() {
  var id_token = localStorage.getItem('id_token');
  if (id_token) {
    lock.getProfile(id_token, function (err, profile) {
      if (err) {
        return alert('There was an error getting the profile: ' + err.message);
      }
      // Display user information
      show_profile_info(profile);
    });
  }
};

var show_profile_info = function(profile) {
  var avatar = document.getElementById('avatar');
  document.getElementById('nickname').textContent = profile.nickname;
  btn_login.style.display = "none";
  avatar.src = profile.picture;
  avatar.style.display = "block";
  btn_logout.style.display = "block";
};

...

retrieve_profile();
```

```html
<!-- index.html -->

...

<img alt="avatar" id="avatar" style="display:none;">
<p>Welcome <span id="nickname"></span></p>

...
```

To discover all of the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

## 5. Log out

In this implementation, a logout involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```js
// app.js

...

var logout = function() {
  localStorage.removeItem('id_token');
  window.location.href = "/";
};

...
```
