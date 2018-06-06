---
title: Embedded Login
description: This tutorial will show you how to integrate Lock v2 in your Android project in order to present an Embedded Login screen.
seo_alias: android
budicon: 448
tags:
  - quickstarts
  - native
  - android
---

This tutorial will show you how to integrate Lock v2 in your Android project in order to present an Embedded Login screen.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  branch: 'embedded-login',
  path: '01-Embedded-Login',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

::: warning
Username/Email & Password authentication from native applications is disabled by default for new tenants as of 8 June 2017. Users are encouraged to use [Universal Login](/hosted-pages/login) and perform Web Authentication instead. If you still want to proceed you'll need to enable the Password Grant Type on your dashboard first. See [Application Grant Types](/applications/application-grant-types) for more information.
:::

<%= include('_includes/_lock') %>

<%= include('_includes/_lock_manifest') %>

<%= include('_includes/_lock_login') %>

### Optional: Log In with Social Connections

To have a simple login mechanism through social connections, all you have to do is enable them in your account's [dashboard](${manage_url}/#/connections/social). Every social connection you switch on there, will appear in the login screen of your app.
