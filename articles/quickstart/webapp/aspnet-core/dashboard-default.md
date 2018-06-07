---
title: Login
default: true
description: This tutorial will show you how to use the standard OpenID Connect middleware to add authentication to your web app.
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
  requirements: [
    '.NET Core 1.1.0',
    'ASP.NET Core 1.1.1',
    'Microsoft.AspNetCore.Authentication.OpenIdConnect 1.1.1'
  ]
}) %>

<%= include('_includes/_setup') %>

<%= include('_includes/_login') %>
