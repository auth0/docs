---
title: Authorization
description: This tutorial will show you how assign roles to your users, and use those claims to authorize or deny a user to access certain routes in the app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-react-sample',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-react-sample',
  pkgBranch: 'master',
  pkgPath: '07-Authorization',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/spa/react/06-rules' }) %>_

## 1. Create a Rule to assign roles

<%= include('../_includes/_authorization-create-rule') %>_

## 2. Check if user's role is present

After creating the new rule, let's update our helper class `AuthService` to provide a new method `isAdmin`. This method will be useful in other parts of the application. It returns `true` for admin users and `false` otherwise. Check the snippet included in `AuthService.js` file:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
...
export default class AuthService extends EventEmitter {
  ...// omitting some methods
  isAdmin(){
    // Checks if user have `admin` role in his profile app_metadata
    const profile = this.getProfile();
    const { roles } = profile.app_metadata || {};
    return !!roles && roles.indexOf('admin') > -1;
  }
}
```

## 3. Restrict a route based on the user's roles

In order to exemplify how to restric access to certain routes based on the user's roles, we are going to update the `routes.js` file. Now, besides of just protecting some routes for authenticated users, a new `/admin` route requires the current user to have an __admin__ role, redirecting to `/unauthorized` if auth.isAdmin() returns `false`. Take a look at the full `routes.js` code:

```javascript
/* ===== ./src/views/Main/routes.js ===== */
import React from 'react'
import {Route, IndexRedirect, Link} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Admin from './Admin/Admin'
import Unauthorized from './Unauthorized/Unauthorized'

// initializing the AuthService instance
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
// redirecting to saved url after a successful login
const redirectAfterLogin = (replace) => {
  const url = localStorage.getItem('redirect_after_login')
  if (url){
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
      <Route path="access_token=:token" component={Login} /> //to prevent router errors
    </Route>
  )
}

export default makeMainRoutes
```

Another feature introduced in above code is the correct redirecting after a successful login. Now it's storing the current url as a localStorage item before moving the user to login page, retrieving the value later in the `redirectAfterLogin` method.

## 4. Admin and Unauthorized Views

As a final step, add the View Components for the two new routes: `Admin` and `Unauthorized`. An example of their code is shown below:

```javascript
/* ===== ./src/views/Main/Admin/Admin.js ===== */
import React from 'react'
import {Link} from 'react-router'

export class Admin extends React.Component {
  render(){
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
/* ===== ./src/views/Main/Unauthorized/Unauthorized.js ===== */
import React from 'react'
import {Link} from 'react-router'

export class Unauthorized extends React.Component {
  render(){
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

That's it. Now you can verify that only users logged in with an email that contains `@example` (or following the rule you've introduced) will be able to access the `/admin` route.

## 5. Done!

You have implemented one of the available ways to add authorization with auth0 in your ReactJS project.
