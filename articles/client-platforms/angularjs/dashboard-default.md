---
title: Auth0 Angular 1.x Tutorial
default: true
description: This tutorial demonstrates how to use the Auth0 with Angular 1.x applications
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '01-Login',
  requirements: [
    'Angular 1.5.8'
  ]
}) %>

<%= include('../../_includes/_callback_url') %>

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_authservice') %>

<%= include('_includes/_login') %>