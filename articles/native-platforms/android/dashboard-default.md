---
title: Login
default: true
description: This tutorial will show you how to integrate Lock v2 in your Android project in order to present a login screen.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-android-sample/tree/master/01-Login',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-android-sample',
  pkgBranch: 'master',
  pkgPath: '01-Login',
  pkgFilePath: '01-Login/app/src/main/res/values/strings.xml',
  pkgType: 'replace'
}) %>

<%= include('_includes/_prerequisite') %>

<%= include('_includes/_callback_urls') %>

<%= include('_includes/_credentials') %>

<%= include('_includes/_lock') %>

<%= include('_includes/_manifest') %>

<%= include('_includes/_login') %>

