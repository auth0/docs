---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '01-Login',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'React', callback: 'http://localhost:3000/callback' }) %>

## Create an Authentication Service

Create a service to manage and coordinate user authentication. You can give the service any name. 
In the examples below, the service is  `Auth` and the filename is `Auth.js`.

In the service add an instance of the `auth0.WebAuth` object. When creating that instance, you can 
specify the following:

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
Import the `Auth` service from somewhere in your application. Call the `login` method from 
the service to see the login page. 

For example:

```js
// App.js
import Auth from './Auth/Auth.js';

const auth = new Auth();
auth.login();
```

:::

![hosted login](/media/articles/web/hosted-login.png)

