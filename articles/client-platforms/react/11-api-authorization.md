---
title: OAuth 2.0 API Authorization
description: This tutorial demonstrates how to use API authorization
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-sample',
  path: '11-OAuth2-Authorization'
}) %>

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_region-support') %>

<%= include('../../_includes/_compat_warning') %>

### Before Starting

## Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## Create an Application

<%= include('../../_includes/_new_app_no_sample') %>

![App Dashboard](/media/articles/angularjs/spa_client_create.png)

Be sure to register the URL of your app in the Allowed Callback URLs in your Application Settings.

## Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

Take note of the API identifier and scopes you defined in the dashboard, as they will be used later.

## Configure the AuthService

The best way to coordinate the tasks related to authentication in your React app is to create a reusable service. Start by creating an `AuthService.js` file in the `src/utils` directory. At a minimum, the service needs to create an `Auth0` instance and have methods for logging the user in and parsing the hash string that comes back on successful authentication.

```js
// src/utils/AuthService.js

import { EventEmitter } from 'events'
import { isTokenExpired } from './jwtHelper'
import Auth0 from 'auth0-js'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      callbackURL: `<%= "${window.location.origin}/login" %>`
    });

    this.login = this.login.bind(this)
  }

  login() {
    this.auth0.login({
      responseType: 'id_token token',
      scope: 'openid profile {API SCOPES}',
      audience: '{API IDENTIFIER}'
    })
  }

  parseHash(hash) {
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);
    }
  }
}
```

The `Auth0` instance is provided with the `clientId` and `domain` for your application and these values should be set in a `.env` file at the root of your project.

The `login` method redirects the user to Auth0's hosted login page and the `parseHash` method retrieves the authentication information for the user after they are redirected back to your application. If authentication was successful, an `access_token` and `id_token` will be returned and these values can be stored in local storage for later use.

The `access_token` retrieved from the authentication process can be used to make authenticated API calls. Remember that using `response_type: token` means that you cannot get a `refresh_token`. The `id_token` can be used in your application for basic profile data. If you want to retrieve additional profile data for the user, you can use the `userinfo` endpoint with the `access_token` in the `Authorization` header. For more information, see [our API documentation](/api/authentication/reference#get-user-info).

## Trigger the Login

The `login` method should be called from the appropriate component in your app.

```js
// src/views/Main/Login/Login.js

export class Login extends React.Component {

  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Login</h2>
        <Messages auth={this.props.auth}></Messages>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
```

## Making an Authenticated API Call

To make authenticated API calls, the user's `access_token` should be attached as an `Authorization` header using the `Bearer` scheme. One way to accomplish this is to extend the `fetch` API to include the header.

```js
// src/util/AuthService.js

export default class AuthService extends EventEmitter {
  // ...
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getAccessToken()
    return !!token && !isTokenExpired(token)
  }

  getAccessToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('access_token')
  }

  fetch(url, options){
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getAccessToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }
}
```

Note that the `Authorization` header is only set if the user has an unauthenticated `access_token`.

The API call can now be made from the appropriate location in your app.

```js
// src/components/Messages/Messages.js

// ...
componentDidMount(){
  const { auth } = this.props

  // using auth to send an http request with authorization header
  auth.fetch('{API URL}')
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
```

<%= include('../../_includes/_create_resource_server') %>

## Log Out

Logging the user out simply requires removing their `access_token` and `id_token` from local storage.

```js
// src/util/AuthService.js

export default class AuthService extends EventEmitter {
  // ...
  logout() {
    // Clear access and id tokens from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
  }
}
```
