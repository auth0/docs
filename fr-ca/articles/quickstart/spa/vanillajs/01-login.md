---
title: Login
description: This tutorial demonstrates how to add user login to a Javascript application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - vanillajs
  - login
github:
    path: 01-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'JavaScript', callback: 'http://localhost:3000', showLogoutInfo: true, returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showWebOriginInfo: true, new_js_sdk: true }) %>

<%= include('_includes/_centralized_login') %>
