---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
tags:
  - quickstarts
  - spa
  - aurelia
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-aurelia-samples',
  path: '01-Login',
  requirements: [
    'Aurelia 1.1'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'Aurelia', callback: 'http://localhost:3000/callback' }) %>

<%= include('_includes/_centralized_login') %>
