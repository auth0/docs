---
title: Multifactor Authentication
description: This tutorial will show you how to add Multifactor Authentication to your VanillaJS app with auth0.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-javascript-spa',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-javascript-spa',
  pkgBranch: 'master',
  pkgPath: '09-MFA',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('../_includes/_mfa-introduction') %>

In this tutorial, you will learn how to enable MFA in the VanillaJS application you created in the previous steps.

## Enable Multifactor Authentication in Your Account

<%= include('../_includes/_mfa-enable') %>

## Login

<%= include('../_includes/_mfa-login', { loginlink: '/docs/quickstart/spa/vanillajs/01-login' }) %>

## Summary

In this guide we saw how to use Auth0 Guardian to add multifactor authentication to your VanillaJS project.
