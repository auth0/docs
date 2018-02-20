---
title: Custom Login
description: This tutorial demonstrates how to use the auth0.js library to add custom authentication and authorization to your ReactJS web application.
budicon: 448
github:
  path: 01-Login
---
In the [previous step](/quickstart/spa/react/01-login), we enabled login with Auth0's Lock widget. You can also build your own UI with a custom design for authentication if you like. To do this, use the [auth0.js library](https://github.com/auth0/auth0.js).

::: panel Version Requirements
This quickstart and the accompanying sample demonstrate custom login with auth0.js version 8. If you are using auth0.js version 7, please see the [reference guide](https://auth0.com/docs/libraries/auth0js/v7) for the library, as well as the [legacy React custom login sample](https://github.com/auth0-samples/auth0-react-sample/tree/auth0js-v7/02-Custom-Login).
:::

## Getting Started

The auth0.js library can either be retrieved from Auth0's CDN or from npm.

**CDN Link**

```html
<script src="${auth0js_url}"></script>
```

**npm**

```bash
npm install --save auth0-js
```

## Create a Login Component

At a basic level, two items are required for a custom login UI: the component and template to power the interface itself, and a service to call the appropriate authentication transaction methods from auth0.js.

Create a component which has a template with a `form` and controls for submitting a `login`, `signup`, and `loginWithGoogle` request. The `AuthService` that is used in this component will be created later.

```js
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  getAuthParams() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
  }

  login(e) {
    e.preventDefault()
    const { email, password } = this.getAuthParams()
    this.props.auth.login(email, password)
  }

  signup() {
    const { email, password } = this.getAuthParams()
    this.props.auth.signup(email, password)
  }

  loginWithGoogle() {
    this.props.auth.loginWithGoogle();
  }

  render() {
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <Form onSubmit={this.login.bind(this)}>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" ref="email" placeholder="yours@example.com" required />
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" ref="password" placeholder="Password" required />
          </FormGroup>

          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Log In</Button>
            <Button onClick={this.signup.bind(this)}>Sign Up</Button>
            <Button bsStyle="link" onClick={this.loginWithGoogle.bind(this)}>
              Login with Google
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}

export default Login;
```

This component has a form with inputs for users to submit their username and password, buttons for handling the `login` and `signup` cases, and a control for the user to initiate a social authentication flow with Google.

The `onClick` handlers attached to these controls call the component methods which, in turn, make calls to the `AuthService`. It's within the `AuthService` that auth0.js will be called and the user's credentials passed along to complete authentication transactions.


## Create the AuthService Class

All authentication transactions should be handled from a service. The service requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions. These methods are called from the `login` component above.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL (as the redirect URI) for your application. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `redirect.loginWithCredentials` method, and for `signup`, they are passed to `redirect.signupAndLogin`.

These methods are redirect-based and the authentication result is handled by the `parseHash` method. This method looks for an Access Token and ID Token in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the user is redirected to the home route.

```javascript
// src/utils/AuthService.js

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import { browserHistory } from 'react-router'
import auth0 from 'auth0-js'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new auth0.WebAuth({
      clientID: '${account.clientId}',
      domain: '${account.namespace}',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/login'
    })

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }

  login(username, password) {
    this.auth0.redirect.loginWithCredentials({
      connection: 'Username-Password-Authentication',
      username,
      password
    }, err => {
      if (err) return alert(err.description)
    })
  }

  signup(email, password){
    this.auth0.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err) {
      if (err) {
        alert('Error: ' + err.description)
      }
    })
  }

  loginWithGoogle() {
    this.auth0.authorize({
      connection: 'google-oauth2'
    })
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
      if (err) {
        alert(`Error: <%= "${err.errorDescription}" %>`)
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log('Error loading the Profile', error)
          } else {
            this.setProfile(profile)
            browserHistory.replace('/home')
          }
        })
      }
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user Access Token and ID Token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }
}
```

The service has several other utility methods that are necessary to complete authentication transactions.

* The `parseHash` method is necessary to get the authentication result from the URL in redirect-based authentication transactions.
* The `logout` method removes the user's tokens from local storage which effectively logs them out of the application.
* The `setToken` method takes an authentication result object and sets the Access Token and ID Token values into local storage
* The `loggedIn` method uses the `isTokenExpired` utility from a `jwtHelper` file to check whether the user's ID Token is expired. This is done to determine whether the user should be able to access the `Home` route.


## Check the Authentication Hash and Protect Private Routes

When a redirect-based authentication flow is completed, such as the `signup` and `loginWithGoogle` transactions above, the authentication result comes back in a URL hash. This hash can be read using the `parseHash` method from auth0.js, after which the tokens that come back in it can be saved in local storage and the user can be considered logged in.

The URL hash should be checked when the user enters the `Login` route because this is the route that is assigned as a `callbackUri` on the `auth0.WebAuth` instance. To check for this, set up a function which is run when the `Login` route is entered.

Routes can also be configured to dissallow access if the user is not authenticated. Create a `requireAuth` function which uses the `AuthService` to check whether the user is currently logged in and, if they are not, redirects them to the `Login` route.

```js
// src/views/Main/routes.js

// ...

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={parseAuthHash} />
    </Route>
  )
}
```
