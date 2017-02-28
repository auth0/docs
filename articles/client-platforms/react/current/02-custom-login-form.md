---
title: Custom Login Form
description: This tutorial demonstrates how to add a custom login form to a React application with Auth0
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '02-Custom-Login-Form',
  requirements: [
    'React 15'
  ]
}) %>

<%= include('../_includes/_custom_login_preamble') %>

## Create an Authentication Service

All authentication transactions should be handled from a service. The service requires methods named `login`, `signup`, and `loginWithGoogle` which all make calls to the appropriate auth0.js methods to handle those actions.

The auth0.js methods for making authentication requests come from the `WebAuth` object. Create an instance of `auth0.WebAuth` and provide the domain, client ID, and callback URL for your client. A `responseType` of `token id_token` should also be specified.

The `login` and `signup` methods should take the username and password input supplied by the user and pass it to the appropriate auth0.js methods. In the case of `login`, these values are passed to the `client.login` method. Since `client.login` is an XHR-based transaction, the authentication result is handled in a callback and the `setSession` method is called to set the user's `access_token`, `id_token`, and `access_token` expiry time in local storage if the transaction is successful.

The `signup` method is a redirect-based flow and the authentication result is handled by the `handleAuthentication` method. This method looks for an `access_token` and `id_token` in the URL hash when the user is redirected back to the application. If those tokens are found, they are saved into local storage and the user is redirected to the home route.

```js
// app/Auth/Auth.js

import { browserHistory } from 'react-router';
import { EventEmitter } from 'events';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth extends EventEmitter {
  auth0 = new auth0.WebAuth({
    domain: ${account.namespace},
    clientID: ${account.clientId},
    redirectUri: 'http://localhost:3000/callback',
    audience: `https://${account.namespace}/userinfo`,
    responseType: 'token id_token'
  });

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(username, password) {
    this.auth0.client.login(
      { realm: 'Username-Password-Authentication', username, password },
      (err, authResult) => {
        if (err) {
          alert(`Error: ${err.description}`);
          return;
        }
        this.setSession(authResult);
      }
    );
  }

  signup(email, password) {
    this.auth0.redirect.signupAndLogin(
      { connection: 'Username-Password-Authentication', email, password },
      function(err) {
        if (err) {
          alert(`Error: ${err.description}`);
        }
      }
    );
  }

  loginWithGoogle() {
    this.auth0.authorize({ connection: 'google-oauth2' });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        browserHistory.replace('/home');
      } else if (err) {
        browserHistory.replace('/home');
        alert(`Error: ${err.error}`);
      }
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      browserHistory.replace('/home');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    browserHistory.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

The service has several other utility methods that are necessary to complete authentication transactions.

<%= include('../_includes/_custom_login_method_description') %>

## Create the Application Routes

Create the routes for the application and pass down an instance of the `Auth` service. Provide a function which checks for the presence of an `access_token`, `id_token`, or `error` in the URL hash and calls the `handleAuthentication` method if one is found. This function needs to be passed to the `onEnter` hook for the `Callback` component route so that redirect-based authentication transactions can successfully complete.

```js
// src/routes.js

import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './App';
import Home from './Home/Home';
import Login from './Login/Login';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication(nextState.location.hash);
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} auth={auth} />
      <Route path="login" component={Login} auth={auth} />
      <Route path="callback" component={Callback} onEnter={handleAuthentication} />
    </Route>
  );
};
```

## Create a Login Route

Create a component called `Login` to house the login form that should be used for your custom UI. In this example, the logic for all authentication transactions will be handled from an `Auth` service, which means the `Login` component just needs to make use of the `Auth` instance passed down.

```js
// app/Login/Login.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button
} from 'react-bootstrap';

class Login extends Component {

  getFormData() {
    return {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    };
  }

  login(event) {
    event.preventDefault();
    const user = this.getFormData();
    this.props.route.auth.login(user.email, user.password);
  }

  signup() {
    const user = this.getFormData();
    this.props.route.auth.signup(user.email, user.password);
  }

  loginWithGoogle() {
    this.props.route.auth.loginWithGoogle();
  }

  render() {
    return (
      <div>
        <Col sm={6}>
          <h2>Username/Password Authentication</h2>
          <form>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                ref="email"
                placeholder="you@example.com"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                placeholder="Enter your password"
              />
            </FormGroup>
            <ButtonToolbar>
              <Button
                type="submit"
                bsStyle="primary"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
              <Button bsStyle="primary" onClick={this.signup.bind(this)}>
                Sign Up
              </Button>
            </ButtonToolbar>
          </form>
        </Col>
        <Col sm={6}>
          <h2>Social Authentication</h2>
          <Button bsStyle="danger" onClick={this.loginWithGoogle.bind(this)}>
            Log In with Google
          </Button>
        </Col>
      </div>
    );
  }
}

export default Login;
```