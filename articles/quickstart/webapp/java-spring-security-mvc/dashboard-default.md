---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Java SDK to add authentication and authorization to your Java Spring Security web app
tags:
  - quickstarts
  - webapp
  - login
  - java-spring-security
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-mvc-sample',
  path: '01-Login',
  requirements: [
    'Java 7 or above',
    'Gradle 3.3 or above',
    'Spring Boot 1.5.3 or above'
  ]
}) %>

<%= include('../../../_includes/_new_app') %>

<%= include('_includes/_setup') %>

<%= include('_includes/_login') %>
