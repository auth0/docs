---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 500
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '07-Authorization'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/docs/quickstart/spa/jquery/06-rules' }) %>

### Create a Rule to assign roles

<%= include('../_includes/_authorization-create-rule') %>

## Restrict a route based on user's roles

In order to restrict access to certain routes, we are going to use a `switch` inside *route* function (executed every time the page is loaded).

```javascript
// app.js

...

var route = function() {
  var id_token = localStorage.getItem('id_token');
  var current_location = window.location.pathname;
  if (undefined != id_token) {
    var profile = JSON.parse(localStorage.getItem('profile'));

    switch(current_location) {
      case "/":
        $('#btn-login').hide();
        $('#btn-logout').show();
        if (isAdmin(profile)) { $('#btn-go-admin').show(); }
        if (isUser(profile)) { $('#btn-go-user').show(); }
        break;
      case "/user.html":
        if (true != isUser(profile)) {
          window.location.href = "/";
        } else {
          $('.container').show();
          $('#btn-logout').show();
          $('#nickname').text(profile.nickname);
        }
        break;
      case "/admin.html":
        if (true != isAdmin(profile)) {
          window.location.href = "/";
        } else {
          $('.container').show();
          $('#btn-logout').show();
          $('#nickname').text(profile.nickname);
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

route();
...
```

The route function checks if the user is authenticated then checks if he/she is an *admin* or *user* using `isAdmin` and `isUser` functions, respectively. This method checks if the `roles` attribute of `app_metadata` added by the rule contains `admin` or `user`:

```javascript
// app.js

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
