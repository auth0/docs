---
title: Login
description: This tutorial demonstrates how to add user login to an Angular (versions 2 and above) application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular2
  - login
github:
    path: 01-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Angular 2+', callback: 'http://localhost:3000/callback', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true }) %>

<%= include('_includes/_centralized_login') %>