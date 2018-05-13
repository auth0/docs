---
title: Login
description: This tutorial will show you how to integrate the Auth0 Universal Login in your Android project in order to present the login box.
seo_alias: android
budicon: 448
github:
  path: 00-Login
---

<%= include('../_includes/_getting_started', { library: 'Android') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to  'demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback' }`.
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

<%= include('_includes/_auth0') %>

<%= include('_includes/_login') %>