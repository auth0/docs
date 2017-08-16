---
title: Login
description: This tutorial will show you how to integrate the Auth0 Centralized Login in your Android project in order to present the login box.
seo_alias: android
budicon: 448
---

This tutorial will show you how to integrate the Auth0 Login in your Android project in order to present the login box.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '00-Login',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

<%= include('_includes/_auth0') %>

<%= include('_includes/_login') %>

::: note
Please see [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) for information on choosing between the two types of login flows.
:::