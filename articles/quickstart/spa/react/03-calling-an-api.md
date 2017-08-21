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

<%= include('../_includes/_calling_api_set_audience_scope') %>

```js
// src/Auth/Auth.js

auth0 = new auth0.WebAuth({
  // ...
  audience: '${apiIdentifier}',
  scope: 'openid profile read:messages'
});
```

::: panel Checkpoint
Try to log in to your application again. Look at how the `access_token` differs from before. It is no longer an opaque token. Instead, it is now a JSON Web Token with a payload that contains your API identifier as audience and the scopes you created.
:::

::: note
By default, any user can ask for any scope you defined. You can implement access policies to limit this behavior using [Rules](https://auth0.com/docs/rules).
:::

## Send Authenticated HTTP Requests

<%= include('../_includes/_calling_api_access_token') %>

::: note
The example below shows how to add the user's access token as the `Authorization` header to HTTP calls using [**axios**](https://github.com/mzabriskie/axios). 
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
}

export default Ping;
```

<%= include('../_includes/_calling_api_protect_resources') %>