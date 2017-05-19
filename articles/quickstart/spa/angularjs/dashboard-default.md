---
title: Auth0 AngularJS Tutorial
default: true
description: This tutorial demonstrates how to use the Auth0 with AngularJS applications
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-samples',
  path: '01-Login',
  requirements: [
    'Angular 1.6'
  ]
}) %>


<%= include('../../../_includes/_callback_url') %>

<%= include('../_includes/_install_auth0js') %>

<%= include('_includes/_install_angular_auth0') %>

<%= include('_includes/_centralized_login') %>