---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
tags:
  - quickstarts
  - spa
  - ember
  - login
---

<%= include('../../../_includes/_package', {
  org: 'auth0-community',
  repo: 'auth0-ember-samples',
  path: '01-Login'
}) %>

<%= include('../_includes/_getting_started', { library: 'Ember', callback: 'http://localhost:3000' }) %>

<%= include('_includes/_centralized_login') %>
