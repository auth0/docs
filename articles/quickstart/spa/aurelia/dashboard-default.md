---
title: Login
default: true
description: This tutorial demonstrates how to add user login to your application with Auth0
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-aurelia-samples',
  path: '01-Login',
  requirements: [
    'Aurelia 1.1'
  ]
}) %>

<%= include('../../../_includes/_callback_url') %>

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_centralized_login') %>