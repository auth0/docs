<%= include('../../_includes/_login_preamble', { library: 'React', embeddedLoginLink: 'https://github.com/auth0-samples/auth0-react-samples/tree/embedded-login/01-Embedded-Login' }) %>

### Create an Authentication Service

Create a service to manage and coordinate user authentication. You can give the service any name. In the examples below, the service is  `Auth` and the filename is `Auth.js`.

In the service add an instance of the `auth0.WebAuth` object. When creating that instance, you can specify the following:
<%= include('../../_includes/_auth_service_configure_client_details') %>

::: note
In this tutorial, the route is `/callback`, which is implemented in the [Add a Callback Component](#add-a-callback-component) step. 
:::

Add a `login` method that calls the `authorize` method from auth0.js.

```js
// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://${account.namespace}/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
```

::: panel Checkpoint
Try to import the `Auth` service from somewhere in your application. Call the `login` method from the service to see the login page.
For example:

```js
// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();
auth.login();
```

:::

![hosted login](/media/articles/web/hosted-login.png)

## Handle Authentication Tokens

Add more methods to the `Auth` service to handle authentication in the app.

The example below shows the following methods:
* `handleAuthentication`: looks for the result of authentication in the URL hash. Then, the result is processed with the `parseHash` method from auth0.js
* `setSession`: sets the user's Access Token, ID Token, and the Access Token's expiry time 
* `logout`: removes the user's tokens and expiry time from browser storage
* `isAuthenticated`: checks whether the expiry time for the user's Access Token has passed

```js
// src/Auth/Auth.js

import history from '../history';

// ...
export default class Auth {
  // ...
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
```

```js
// src/history.js

import createHistory from 'history/createBrowserHistory'

export default createHistory()
```

### Provide a Login Control

Provide a component with controls for the user to log in and log out.

${snippet(meta.snippets.use)}

::: note
This example uses Bootstrap styles. You can use any style library you want, or not use one at all.
:::

Depending on whether the user is authenticated or not, they see the **Log In** or **Log Out** button. The `click` events on the buttons make calls to the `Auth` service to let the user log out or log in. When the user clicks the **Log In** button, they are redirected to the login page. 

<%= include('../../_includes/_hosted_login_customization' }) %>

### Add a Callback Component

When you use the login page, your users are taken away from your application. After they authenticate, the users automatically return to your application and a client-side session is set for them. 

::: note
This example assumes you are using path-based routing with `<BrowserRouter>`. If you are using hash-based routing, you will not be able to specify a dedicated callback route. The URL hash will be used to hold the user's authentication information.
:::

<%= include('../../_includes/_callback_component') %>

Create a component named `CallbackComponent` and add a loading indicator.

::: note
To display a loading indicator, you need a loading spinner or another indicator in the `assets` directory. See the downloadable sample for demonstration. 
:::

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

After authentication, your users are taken to the `/callback` route. They see the loading indicator while the application sets up a client-side session for them. After the session is set up, the users are redirected to the `/home` route.

### Process the Authentication Result

When a user authenticates at the login page, they are redirected to your application. Their URL contains a hash fragment with their authentication information. The `handleAuthentication` method in the `Auth` service processes the hash. 

Call the `handleAuthentication` method after you render the `Callback` route. The method processes the authentication hash fragment when the `Callback` component initializes.

```js
// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}
```
