---
title: Calling an API
description: This tutorial demonstrates how to add authorization and access control to a React app with Auth0
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '05-Authorization',
  requirements: [
    'React 15'
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
// src/Auth/Auth.js

getRole() {
  const namespace = 'https://example.com';
  const idToken = localStorage.getItem('id_token');
  return decode(idToken)[`${namespace}/role`] || null;
}

isAdmin() {
  return this.getRole() === 'admin';
}
``` 

The `isAdmin` method can now be used alongside `isAuthenticated` to conditionally show and hide certain UI elements based on those two conditions.

```js
// src/App.js

class App extends Component {
  // ...
  render() {
    const { isAuthenticated, isAdmin } = this.props.route.auth;

    return (
      <div>
        // ...
        {
          isAuthenticated() && isAdmin() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'admin')}
              >
                Admin Area
              </Button>
            )
        }
      </div>
    );
  }
}

export default App;
```

<%= include('../../_includes/_authz_protect_client_routes') %>

To prevent access to client-side routes based on a `role` completely, create a function which checks whether the user has a `role` of `admin` and redirects them to the `home` route if they do not. Some of the routes in your application may only require that the user be authenticated. For these scenarios, you can provide a function which only checks whether the user is authenticated.

```js
// src/routes.js

const requireAuth = (nextState, replace) => {
  if (!auth.isAuthenticated()) {
    replace({ pathname: '/home' });
  }
}

const requireAdmin = (next, replace) => {
  if (!auth.isAuthenticated() || !auth.isAdmin()) {
    replace({ pathname: '/home' });
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} auth={auth} />
      <Route path="profile" component={Profile} auth={auth} onEnter={requireAuth} />
      <Route path="admin" component={Admin} auth={auth} onEnter={requireAdmin} />
      <Route path="ping" component={Ping} auth={auth} onEnter={requireAuth} />
      <Route path="callback" component={Callback} />
    </Route>
  );
}
```

When an unauthenticated user tries to enter the `profile` or `ping` routes, they will be redirected to `home`. Similarly, if an authenticated user tries to access the `admin` route but doesn't have a `role` of `admin`, they will be redirected as well.

<%= include('../../_includes/_authz_client_routes_disclaimer') %>

<%= include('../../_includes/_authz_api_access_control') %>

```js
// src/Auth/Auth.js

lock = new Auth0Lock(..., {
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