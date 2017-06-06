---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to your application
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '04-Authorization',
  requirements: [
    'jQuery 3.2.1'
  ]
}) %>

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes

Adjust your `app.js` file to use a local variable with any `scope`s you would like to request when users log in. Use this in the `auth0.WebAuth` instance.

```js
// app.js

var requestedScopes = 'openid profile read:messages write:messages';

var auth0 = new auth0.WebAuth({
  // ...
  scope: requestedScopes
});
``` 

<%= include('../_includes/_authz_set_session') %>

```js
// app.js

function setSession(authResult) {
  
  const scopes = authResult.scope || requestedScopes || '';

  // ...
  localStorage.setItem('scopes', JSON.stringify(scopes));
}
```

Add a function called `userHasScopes` which will check for a particular `scope` in local storage. This function should take an array of strings and check whether the array of `scope`s saved in local storage contains those values. The function can be used to conditionally hide and show various UI elements and to limit route access.

```js
// app.js

function userHasScopes(scopes) {
  var savedScopes = JSON.parse(localStorage.getItem('scopes'));
  if (!savedScopes) return false;
  var grantedScopes = savedScopes.split(' ');
  for (var i = 0; i < scopes.length; i++) {
    if (grantedScopes.indexOf(scopes[i]) < 0) {
      return false;
    }
  }
  return true;
}
```

## Conditionally Dislay UI Elements

The `userHasScopes` function can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```js
// app.js

// ...
function displayButtons() {
  // ...
  if (!isAuthenticated() || !userHasScopes(['write:messages'])) {
    adminViewBtn.css('display', 'none');
  } else {
    adminViewBtn.css('display', 'inline-block');
  }
}
```

## Protect Client-Side Routes

Limiting access to client-side routes can be done by checking which `scope`s the user has. This can be done with the `userHasScopes` function created in the previous step.

The way that the `userHasScopes` function gets applied to protect various client-side routes depends on the routing library being used. The examples presented here don't assume any particular router.

Some routing libraries provide hooks which will run a function before the route is activated. This kind of hook might be called something like `beforeEnter` or `onEnter`. This is a good place to run the `userHasScopes` function to check whether the user has the `scope`s required to enter the route.

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>