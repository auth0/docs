---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server
budicon: 546
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '03-Calling-an-API',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope in `auth0.WebAuth`

Pass the API identifier for your newly created API as the `audience` value in your `auth0.WebAuth` instance. Additionally, pass any of your newly created scopes to the `scope` key.

```js
// src/Auth/Auth.js

auth0 = new auth0.WebAuth({
  // ...
  audience: '{YOUR_API_IDENTIFIER}',
  scope: 'openid profile read:messages'
});
```

::: note
**Checkpoint:** Try logging into your application again to take note of how the `access_token` differs from before. Instead of being an opaque token, it is now a JSON Web Token which has a payload that contains your API identifier as an `audience` and any `scope`s you've requested.
:::

::: note
By default, any user on any client can ask for any scope defined in the scopes configuration area. You can implement access policies to limit this behaviour via [Rules](/rules).
:::

## Configure a Custom Fetch Function

<%= include('../_includes/_calling_api_access_token') %>

Attaching the user's `access_token` as an `Authorization` header to HTTP calls can be done on a one-off basis by adding the header as an option to your requests. However, it is recommended that you implement a custom function which does this automatically.

Create three new functions: one which gets the user's `access_token`, another which wraps `fetch`, and lastly one which handles errors that may be returned.

```js
// src/Auth/Auth.js

constructor() {
  // ...
  this.getAccessToken = this.getAccessToken.bind(this);
  this.authFetch = this.authFetch.bind(this);
}

// ...

getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
}

authFetch(url, options) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (this.isAuthenticated()) {
    headers['Authorization'] = 'Bearer ' + this.getAccessToken();
  }

  return fetch(url, { headers, ...options })
    .then(this.checkStatus)
    .then(response => response.json());
}

checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
```

The `authFetch` method checks whether the user is authenticated and, if so, adds an `Authorization` header containing the `access_token`. This method can now be used to make calls to your API.

## Make Authenticated Calls with `authFetch`

With the `authFetch` function in place, you can now make calls to your API for protected resources.

```js
// src/Ping/Ping.js

class Ping extends Component {
  // ...
  securedPing() {
    const { authFetch } = this.props.auth;
    const API_URL = 'http://<your-application-domain>/api';
    authFetch(`<%= "${API_URL}/private" %>`)
      .then(data => this.setState({ message: data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() { ... }
}
```

<%= include('../_includes/_calling_api_protect_resources') %>
