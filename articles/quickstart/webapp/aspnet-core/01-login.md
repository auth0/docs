---
title: Login
description: This tutorial will show you how to use the standard OpenID Connect middleware to add authentication to your web app.
budicon: 448
tags:
  - quickstarts
  - webapp
  - aspnet-core
  - login
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-aspnetcore-mvc-samples',
  path: 'Quickstart/01-Login',
  branch: 'master',
  requirements: [
    '.NET Core SDK 2.1.300',
    '.NET Core 2.1.0',
    'ASP.NET Core 2.1.0'
  ]
}) %>

<%= include('./_includes/_login') %>
