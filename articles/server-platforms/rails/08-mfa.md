---
title: Multifactor Authentication
description: This tutorial will show you how to add Multifactor Authentication to your Rails app with Auth0.
---

## Ruby On Rails - Multifactor Authentication
::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample',
  pkgRepo: 'auth0-rubyonrails-sample',
  pkgBranch: 'master',
  pkgPath: '08-MFA',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

<%= include('../_includes/_mfa-introduction') %>


On this tutorial you'll learn how to enable MFA in the Rails application created in the [Login](/quickstart/webapp/rails/01-login) step.

## 1. Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## 2. Login

<%= include('../_includes/_mfa-login') %>


## 3. All done!

You have completed the Multifactor authentication setup with Auth0 in your Rails project.
