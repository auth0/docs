---
title: Login
default: true
description: This tutorial demonstrates how to add user login to your application with Auth0
topics:
  - quickstarts
  - spa
  - angular2
---


<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '01-Login',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../../../_includes/_callback_url') %>

If you are following along with the downloadable sample projects for this tutorial directly, the **Callback URL** should be set to

```bash
http://localhost:3000/callback
```

<%= include('../_includes/_install_auth0js_npm_only') %>

<%= include('_includes/_centralized_login') %>


