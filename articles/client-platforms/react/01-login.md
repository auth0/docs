---
title: Login
description: This tutorial will show you how to integrate Auth0 with ReactJS to add authentication and authorization to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/01-Login'
}) %>


## 1. Create the AuthService class

The best way to have authentication utilities available across the application is to create a helper class an share its instance to the React Components passing it as their props. Let's create the helper inside the `src/utils` folder to encapsulate the login functionality and name it `AuthService`.

We'll need an `Auth0Lock` instance, which receives your Auth0 credentials and an options object (check the available options [here](https://github.com/auth0/lock/tree/v10.0.0-rc.1#customization)). Instead of hard coding the credentials here, `AuthService` will receive Auth0 credentials as contructor parameters.

With the internal Auth0 Lock widget instance, we can hook a callback for the `authenticated` event. The event is emitted after every successful login, passing the user authentication token (`idToken`) as a parameter. For now we're storing the `idToken` value into `localStorage`.

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {})
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }
}
```

The other helper methods you see above are `login`, to call `lock.show()` and display the login widget, `logout` to remove the localStorage data and `loggedIn` that just checks if an `idToken` exists, returning a boolean.

## 2. Use AuthService to protect private routes

To use the new class to protect routes, just import `AuthService` in `src/views/Main/routes.js` and create a new instance. Below is the updated routes file.

```javascript
/* ===== ./src/views/Main/routes.js ===== */
import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

// onEnter callback to validate authentication in private routes
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

Notice you're creating the `auth` as an `AuthService` instance and sending your auth0 credentials. The variables `__AUTH0_CLIENT_ID__` and `__AUTH0_DOMAIN__` will be replaced by webpack using the content of `.env` file.

<% if (account.userName) { %>
If you don't have that file you can create your own using the following command:

```bash
$ echo "AUTH0_CLIENT_ID='${account.clientId}\nAUTH0_DOMAIN='${account.namespace}'" > .env
```
<% } else { %>
If you don't have that file you can create your own based on `.env.example` provided with the sample project. Copy that and edit the file adding your own credentials.

```bash
$ cp .env.example .env
```
<% } %>

Back to `routes.js`, we now have an onEnter callback assigned to `/home` route. It calls `requireAuth` to check if there is an authenticated user, redirecting to `/login` otherwise. The Login component does not exists yet, so let's create it next.

## 3. Create the Login view

Login is a new view component that should placed in `src/views/Main/Login/`:

```javascript
/* ===== ./src/views/Main/Login/Login.js ===== */
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

Basically, it's a React Component that expects an `auth` objects into its props, validated as an instance of `AuthService`. The Login button onClick event is calling the `login` to show auth0 login window.

If you run the application now you'll see an error in Login component, because `auth` is still not included in the props.

## 4. Send `auth` from router to Container children

To fix the Login component missing dependency, we need to propagate the `auth` parameter from `Container` component, that is receiving it from the route, to its children. The updated `src/views/Main/Container.js` is:

```javascript
/* ===== ./src/views/Main/Container.js ===== */
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

After the Container change, Login button should be working and redirecting to Home page after a successful authentication.

## 5. Logout Button

In Home view, you may want to show a button to logout, destroying the user session and redirecting to `/login` page. To accomplish that, the new Home component code should be something like:

```javascript
/* ===== ./src/views/Main/Home/Home.js ===== */
import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  logout(){
    // destroys the session data
    this.props.auth.logout()
    // redirects to login page
    this.context.router.push('/login');
  }

  render(){
    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;
```

### 6. All done!

You have completed the implementation of Login and Signup with Auth0 in your ReactJS project.
