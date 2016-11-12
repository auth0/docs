---
title: Multifactor Authentication
description: This tutorial demonstrates how to add Multifactor Authentication to your jQuery app with auth0.
budicon: 243
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '09-MFA'
}) %>

<%= include('../_includes/_mfa-introduction') %>

In this tutorial, you will learn how to enable MFA in the jQuery application you created in the previous steps.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/quickstart/spa/jquery/01-login' }) %>

# Summary

In this guide you learned how to use Auth0 Guardian to add multifactor authentication to your jQuery project.
