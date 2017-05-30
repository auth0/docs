---
title: Login
default: true
description: This tutorial demonstrates how to use Auth0 to add authentication and authorization to your web app
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '01-Login'
}) %>

<%= include('../../../_includes/_callback_url') %>

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_centralized_login') %>