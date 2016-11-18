---
title: Custom Login
description: This tutorial demonstrates how to use the auth0.js library to add custom authentication and authorization to your ReactJS web application
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '02-Custom-Login',
  requirements: [
    'React 15.3'
  ]
}) %>

In the [previous step](/quickstart/spa/react/01-login), we enabled login with the Auth0 Lock widget. You can also build your own custom UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

## 1. Create the AuthService class

The best way to have authentication utilities available across your application is to create a helper class. Then you can share an instance of this class by passing it to the React Component as a prop.

First, you will create the `AuthService` helper class to encapsulate the login functionality provided by the `auth0.js` library and save it inside the `src/utils` folder as `AuthService.js`.

Inside this class, you will create an `Auth0` instance that receives your Auth0 credentials. Instead of hard-coding your credentials in this class, they are passed from the `AuthService` constructor parameters to the `Auth0` instance.

This class also provides `login` and `signup` methods that simply pass parameters to the equivalent `Auth0` library methods.

Below is the full code for `AuthService.js` file:

```javascript
// src/utils/AuthService.js

import Auth0 from 'auth0-js'

export default class AuthService {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      responseType: 'token'
    });

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(params, onError) {
    //redirects the call to auth0 instance
    this.auth0.login(params, onError)
  }

  signup(params, onError) {
    //redirects the call to auth0 instance
    this.auth0.signup(params, onError)
  }

  parseHash(hash) {
    // uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken)
    }
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

The `auth0.js` library uses [redirect mode](/libraries/auth0js#redirect-mode) by default which redirects your users back to your application after a successful login. Make sure that the URL for your application is set as a **Callback URL** in your [Auth0 dashboard](${manage_url}/#/applications).

`auth0.js` appends authentication data to the callback URL as hash parameters. The `parseHash` method above extracts this data from the URL hash and saves the user authentication token to local storage.

## 2. Use `AuthService` to protect private routes

This section describes how to integrate `AuthService` in your React routes to protect private URLs and parse the URL parameters after a successful login.

To use the new class to protect routes, import `AuthService` in `src/views/Main/routes.js` and create a new instance. Below is the updated routes file:

```javascript
// src/views/Main/routes.js

import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'

const auth = new AuthService('${account.clientId}', '${account.namespace}');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    auth.parseHash(nextState.location.hash)
    replace({ pathname: '/' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="login" onEnter={parseAuthHash} /> //to get auth0 data from params
    </Route>
  )
}

export default makeMainRoutes
```

<%= include('_includes/_env-note') %>

In the updated `routes.js`, you now have two routes with `onEnter` callbacks assigned. The `/home` route calls `requireAuth`, which checks if there is an authenticated user, and redirects to `/login` if not. The `login` route checks the hash and parses it with auth0.js before entering.

## 3. Create the Login view

Login is a new view component that should be saved in `src/views/Main/Login/`. It is is a React Component that accepts into its props an `auth` object as an instance of `AuthService`. It renders an authentication form that allows users to enter their email and password to sign in.

The Login component code looks like this:

```javascript
// src/views/Main/Login/Login.js

import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  handleSubmit(e) {
    e.preventDefault()
    // on form submit, sends the credentials to auth0 api
    this.props.auth.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="email" ref="email" placeholder="yours@example.com" required />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" ref="password" placeholder="Password" required />
          </FormGroup>

          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Sign In</Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}

export default Login
```

The form submit is handled by the `handleSubmit` method, which sends the credentials to Auth0 login API. For authentication errors, it simply shows an alert. On successful authentication, Auth0 will redirect to the callback url, where the router will catch and parse the provided data.

Now, if you run the application, you will see an error in the Login component because `auth` is still not included in the props.

## 4. Send `auth` from router to Container children

To fix the Login component's missing dependency, you need to propagate the `auth` parameter from the `Container` component (that receives it from the route) to the container's children.

The updated `src/views/Main/Container.js` is:

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

Now, the Login button should work and the user will be redirected to the home page after successful authentication.

## 5. Add Sign Up

The simplest way to allow sign up is to add a new button to the login form and call the Auth0 signup API, instead of login.

The required changes in the Login component are included below:

```javascript
// src/views/Main/Login/Login.js

import React, { PropTypes as T } from 'react'

export class Login extends React.Component {

  signUp() {
    // calls auth0 signup api, sending new account data
    this.props.auth.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="email" ref="email" placeholder="yours@example.com" required />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" ref="password" placeholder="Password" required />
          </FormGroup>

          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Sign In</Button>
            <Button onClick={this.signUp.bind(this)}>Sign Up</Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}

export default Login;
```

## 6. Add Social Sign In

To login using a social connector, you simply need to tell `Auth0` which connection to use.

For example, add a **Sign In with Google** link to the Login form and handle the `onClick` event by calling the `googleLogin` method:

```javascript
// src/views/Main/Login/Login.js

import React, { PropTypes as T } from 'react'

export class Login extends React.Component {

  googleLogin() {
    this.props.auth.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="email">
            <ControlLabel>E-mail</ControlLabel>
            <FormControl type="email" ref="email" placeholder="yours@example.com" required />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" ref="password" placeholder="Password" required />
          </FormGroup>

          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Sign In</Button>
            <Button onClick={this.signUp.bind(this)}>Sign Up</Button>
            <Button bsStyle="link" onClick={this.googleLogin.bind(this)}>Login with Google</Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}

export default Login;
```

