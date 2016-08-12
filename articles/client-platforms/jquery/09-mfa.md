---
title: Multifactor Authentication
description: This tutorial will show you how to add Multifactor Authentication to your jQuery app with auth0.
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

<%= include('../_includes/_mfa-introduction') %>


In this tutorial, you will learn how to enable MFA in the jQuery application you created in the previous steps.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/docs/quickstart/spa/jquery/01-login' }) %>
