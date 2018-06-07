---
title: Auth0 AngularJS Tutorial
default: true
description: This tutorial demonstrates how to use the Auth0 with AngularJS applications
tags:
  - quickstarts
  - spa
  - angular
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '01-Login',
  requirements: [
    'Angular 1.6'
  ]
}) %>


<%= include('../../../_includes/_callback_url') %>

If you are following along with the downloadable sample projects for this tutorial directly, the **Callback URL** should be set to

```bash
http://localhost:3000/callback
```

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_install_angular_auth0') %>

<%= include('_includes/_centralized_login') %>