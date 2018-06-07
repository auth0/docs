---
title: Login
default: true
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your web app
tags:
  - quickstarts
  - spa
  - jquery
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '01-Login'
}) %>

<%= include('../../../_includes/_callback_url') %>

If you are following along with the downloadable sample projects for this tutorial directly, the **Callback URL** should be set to

```bash
http://localhost:3000
```

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_centralized_login') %>