---
title: Authorization
description: This tutorial will show you how to assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '07-Authorization',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/spa/vanillajs/06-rules' }) %>

### Create a Rule to assign roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict a route based on user's roles

In order to restrict access to certain routes, we are going to use a `switch` inside *route* function (executed every time the page is loaded).

```javascript
/* ===== ./app.js ===== */
...
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

...

var hide = function(element) {
  element.style.display = "none";
};

var show = function(element) {
  element.style.display = "inline-block";
};

route();
...
```

The route function checks if the user is authenticated then checks if he/she is an *admin* or *user* using `isAdmin` and `isUser` functions respectively. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin` or `user`:

```javascript
/* ===== ./app.js ===== */
...
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
...
```

Now, if a user logs in with an email that contains `@example`, he/she will be allowed to access the `/admin.html` route. Otherwise, the user is just allowed to access `/` and `/user.html` routes.

## Summary

In this guide we saw how to assign roles to your users through Auth0's management dashboard, and use those claims to authorize or deny a user to access certain routes in your VanillaJS project.
