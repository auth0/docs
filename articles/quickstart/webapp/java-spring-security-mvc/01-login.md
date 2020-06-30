---
title: Login
description: This tutorial demonstrates how to add user login to a Java Spring Security web application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - java-spring-security
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_getting_started', { library: 'Java Spring Security', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000/' }) %>

<%= include('_includes/_setup') %>

<%= include('_includes/_login') %>
