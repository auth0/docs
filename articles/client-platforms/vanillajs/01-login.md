---
title: Login
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../../_includes/_signup') %>

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
