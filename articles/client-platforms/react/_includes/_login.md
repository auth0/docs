## 1. Create an AuthService Class

The best way to have authentication utilities available across your application is to create a helper class. With the class in place, you can share an instance of it by passing it as a prop.

First, create an `AuthService` helper class to encapsulate the login functionality and save it inside the `src/utils` folder as `AuthService.js`.

Inside this class, create an `Auth0Lock` class that receives your Auth0 credentials and an options object. (For a list of  available options, see: [Lock: User configurable options](/libraries/lock/v10/customization)). Instead of hard-coding your credentials in this class, they are passed from the `AuthService` constructor parameters to the `Auth0Lock` instance.

With the `Auth0Lock` instance, you can hook a callback for the `authenticated` event. This event will be triggered after every successful login, passing the user authentication token (`idToken`) as a parameter. The `setToken` method stores the `idToken` value in local storage.

```js
// src/utils/AuthService.js

import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/login',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/home')
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}
```

The other helper methods shown above include: `login` (to call `lock.show()` and display the login widget), `logout` (to remove the local storage data), and `loggedIn` (that checks if an `idToken` exists and returns a boolean).

## 2. Use the AuthService to Protect Private Routes

To use the new class to protect routes, import `AuthService` in `src/views/Main/routes.js` and create a new instance.

```js
// src/views/Main/routes.js

import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

const auth = new AuthService('${account.clientId}', '${account.namespace}');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Route>
  )
}

export default makeMainRoutes
```

<%= include('_env-note') %>

In `routes.js`, there is now an `onEnter` callback assigned to the `/home` route. This calls `requireAuth`, which checks whether the user is authenticated, and redirects to `/login` if they are not.

## 3. Create the Login View

Create a new `Login` component and save it in `src/views/Main/Login/`. This React component should accept an `auth` object (which is an instance of the `AuthServce`) as a prop.

```js
// src/views/Main/Login/Login.js

import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
```

The **Login** button `onClick` event calls `login` to show the Auth0 Lock widget.

For this to work, `auth` needs to be included as a prop, which can be done from another component called `Container`.

## 4. Send `auth` from Router to Container Children

To use the `auth` parameter in various child components, it needs to be propagated down from from the `Container` component. 

```javascript
// src/views/Main/Container.js

import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'
import styles from './styles.module.css'

export class Container extends React.Component {
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <Jumbotron>
        <h2 className={styles.mainTitle}>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" />
        </h2>
        {children}
      </Jumbotron>
    )
  }
}

export default Container;
```