---
title: Session Handling
description: This tutorial will show you how to integrate Auth0 with ReactJS to add session handling and logout to your web app.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-react-sample/tree/master/03-Session-Handling',
}) %>

The previous steps of this tutorial explain how to login using both `Lock` widget and `Auth0` library to authenticate users in your application. Most of the time, when you login, you want to create a session for that user and also allow the user to logout. In the step you see how to do it.

## 1. Create Session

Once the user is logged in, we want to create a session for that user. To do this, we only need to store the `idToken` attribute, which came as a lock `authenticated` event callback parameter. Below you see how our helper class `AuthService` is using `localStorage` to keep the current user idToken valid for the session.

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

In the code, you see `login` method using `Lock` widget feature to show the sign in window, and the `_doAuthentication` private method, responsible to store the `idToken` provided by auth0 using `localStorage`. The `logout` method then only removes the stored token while `loggedIn` checks if there is a token, returning a boolean. Unfortunately, just checking if there is a token stored is not enough to validate the session, because auth0 returns a [JSON Web Token](/jwt) and it has an expiration date. In the next session you learn how to properly validate the session.

## 2. Check If Session is Valid

In order to know if a user is authenticated, you need to make sure the `idToken` is stored and still valid. The token is valid if its expiration date is not reach, that's what we're checking in the method `isTokenExpired` introduced in a new helper file named `jwtHelper.js`:

```javascript
/* ===== ./src/utils/jwtHelper.js ===== */
import decode from 'jwt-decode';

export function getTokenExpirationDate(token){
  const decoded = decode(token)
  if(!decoded.exp) {
    return null
  }

  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token){
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
```

The `jwtHelper` library is exporting 2 methods: `isTokenExpired` and `getTokenExpirationDate`. Also, it's importing `jwt-decode` as a dependency you should include in your `package.json` or using npm:

```bash
$ npm install jwt-decode --save
```

Now you are able to import `isTokenExpired` in `AuthService` to improve the `loggedIn` method:

```javascript
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'
import { isTokenExpired } from './jwtHelper'

export default class AuthService {
  ...

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  ...
}
```

## 3. Logout Button

In Home view, you may want to show a button to logout, destroying the user session and redirecting to `/login` page. `AuthService` helper class already provides the `logout` function, and it's easy to hook it to a logout button. The updated Home component code with the logout button should be something like:

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

### 4. All done!

You've implemented Session Handling and Logout with Auth0 in your ReactJS project.
