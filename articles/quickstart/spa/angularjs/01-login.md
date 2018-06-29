---
title: Login
description: This tutorial demonstrates how to add user login to an Angular.js application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - angular
  - login
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_getting_started', { library: 'AngularJS', callback: 'http://localhost:3000/callback' }) %>

<%= include('_includes/_install_angular_auth0') %>

<%= include('_includes/_centralized_login') %>
