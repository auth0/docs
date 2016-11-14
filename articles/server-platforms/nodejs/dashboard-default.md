---
title: Login
default: true
description: This tutorial demonstrates how to add authentication to a Node.js and Express web app
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-nodejs-webapp-sample',
  path: '01-Login',
  requirements: [
    'NodeJS 4.3 or superior',
    'Express 4.11'
  ]
}) %>

<%= include('_includes/_setup') %>

<%= include('_includes/_login') %>