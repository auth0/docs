---
title: Login
description: This tutorial demonstrates how to add user login to your application with Auth0
budicon: 448
github:
  path: 01-Login
---
<<<<<<< HEAD

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '01-Login',
  requirements: [
    'jQuery 3.2.1'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'jQuery', callback: 'http://localhost:3000' }) %>
=======
<%= include('../_includes/_getting_started', { library: 'jQuery', callback: 'http://localhost:3000, http://localhost:5000' }) %>
>>>>>>> Added metadata for SPA QS

<%= include('_includes/_centralized_login') %>
