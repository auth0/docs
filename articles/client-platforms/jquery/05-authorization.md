---
title: Authorization
description: This tutorial demonstrates how to assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '07-Authorization',
  requirements: [
    'jQuery 3.1.0'
  ]
}) %>

The previous steps covered how to allow users to log into your application and how to protect API resources. This model works well for simple applications, but many apps will eventually require some way to restrict certain actions to subsets of users based on their access control level.

This step demonstrates how to assign roles to users and to allow the application to make decisions about what is and is not accessible based on these roles.

### Create a Rule to Assign a Role Claim

Auth0's rules pipeline can be used to assign users a role in a claim based on some condition. In this example, a role of either `admin` or `user` will be set for the user.

Go to the [New Rule](${manage_url}/#/rules/new) page in the Auth0 dashboard and create a rule which conditionally sets the user's role based on their email address.

```js
function (user, context, callback) {
  if (user.email.indexOf('@gmail.com') > -1) {
    context.idToken['https://yourdomain.com/role'] = 'admin';
  } else {
    context.idToken['https://yourdomain.com/role'] = 'user';
  }
  callback(null, user, context);
}
```

In this trivial example, the user is assigned a role of `admin` if their email address is from `gmail.com`. Otherwise, they are assigned a role of `user`. This rule can be customized to suit your business requirements. This `role` claim will be included in the user's `ID token`.

> **Note:** While it is not mandatory, claims should be namespaced to you application's domain name. In the rule above, `'https://yourdomain.com/role'` is used. The intent is to avoid collisions with other JWT claims. For more information, see the JWT specification's section on [public claims](https://tools.ietf.org/html/rfc7519#section-4.2).

## Conditionally Allow Access to Routes

A requirement for many applications is to conditionally hide and show UI elements to certain users based on their role. In addition to this, client-side routes often need to be restricted to users based on their access level.

With the rule above in place, the `role` claim in the user's **ID token** can be consulted and the value of this claim can be used to determine whether certain elements should be shown to the user and whether they should be allowed to access certain routes.

> **Note:** The routing implementation used here is a simple one and its purpose is to demonstrate intent. It may be more appropriate to use a stand-alone routing library for your jQuery application.

Provide a `getRole` function which accepts the user's **ID token** and returns the value of the `role` claim in its payload.

```js
// util.js

var namespace = 'https://yourdomain.com';

function isTokenExpired(token) {
  return jwt_decode(token).exp < Date.now() / 1000;
}

function getRole(idToken) {
  var decodedToken = jwt_decode(idToken);
  return decodedToken[namespace + '/role'];
}
```

Provide controls for routing the user to different areas of the application.

```html
<a href="/user.html" id="btn-go-user">Go to User Page</a>
<a href="/admin.html" id="btn-go-admin">Go to Admin Page</a>
```

Provide a `route` function which implements a simple routing solution.

```js
// app.js

function route() {
  var currentLocation = window.location.pathname;
  var idToken = localStorage.getItem('id_token');
  if (idToken && !isTokenExpired(idToken)) {
    var role = getRole(idToken);
    switch(currentLocation) {
      case "/":
        if (role === 'admin') { $('#btn-go-admin').show(); }
        if (role === 'admin' || role === 'user') { $('#btn-go-user').show(); }
        break;
      case "/user.html":
        if (!(role === 'admin' || role === 'user')) {
          window.location.href = "/";
        }
        break;
      case "/admin.html":
        if (role !== 'admin') {
          window.location.href = "/";
        }
        break;
    }    
  } else {
    // User is not logged in.
    // Call logout just to be sure the local session is cleaned up
    if (currentLocation !== '/') {
      logout();
    }
  }
}

route();
```

This `route` function makes use of the `role` claim in the user's **ID token** to determine whether the "Go to User Page" and "Go to Admin Page" buttons should be shown. In this scenario, users with a `role` of `admin` may navigate to either the **User** or **Admin** page since they have a high access level. Users with a `role` of `user` are only able to navigat to the **User** page.


