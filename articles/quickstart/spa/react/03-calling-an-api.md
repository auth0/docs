---
title: Calling an API
description: This tutorial demonstrates how to make API calls for protected resources on your server
budicon: 546
github:
  path: 03-Calling-an-API
sample_download_required_data:
  - client
  - api
---
<%= include('../_includes/_calling_api_preamble') %>

<%= include('../_includes/_calling_api_create_api') %>

<%= include('../_includes/_calling_api_create_scope') %>

## Set the Audience and Scope in `auth0.WebAuth`

In your `auth0.WebAuth` instance, enter your API identifier as the value for `audience`.
Add your scopes to the `scope` key.

```js
// src/Auth/Auth.js

auth0 = new auth0.WebAuth({
  // ...
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

<%= include('../_includes/_calling_api_use_rules') %>

## Send Authenticated HTTP Requests

<%= include('../_includes/_calling_api_access_token') %>

::: note
The example below shows how to add the user's Access Token as the `Authorization` header to HTTP calls using [**axios**](https://github.com/mzabriskie/axios). 
You can use any HTTP client you want.
:::

```js
// src/Ping/Ping.js

import React, { Component } from 'react';
import axios from 'axios';

// ...
class Ping extends Component {
  // ...
  securedPing() {
    const { getAccessToken } = this.props.auth;
    const API_URL = 'http://<your-url>.com/api';
    const headers = { 'Authorization': `Bearer <%= "${getAccessToken()}" %>`}
    axios.get(`<%= "${API_URL}" %>/private`, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  securedScopedPing() {
      const { getAccessToken } = this.props.auth;
      const headers = { 'Authorization': `Bearer <%= "${getAccessToken()}" %>`}
      axios.get(`<%= "${API_URL}" %>/private-scoped`, { headers })
        .then(response => this.setState({ message: response.data.message }))
        .catch(error => this.setState({ message: error.message }));
  }
}

export default Ping;
```

<%= include('../_includes/_calling_api_protect_resources') %>
