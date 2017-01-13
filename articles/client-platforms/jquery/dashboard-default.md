---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 jQuery SDK to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '01-Login',
  requirements: [
    'jQuery 3.1.0'
  ]
}) %>

${include('../\_callback')}

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_login') %>

<%= include('../_includes/_persisting_state') %>