---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 jQuery SDK to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples/tree/master/01-Login',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

<%= include('_includes/_prerequisite') %>

${include('../\_callback')}

<%= include('_includes/_dependencies') %>

<%= include('_includes/_configuration') %>

<%= include('_includes/_login') %>