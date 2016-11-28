---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-javascript-spa',
  path: '07-Authorization'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/vanillajs/06-rules' }) %>

### Create a Rule to Assign Roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict a Route Based on User's Roles

To restrict access to certain routes, create a function that handles conditionally allowing or disallowing access to routes based on the user's `role`.

```js
// app.js

var route = function() {

  var id_token = localStorage.getItem('id_token');
  var current_location = window.location.pathname;

  if (id_token) {

    var profile = JSON.parse(localStorage.getItem('profile'));

    switch(current_location) {
      case "/":
        hide(document.getElementById('btn-login'));
        show(document.getElementById('btn-logout'));
        if (isAdmin(profile)) show(document.getElementById('btn-go-admin'));
        if (isUser(profile)) show(document.getElementById('btn-go-user'));
        break;
      case "/user.html":
        if (true != isUser(profile)) {
          window.location.href = "/";
        } else {
          show(document.querySelector('.container'));
          show(document.getElementById('btn-logout'));
          document.getElementById('nickname').textContent = profile.nickname;
        }
        break;
      case "/admin.html":
        if (true != isAdmin(profile)) {
          window.location.href = "/";
        } else {
          show(document.querySelector('.container'));
          show(document.getElementById('btn-logout'));
          document.getElementById('nickname').textContent = profile.nickname;
        }
        break;
    };
  } else { // user is not logged in.
    // Call logout just to be sure our local session is cleaned up.
    if ("/" != current_location) {
      logout();
    }
  }
};

// ...

var hide = function(element) {
  element.style.display = "none";
};

var show = function(element) {
  element.style.display = "inline-block";
};

route();
```

The route function checks to determine whether the user is authenticated and then checks to see if he/she is an `admin` or `user` by employing the `isAdmin` and `isUser` functions, respectively. This method checks if the `roles` attribute of `app_metadata` added by the rule contains either `admin` or `user`.

```js
// app.js

var isAdmin = function(profile) {
  if (profile &&
      profile.app_metadata &&
      profile.app_metadata.roles &&
      profile.app_metadata.roles.indexOf('admin') > -1) {
    return true;
  } else {
     return false;
  }
};

var isUser = function(profile) {
  if (profile &&
      profile.app_metadata &&
      profile.app_metadata.roles &&
      profile.app_metadata.roles.indexOf('user') > -1) {
    return true;
  } else {
     return false;
  }
};
```

Now, if the user logs in with an email that contains `@example.com`, they will be allowed to access the `/admin` route. Otherwise, the user will only be allowed to access `/` and `/user`.
