---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
budicon: 500
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '07-Authorization',
  requirements: [
    'React 15.3'
  ]
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/react/06-rules' }) %>_

## Create a Rule to Assign Roles

<%= include('../_includes/_authorization-create-rule') %>_

## Check if a User's Role is Present

After creating the new rule, update the `AuthService` helper class with a new `isAdmin` method. This method will be useful in other parts of your application. It returns `true` for admin users and `false` otherwise.

Included this snippet in the `AuthService.js` file:

```javascript
// src/utils/AuthService.js

export default class AuthService extends EventEmitter {
  // ...
  isAdmin() {
    // Checks if the user has an `admin` role in the profile app_metadata
    const profile = this.getProfile();
    const { roles } = profile.app_metadata || {};
    return !!roles && roles.indexOf('admin') > -1;
  }
}
```

## 3. Restrict a Route based on User's Roles

To demonstrate how to restrict access to certain routes based on a user's roles, you can update the `routes.js` file as shown below.

The new `/admin` route requires the current user to have an __admin__ role, and redirects to `/unauthorized` if `auth.isAdmin()` returns `false`.

Here is the complete `routes.js` code:

```javascript
// src/views/Main/routes.js

import React from 'react'
import {Route, IndexRedirect, Link} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import Unauthorized from './Unauthorized/Unauthorized'

// initializing the AuthService instance
const auth = new AuthService('${account.clientId}', '${account.namespace}');
// redirecting to saved url after a successful login
const redirectAfterLogin = (replace) => {
  const url = localStorage.getItem('redirect_after_login')
  if (url) {
    localStorage.removeItem('redirect_after_login')
    replace({ pathname: url })
  }
}
// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    // saving the current url to redirect later
    localStorage.setItem('redirect_after_login', nextState.location.pathname)
    replace({ pathname: '/login' })
  } else {
    redirectAfterLogin(replace)
  }
}
// onEnter callback to require admin role
const requireAdminAuth = (nextState, replace) => {
  if (!auth.isAdmin()) {
    replace({ pathname: '/unauthorized' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route onEnter={requireAuth}> // all nested routes require authentication
        <Route path="home" component={Home} />
        // only /admin route required also 'admin' role
        <Route path="admin" component={Admin} onEnter={requireAdminAuth} />
        <Route path="unauthorized" component={Unauthorized} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  )
}

export default makeMainRoutes
```

<%= include('_includes/_env-note') %>

Another feature introduced in the above code is correct redirection after a successful login. Now the current URL is stored as a local storage item before the user is directed to the login page. Later, the value is retrieved in the `redirectAfterLogin` method.

## Admin and Unauthorized Views

As a final step, add View Components for the two new routes: `Admin` and `Unauthorized` as shown below:

```javascript
// src/views/Main/Admin/Admin.js

import React from 'react'
import {Link} from 'react-router'

export class Admin extends React.Component {
  render() {
    return (
      <div>
        <h2>Admin</h2>
        <p>You are viewing this because you are logged in and you have 'admin' role</p>
        <Link to={'/home'}>Back to Home</Link>
      </div>
    )
  }
}

export default Admin;
```

```javascript
// src/views/Main/Unauthorized/Unauthorized.js

import React from 'react'
import {Link} from 'react-router'

export class Unauthorized extends React.Component {
  render() {
    return (
      <div>
        <h2>Unauthorized: you are not allowed to see this content</h2>
        <Link to={'/home'}>Back to Home</Link>
      </div>
    )
  }
}

export default Unauthorized;
```

Now you can verify that only users logged in with an email that contains `@example` (or whichever criteria is enforced by the rule you create) will be able to access the `/admin` route.

