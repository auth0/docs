---
title: Session Handling
description: This tutorial demonstrates how to integrate Auth0 with ReactJS to add session handling and logout to your web app
budicon: 280
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '03-Session-Handling',
  requirements: [
    'React 15.3'
  ]
}) %>

The previous steps of this tutorial explain how to implement login using either `Lock` or the `Auth0.js` library to authenticate users in your application.

Usually, when a user logs in, you will want to create a session for that user and also allow the user to logout. The following steps show you how to implement this.

## 1. Create a Session

Once the user is logged in, you can create a session for that user by storing the `idToken` attribute, which is passed as a Lock `authenticated` event callback parameter.

The `AuthService` helper class uses local storage to keep the current user idToken valid for the session:

```javascript
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

In the code, you see the `login` method using `Lock` to show the sign in window, and the `_doAuthentication` private method, which stores the `idToken` provided by Auth0 to local storage. The `logout` method removes the stored token, and `loggedIn` checks if there is a token and returns a boolean.

However, just checking if there is a stored token is not enough to validate the session because the returned [JSON Web Token](/jwt) has an expiration date. The next section explains how to properly validate the session.

## 2. Check if the Session is Valid

In order to know if a user is authenticated, you need to make sure the `idToken` is stored and still valid. A token is valid if its expiration date has not passed.

To check this, save the new `isTokenExpired` method in a new helper file named `jwtHelper.js`:

```javascript
// src/utils/jwtHelper.js

import decode from 'jwt-decode';

export function getTokenExpirationDate(token) {
  const decoded = decode(token)
  if(!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
```

The `jwtHelper` library exports two methods: `isTokenExpired` and `getTokenExpirationDate`. It also imports `jwt-decode` as a dependency, so you must include it in your `package.json` or use npm to install it:

```bash
npm install jwt-decode --save
```

Now you are able to import `isTokenExpired` into `AuthService` to improve the `loggedIn` method:

```javascript
// src/utils/AuthService.js

import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'

export default class AuthService {

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

}
```

## 3. Logout Button

In Home view, you may want to show a logout button that destroys the user session and redirects to the `/login` page. Since the `AuthService` helper class already includes a `logout` function, you can simply hook it to a logout button.

The updated Home component code with the logout button is as follows:

```javascript
// src/views/Main/Home/Home.js

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

  logout() {
    // destroys the session data
    this.props.auth.logout()
    // redirects to login page
    this.context.router.push('/login');
  }

  render() {
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

