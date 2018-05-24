---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to a Javascript application.
budicon: 546
github:
  path: 04-Authorization
---

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `app.js` File

Adjust your `app.js` file, so it uses a local member with any scopes you want to request when users log in. Use this member in your instance of the `auth0.WebAuth` object.

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

Add a function called `userHasScopes` that checks for scopes in local storage. Add an array of strings to the method. Check if the array of scopes saved in local storage contains those values. 
You can use this method to conditionally hide and show UI elements to the user and to limit route access.

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

## Conditionally Display UI Elements

You can use the `userHasScopes` function with the `isAuthenticated` function to show and hide certain UI elements.

```js
// app.js

// ...
function displayButtons() {
  // ...
  if (!isAuthenticated || !userHasScopes(['write:messages'])) {
    adminViewBtn.style.display = 'none';
  } else {
    adminViewBtn.style.display = 'inline-block';
  }
}
```

## Protect Client-Side Routes

You may want to give access to some routes in your application only to authenticated users. You can check if the user is authenticated with the `userHasScopes` function.

Depending on the routing library you use, you apply the `userHasScopes` function differently. 

Some routing libraries provide hooks which run a function before the route is activated. This kind of hook might be called something like `beforeEnter` or `onEnter`. This is a good place to run the `userHasScopes` function to check whether the user has the scopes required to enter the route.

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>
