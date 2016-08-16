---
title: Introduction
description: A simple, multi-step quickstart guide to setup and manage authentication in your jQuery app using Auth0.
---

This simple, multi-step quickstart will guide you through setting up and managing authentication in your jQuery apps using Auth0.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-jquery-samples',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-jquery-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'js'
}) %>

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## 2. Dependencies

To integrate your jQuery application with Auth0, you will need to add the following dependency:

- [Lock Widget](/libraries/lock) is the default authentication widget provided by Auth0.

  From [npm](https://www.npmjs.com/package/auth0-lock):

  `npm install --save auth0-lock`

  From [bower](http://bower.io):

  `bower install auth0-lock`

  Or the Auth0 CDN:

  `<script src="http://cdn.auth0.com/js/lock/10.1.0/lock.min.js"></script>`


# Summary

In this guide you learned how to get your application credentials from the `Auth0`'s dashboard and also you learned different ways for installing `Lock` widget in your jQuery project.
