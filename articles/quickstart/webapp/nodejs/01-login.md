---
title: Login
description: This tutorial demonstrates how to add authentication to a Node.js and Express web app
budicon: 448
tags:
  - quickstarts
  - webapp
  - login
  - nodejs
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '01-Login',
  requirements: [
    'NodeJS 4.3 or higher',
    'Express 4.16'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'Node.js', callback: 'http://localhost:3000/callback' }) %>

<%= include('_includes/_login') %>
