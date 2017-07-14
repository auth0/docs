---
title: Embedded Login
description: This tutorial demonstrates how to add user login to your app with Auth0's Lock widget
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '01-Embedded-Login',
  branch: 'embedded-login',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_embedded_lock_preamble') %>

<%= include('../_includes/_install_lock') %>

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="${lock_url}"></script>
```

<%= include('../../_includes/_allowed_origins', { callback: 'http://localhost:3000' }) %>

<%= include('../../_includes/_cross_origin_auth') %>

## Create an Authentication Service

The best way to manage and coordinate the tasks necessary for user authentication is to create a reusable service. With the service in place, you'll be able to call its methods throughout your application. The name for the service is at your discretion, but in these examples it will be called `Auth` and the filename will be `Auth.js`. An instance of `Auth0Lock` can be created in the service.

```js
// src/Auth/Auth.js

import Auth0Lock from 'auth0-lock';

export default class Auth {

  lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      audience: 'https://${account.namespace}/userinfo',
      params: {
        scope: 'openid'
      }
    }
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.lock.show();
  }
}
```

::: note
**Checkpoint:** Try importing the `Auth` service from some place in your application and calling the `login` method from it. This could be from a button click or in some lifecycle hook, just something that will trigger the method so you can see the Lock widget. For example:

```js
// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();
auth.login();
```

This isn't how the service will be used later but is useful for seeing the Lock widget right away. 
:::

![embedded login](/media/articles/web/embedded-login.png)

## Finish Out the Service

Add some additional methods to the `Auth` service to fully handle authentication in the app.

```js
// src/Auth/Auth.js

import Auth0Lock from 'auth0-lock';
import history from '../history';

export default class Auth {

  // ...
  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  // ...
  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      history.replace('/home');
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
      history.replace('/home');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

```js
// src/history.js

import createHistory from 'history/createBrowserHistory'

export default createHistory({
  forceRefresh: true
});
```

<%= include('../_includes/_auth_service_methods') %>

### About the Authentication Service

<%= include('../_includes/_auth_service_method_description_lock') %>

## Provide a Login Control

Provide a component with controls for the user to log in and log out.

```js
// src/App.js

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(<%= '`/${route}`' %>)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
```

::: note
This example uses Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.
:::

The `onClick` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `Auth` service to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the **Log In** button is clicked, the Lock widget will be shown.

## Add a Callback Component

When users log in with the Lock widget, they will be redirected back to your application where Lock will process the result.

<%= include('../_includes/_callback_component') %>

Create a component named `CallbackComponent` and populate it with a loading indicator.

```js
// src/Callback/Callback.js

import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
  render() {
    const style = //...

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;
```

::: note
This example assumes some kind of loading spinner is available in the same directory as the component. See the downloadable sample for a demonstration.
:::

After authentication, users will be taken to the `/callback` route for a brief time where they will be shown a loading indicator. During this time, their client-side session will be set, after which they will be redirected to the `/home` route.

::: note
This example assumes you are using path-based routing with `<BrowserRouter>`. If you are using hash-based routing, you won't be able to specify a dedicated callback route because the URL hash will be used to hold the user's authentication information.
:::
