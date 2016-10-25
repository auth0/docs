---
title: Login
description: This tutorial demonstrates how to use the Auth0 Angular 1.x SDK to add authentication and authorization to your mobile app.
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-angularjs-sample',
  path: '01-Login'
}) %>

The first step in adding authentication to your Angular app is to provide a way for the user to log in. The easiest way to do this with Auth0 is to use the [Lock widget](/libraries/lock).

<%= include('_includes/_authservice') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_login') %>