---
title: Login
default: true
description: This tutorial demonstrates how to add user login to your application with Auth0
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-vue-samples',
  path: '01-Login',
  requirements: [
    'Vue 2.0'
  ]
}) %>

<%= include('../../../_includes/_callback_url') %>

If you are following along with the downloadable sample projects for this tutorial directly, the **Callback URL** should be set to

```bash
http://localhost:8080/callback
```

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_centralized_login') %>

If you are creating a mixin, move the below to the data() function, instead of created()
```
this.auth0 = new auth0.WebAuth({
      domain: 'USER.auth0.com',
      clientID: 'CLIENTID',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://USER.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    })
    // console.log(this.auth0)
    this.authNotifier = new EventEmitter()
    this.authNotifier.on('authChange', authState => {
      this.authed = authState.authenticated
    })
```
