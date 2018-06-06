---
title: Getting started
description: Short Introduction to the Auth0 Android Quickstarts.
budicon: 715
tags:
  - quickstarts
  - native
  - android
---

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

## Sample Projects

Each tutorial in the series includes a link to its corresponding sample project. You can find all the samples [here](https://github.com/auth0-samples/auth0-android-sample).

## Dependencies

Each tutorial will require you to use the [Auth0.Android](https://github.com/auth0/Auth0.Android) library. This is a toolkit that lets you communicate with many of the basic [Auth0 API](https://auth0.com/docs/api) functions in a neat way.

## Create an Application

If you haven't already done so, create a new application in your [Auth0 dashboard](${manage_url}/#/applications/${account.clientId}/settings) and choose **Native** for the Type.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_callback_urls') %>

<%= include('_includes/_credentials') %>

<%= include('_includes/_login') %>
