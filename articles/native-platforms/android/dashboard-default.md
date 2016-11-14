---
title: Login
default: true
description: This tutorial will show you how to integrate Lock v2 in your Android project in order to present a login screen.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-android-sample',
  path: '01-Login',
  requirements: [
    'Android Studio 2.2',
    'Android SDK 24',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

<%= include('_includes/_callback_urls') %>

<%= include('_includes/_credentials') %>

<%= include('_includes/_lock') %>

<%= include('_includes/_manifest') %>

<%= include('_includes/_login') %>

