---
title: Multifactor Authentication
description: This tutorial demonstrates how to add Multifactor Authentication to your Angular 1.x app
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '09-MFA'
}) %>

<%= include('../_includes/_mfa-introduction') %>

This tutorial demonstrates how to enable MFA in the Angular 1.x application you created in the previous steps.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/docs/quickstart/spa/angularjs/01-login' }) %>
