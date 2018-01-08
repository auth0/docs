---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
github:
  path: 01-Login
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

<%= include('_includes/_centralized_login') %>
