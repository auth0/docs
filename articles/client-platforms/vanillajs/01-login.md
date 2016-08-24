---
title: Login
description: This tutorial will show you how to use Auth0 to add authentication and authorization to your VanillaJS app.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps. In this case we will use Auth0's CDN.

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

### 1. Add the Auth0 scripts and set the viewport

Add the code below to the `index.html` file to include Auth0 library and its dependencies and set the viewport:

```html
<!-- ===== ./index.html ===== -->
<head>
  ...
  <!-- Auth0 lock script -->
  <script src="//cdn.auth0.com/js/lock/10.1.0/lock.min.js"></script>

  <!-- Setting the right viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  ...
</head>
```

### 2. Configure Lock

Configure Lock with your `client-ID` and `domain`:

To discover all the available options for `Auth0Lock`, see [the Lock customization documentation](/libraries/lock/customization).

```javascript
/* ===== ./app.js ===== */
...
var lock = new Auth0Lock('<%= account.clientId %>', '<%= account.namespace %>');
...
```

### 3. Implement the login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button.

```javascript
/* ===== ./app.js ===== */
...
var btn_login = document.getElementById('btn-login');
...

btn_login.addEventListener('click', function() {
  lock.show();
});
...
```

```html
<!-- ===== ./index.html ===== -->
...
<button type="submit" id="btn-login">Sign In</button>
...
```

After authentication, Auth0 will redirect the user back to your application with an identifying token. This token is used to retrieve the user's profile from Auth0 and to call your backend APIs.

In this example, the `id_token` is stored in `localStorage` to keep the user authenticated after each page refresh:

```javascript
/* ===== ./app.js ===== */
...
lock.on("authenticated", function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }
    localStorage.setItem('id_token', authResult.idToken);
    // Display user information
    show_profile_info(profile);
  });
});
...
```

${browser}

### 4. Retrieve the user profile and display user information

Use the `id_token` to retrieve the user profile and display the user's nickname:

```javascript
/* ===== ./app.js ===== */
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
<!-- ===== ./index.html ===== -->
...
<img alt="avatar" id="avatar" style="display:none;">
<p>Welcome <span id="nickname"></span></p>
...
```

To discover all the available properties of a user's profile, see [Auth0 Normalized User Profile](/user-profile). Note that the properties available depend on the social provider used.

### 5. Log out

In this implementation, a log out involves simply deleting the saved token from `localStorage` and redirecting the user to the home page:

```javascript
/* ===== ./app.js ===== */
...
var logout = function() {
  localStorage.removeItem('id_token');
  window.location.href = "/";
};
...
```

## Summary

In this guide we saw how to use `Lock` widget in order to log users into your VanillaJS project.
