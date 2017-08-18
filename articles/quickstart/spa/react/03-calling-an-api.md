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
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

::: note
**Checkpoint:** Try logging into your application again to take note of how the `access_token` differs from before. Instead of being an opaque token, it is now a JSON Web Token which has a payload that contains your API identifier as an `audience` and any `scope`s you've requested.
:::

::: note
By default, any user on any client can ask for any scope defined in the scopes configuration area. You can implement access policies to limit this behaviour via [Rules](/rules).
:::

## Send Authenticated HTTP Requests

<%= include('../_includes/_calling_api_access_token') %>

Attaching the user's `access_token` as an `Authorization` header to HTTP calls can be done on a one-off basis by adding the header as an option to your requests. This example demonstrates how to do so with [**axios**](https://github.com/mzabriskie/axios) but you are free to use whichever HTTP client you like.

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
}

export default Ping;
```

<%= include('../_includes/_calling_api_protect_resources') %>
