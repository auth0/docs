---
title: Calling an API
description: This tutorial demonstrates how to add authorization and access control to a jQuery app with Auth0
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '05-Authorization',
  requirements: [
    'jQuery 3.1'
  ]
}) %>

<%= include('../../_includes/_authz_preamble') %>

<%= include('../../_includes/_authz_assigning_role') %>

<%= include('../../_includes/_authz_check_admin_role') %>

Install the **jwt-decode** library so that the user's `id_token` can easily be decoded.

```bash
npm install --save jwt-decode
```

Create methods for checking the user's `role` and whether it is equal to `admin`.

```js
// app.js

function getRole() {
  var namespace = 'https://example.com';
  var idToken = localStorage.getItem('id_token');
  if (idToken) {
    return jwt_decode(idToken)[namespace + '/role'] || null;
  }
}

function isAdmin() {
  return getRole() === 'admin';
}
``` 

The `isAdmin` method can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```js
// src/App.js

function displayAsAdmin() {
  // button to access admin content
  $('#btn-admin').show();
}

if (isAuthenticated()) {
  displayAsAuthenticated();
  // ...
} else {
  displayAsNotAuthenticated();
}
if (isAdmin()) {
  displayAsAdmin();
}
```

<%= include('../../_includes/_authz_api_access_control') %>

```js
// app.js

var lock = new Auth0Lock(..., {
  // ...
  auth: {
    // ...
    params: { 
      scope: 'openid profile read:messages' 
    }
  }
});
```

<%= include('../../_includes/_authz_api_access_control_end') %>