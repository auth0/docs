---
title: Single Sign-On
description: This tutorial demonstrates how to add single sign-on to multiple applications with Auth0
budicon: 448
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-angular-samples',
  path: '06-Single-Sign-On',
  requirements: [
    'Angular 2+'
  ]
}) %>

NOTE: WIP

Many organizations have multiple distinct applications. In some cases, a user who has access to one of the applications also needs to have access to the others.

This scenario requires consideration for how user entities should be handled for each of the applications. One approach is to have a unique user record for each application, but this is hardly ideal. Instead, **Single Sign-On (SSO)** can be used to permit users access to all of an organization's applications with just one user record at a centralized authorization server. SSO also makes it possible for users to automatically be logged in to all applications after they authenticate in just _one_ of them.


