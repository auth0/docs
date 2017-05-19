---
title: Login
default: true
description: This tutorial demonstrates how to add user login to your application with Auth0
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-react-samples',
  path: '01-Login',
  requirements: [
    'React 15.5'
  ]
}) %>

<%= include('../../../_includes/_callback_url') %>

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_centralized_login') %>