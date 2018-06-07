---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
tags:
  - quickstarts
  - spa
  - angular
  - login
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '01-Login',
  requirements: [
    'AngularJS 1.6'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'AngularJS', callback: 'http://localhost:3000/callback' }) %>

<%= include('_includes/_install_angular_auth0') %>

<%= include('_includes/_centralized_login') %>
