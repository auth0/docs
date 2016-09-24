---
title: Multifactor Authentication
description: This tutorial demonstrates how to add Multifactor Authentication to your jQuery app with auth0.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '09-MFA',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* jQuery 3.1.0
:::

<%= include('../_includes/_mfa-introduction') %>

In this tutorial, you will learn how to enable MFA in the jQuery application you created in the previous steps.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/docs/quickstart/spa/jquery/01-login' }) %>

# Summary

In this guide you learned how to use Auth0 Guardian to add multifactor authentication to your jQuery project.
