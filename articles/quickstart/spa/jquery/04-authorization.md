---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to a jQuery application.
budicon: 546
github:
  path: 04-Authorization
---

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes

Adjust your `app.js` file to use a local variable with any scopes you want like to request when users log in. Use this variable in the instance of the `auth0.WebAuth` object.


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

Add a function called `userHasScopes` that checks for scopes in local storage. The function takes an array of strings and checks if the array of scopes saved in local storage contains those values. 

You can use this function to conditionally hide and show UI elements to the user and to limit route access.

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

You can use the `userHasScopes` function with the `isAuthenticated` function to conditionally show and hide certain UI elements.

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

You may want to give access to some routes in your application only to authenticated users. You can check if the user is authenticated with the `userHasScopes` function.

Depending on the routing library you use, you apply the `userHasScopes` function differently. Some routing libraries provide hooks which run a function before the route is activated. This kind of hook might be called something like `beforeEnter` or `onEnter`. This is a good place to run the `userHasScopes` function to check whether the user has the scopes required to enter the route.

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>