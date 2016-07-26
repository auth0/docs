---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your ReactJS web application.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* NodeJS 5.2.0
* NPM 3.3.12
* React 15.0.2
:::

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/02-Custom-Login',
}) %>


The previous step explains how to login but with a widget called [Lock](/libraries/lock). Lock is completely optional so you can build an application with Auth0 using your custom design without having to include it. You just need to use the [Auth0.js library](/libraries/auth0js). We'll show how in a few steps.

## 1. Create the AuthService class

The best way to have authentication utilities available across the application is to create a helper class an share its instance to the React Components passing it as their props. For this example, we'll create the helper inside the `src/utils` folder to encapsulate the sign in and sign up functionality provided by `auth0.js` library, naming it `AuthService`.

The class is responsible to keep an `Auth0` instance, passing your Auth0 credentials. Instead of hard coding the credentials, `AuthService` will receive them as contructor parameters. Also, it provides `login` and `signup` methods that just redirects the calls to `Auth0` library. Below is the full code for `AuthService.js` file:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0 from 'auth0-js'

export default class AuthService {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      callbackOnLocationHash: true
    });

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
  }

  login(params, onError){
    //redirects the call to auth0 instance
    this.auth0.login(params, onError)
  }

  signup(params, onError){
    //redirects the call to auth0 instance
    this.auth0.signup(params, onError)
  }

  parseHash(hash){
    // uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken)
    }
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

`Auth0` uses [redirect mode](libraries/auth0js#redirect-mode) as default, so after a successful login, the app will be redirected to the `callbackURL` set in your account. With the callbackURL `Auth0` sends authentication data as hash parameters. The `parseHash` method you see above is responsible of extracting data from the URL hash and save the user authentication token(`idToken`) using localStorage.

In the next topic you'll learn how to integrate `AuthService` in your react routes to protect private urls and parse the url params after a successful login.

## 2. Use `AuthService` to protect private routes

To use the new class to protect routes, just import `AuthService` in `src/views/Main/routes.js` and create a new instance. Check the updated routes file:

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

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  auth.parseHash(nextState.location.hash)
  replace({ pathname: '/' })
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="access_token=:token" onEnter={parseAuthHash} /> //to get auth0 data from params
    </Route>
  )
}

export default makeMainRoutes
```
${snippet(meta.snippets.envFile)}

Back to `routes.js`, we now have two routes with onEnter callbacks assigned. First, `/home` route calls `requireAuth` to check if there is an authenticated user, redirecting to `/login` otherwise. Also, we have a route to catch `access_token=:token` url format and parse those parameters in `parseAuthHash`. The Login component does not exist yet, so let's create it.

## 3. Create the Login view

Login is a new view component that should be placed in `src/views/Main/Login/`. It should render an authentication form allowing the users to enter their email and password and sign in. The Login component code looks like:

```javascript
/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  handleSubmit(e){
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

Basically, it's a React Component that expects an `auth` object into its props, validated as an instance of `AuthService`. The form submit is handled by `handleSubmit` method, which sends the credentials to auth0 login api. For authentication errors we're just showing an alert. For a successful authentication auth0 will redirect to the callback url, where the router catches and parses the provided data.

If you run the application now you'll see an error in the Login component, because `auth` is still not included in the props.

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


## 5. Add Sign Up

The simplest way to allow signing up is adding a new button to the login form, and call auth0 signup api instead of login. Below we have the required changes in the Login component:

```javascript
/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react'
...

export class Login extends React.Component {
  ...

  signUp(){
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

To login using a social connector, you just need to tell `Auth0` which connection you want to use. As an example, let's add a "Sign In with Google" link to the Login form and handle the click event on `googleLogin` method:

```javascript
/* ===== ./src/views/Main/Login/Login.js ===== */
import React, { PropTypes as T } from 'react'
...

export class Login extends React.Component {
  ...

  googleLogin(){
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

### 7. All done!

You have completed the implementation of Login, Signup and Social Sign In with Auth0 in your ReactJS project.
