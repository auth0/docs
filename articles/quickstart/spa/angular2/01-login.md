---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
tags:
  - quickstarts
  - spa
  - angular2
  - login
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '01-Login',
  requirements: [
    'Angular 2+'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'Angular 2+', callback: 'http://localhost:3000/callback' }) %>

<%= include('_includes/_centralized_login') %>