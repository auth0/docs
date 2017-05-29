<%= include('../../_includes/_login_preamble', { library: 'React' }) %>

## Install the Lock Widget

The only dependency required to power a basic login solution is Auth0's [Lock widget](/lock) which can be installed using npm.

```bash
npm install --save auth0-lock
```

The Lock widget can also be retrieved from Auth0's CDN.

```html
<script src="https://cdn.auth0.com/js/lock/10.16/lock.min.js"></script>
```

Create an authentication service for your application. The naming is at your discretion, but in these examples it will be called `Auth` and the filename will be `Auth.js`. An instance of the Lock widget can be created in the service and its configuration can be controlled there.

<%= include('../../_includes/_auth_service_methods') %>

```js
// src/Auth/Auth.js

import { browserHistory } from 'react-router';
import { EventEmitter } from 'events'
import Auth0Lock from 'auth0-lock';

export default class Auth extends EventEmitter {

  lock = new Auth0Lock(${account.clientId}, ${account.namespace}, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      redirectUrl: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      audience: `https://${acccount.namespace}/userinfo`
    }
  });

  constructor() {
    super();
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  handleAuthentication() {
    // Add callback Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (error) => console.log('Authentication Error', error));
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

<%= include('../../_includes/_auth_service_method_description') %>

## Create the Application Routes

Create the routes for the application and pass down an instance of the `Auth` service. This example uses React Router, but you are free to use whichever routing library you wish.

```js
// src/routes.js

import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';

const auth = new Auth();

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={App} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} auth={auth} />
      <Route path="callback" component={Callback} />
    </Route>
  );
}
```

## Use the Authentication Service in Components

With the authentication service in place, it can now be used throughout the application. The authentication service has a method named `login` which will call the Lock widget, but a UI to make this `login` call needs to be created.

Provide a component which has controls for the user to log in and log out.

```js
// src/App.js

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import './App.css';

class App extends Component {
  goTo(route) {
    browserHistory.replace(`/${route}`)
  }

  login() {
    this.props.route.auth.login();
  }

  logout() {
    this.props.route.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.route.auth;

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
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
```

> This example uses the react-bootstrap library for Bootstrap styles, but that's unimportant. Use whichever style library you like, or don't use one at all.

The `onClick` events on the **Log In** and **Log Out** buttons make the appropriate calls to the `Auth` service to allow the user to log in and log out. Notice that these buttons are conditionally hidden and shown depending on whether or not the user is currently authenticated.

When the `Log In` button is clicked, the Lock widget will be shown, and the user can enter their credentials.

## Add a Callback Component

<%= include('../../_includes/_callback_component') %>

Create a component named `Callback` and populate it with a loading indicator.

```js
// src/Callback/Callback.js

// ...
return (
  <div style={style}>
    <img src={loading} alt="loading"/>
  </div>
);

export default Callback;
```

> This example assumes some kind of loading spinner is available. See the downloadable sample for a demonstration.

The options that were passed to the `Auth0Lock` instance above include a `redirectUrl` set to the `/callback` route. This means that the user will be redirected to this newly created route after they authenticate with a redirect-based flow.