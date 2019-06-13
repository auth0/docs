---
title: Authorization
description: This tutorial demonstrates how to add authorization and access control to a React application.
budicon: 546
topics:
  - quickstarts
  - spa
  - react
  - authorization
github:
  path: 04-Authorization
sample_download_required_data:
  - client
  - api
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_authz_preamble') %>

<%= include('../_includes/_authz_determining_scopes') %>

## Handle Scopes in the `Auth` Service

Add a local member to your `Auth` service and initialize it with all the scopes you want to request when users log in. Use this member when initializing your instance of the `auth0.WebAuth` object.

```js
// src/Auth/Auth.js

// ...

scopes;
requestedScopes = 'openid profile read:messages write:messages';

auth0 = new auth0.WebAuth({
  // ...
  scope: this.requestedScopes
});
``` 

<%= include('../_includes/_authz_set_session') %>

```js
// src/Auth/Auth.js

// ...

setSession(authResult) {
  // ...

  // Set the users scopes
  this.scopes = authResult.scope || this.requestedScopes || '';

  // ...
}

// ...

```

<%= include('../_includes/_authz_user_has_scopes') %>

```js
// src/Auth/Auth.js

// ...

userHasScopes(scopes) {
  const grantedScopes = this.scopes.split(' ');
  return scopes.every(scope => grantedScopes.includes(scope));
}
```

## Conditionally Display UI Elements

You can use the `userHasScopes` method with the `isAuthenticated` method to show and hide certain UI elements.

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

You may want to give access to some routes in your application only to authenticated users. You can check if the user is authenticated with the `render` function.

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

In this example, if an unauthenticated user tries to access the `/ping` route, they are redirected to the `/home` route.

### Limit Route Access Based on Scopes

To prevent access to client-side routes based on a particular scope, make a call to the `userHasScopes` method in the route's `render` function.

If the user does not have the `write:messages` scope, they are redirected to the main route.

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

<%= include('../_includes/_authz_conditionally_assign_scopes') %>

<%= include('../_includes/_authz_client_routes_disclaimer') %>
