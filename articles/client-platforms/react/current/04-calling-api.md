---
title: Calling an API
description: This tutorial demonstrates how to use angular2-jwt in a React application to make authenticated API calls
budicon: 546
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '04-Calling-Api',
  requirements: [
    'React 15'
  ]
}) %>

<%= include('../../_includes/_calling_api_preabmle') %>

## Create a Modified Fetch Function

Making an authenticated request from your React application requires that the `access_token` issued to the authenticated user be included. This can be done by adding an `Authorization` header to the request. The API or library used for making requests is at your discrection, but the example in this tutorial uses the Fetch API to demonstrate how to add this header.

Add a method called `authFetch` to the `Auth` service. This method should return a `fetch` call and include the `access_token` if the user is authenticated.

```js
// src/Auth/Auth.js

getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
}

authFetch(url, options) {
  const headers = {
    Accept: 'application/json',
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

## Make Calls for Data

With the `authFetch` method in place, you can make `fetch` requests as you normally would. The difference now is that the `access_token` will be attached as an `Authorization` header.

Assuming you have an API which returns a `message` from some protected endpoint called `/private`, you could craft an API call as such:

```js
// src/Ping/Ping.js

securedPing() {
  const { authFetch } = this.props.route.auth;
  authFetch(`http://localhost:3000/api/private`)
    .then(data => this.setState({ message: data.message }))
    .catch(error => this.setState({ message: error.message }));
}
```

<%= include('../../_includes/_calling_api_protect_resources') %>