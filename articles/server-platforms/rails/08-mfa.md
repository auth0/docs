---
title: Multifactor Authentication
description: This tutorial will show you how to add Multifactor Authentication to your Rails app with Auth0.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-sample',
  path: '08-MFA',
  requirements: [
    'Ruby 2.3.1',
    'Rails 5.0.0'
  ]
}) %>

<%= include('../_includes/_mfa-introduction') %>

On this tutorial you'll learn how to enable MFA in the Rails application created in the [Login](/quickstart/webapp/rails/01-login) step.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/quickstart/webapp/rails/01-login' }) %>
