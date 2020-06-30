---
title: Login
description: This tutorial demonstrates how to add user login to a Java Spring MVC application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - java-spring
contentType: tutorial
useCase: quickstart
github:
  path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Java Spring MVC', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

<%= include('_includes/_setup') %>

<%= include('_includes/_login') %>
