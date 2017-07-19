---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to your application
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '04-Authorization',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `Auth` Service

Adjust your `Auth` service to use a local member with any `scope`s you would like to request when users log in. Use this member in the `auth0.WebAuth` instance.

```js
// src/Auth/Auth.js

requestedScopes = 'openid profile read:messages write:messages';

auth0 = new auth0.WebAuth({
  // ...
  scope: this.requestedScopes
});
``` 

<%= include('../_includes/_authz_set_session') %>

```js
// src/Auth/Auth.js

setSession(authResult) {

  const scopes = authResult.scope || this.requestedScopes || '';

  // ...
  localStorage.setItem('scopes', JSON.stringify(scopes));
}
```

<%= include('../_includes/_authz_user_has_scopes') %>

```js
// src/Auth/Auth.js

userHasScopes(scopes) {
  const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
  return scopes.every(scope => grantedScopes.includes(scope));
}
```

## Conditionally Display UI Elements

The `userHasScopes` method can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```js
// src/App.js

// ...
render() {
  const { isAuthenticated, userHasScopes } = this.props.auth;

  return (
    <div>
      // ...
      {
        isAuthenticated() &&  userHasScopes(['write:messages']) && (
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'admin')}
            >
              Admin
            </Button>
          )
      }
    </div>
  );
}
```

## Protect Client-Side Routes

For some routes in your application, you may want to only allow access if the user is authenticated. This check can be made in the `render` function for whichever route you like.

```js
// src/routes.js

<Route path="/ping" render={(props) => (
  !auth.isAuthenticated() ? (
    <Redirect to="/home"/>
  ) : (
    <Ping auth={auth} {...props} />
  )
)} />
```

In this example, if an unauthenticated user tries to access the `/ping` route, they will be redirected to `/home`.

### Limit Route Access Based on `scope`

To prevent access to client-side routes based on a particular `scope`, make a call to `userHasScopes` in the route's `render` function

```js
// src/routes.js

<Route path="/admin" render={(props) => (
  !auth.isAuthenticated() || !auth.userHasScopes(['write:messages']) ? (
    <Redirect to="/home"/>
  ) : (
    <Admin auth={auth} {...props} />
  )
)} />
```

The user will now be redirected to the `/home` route unless they have a `scope` of `write:messages`.

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>
