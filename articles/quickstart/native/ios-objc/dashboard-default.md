---
title: Getting Started
description: Short Introduction to the Auth0 iOS Objective-C Quickstarts.
budicon: 715
tags:
  - quickstarts
  - native
  - ios
  - objective-c
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '01-Login',
  requirements: [
    'CocoaPods 1.2.1',
    'Version 8.3.2 (8E2002)',
    'iPhone 7 - iOS 10.3 (14E269)'
  ]
}) %>

::: note
It is recommend in order to make the most of all the features in the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit to start with the [iOS Swift QuickStart](/quickstart/native/ios-swift)
:::

This multistep quickstart guide will walk you through managing authentication in your iOS Objective-C apps with Auth0.

## About the Sample Applications

Each step within this quickstart guide (starting with **Login**) contains a downloadable sample which demonstrates the topic being covered. Within each of these samples, you will find an appropriate application to demonstrate the features discussed in the chapter.

## Auth0 Dependencies

Each tutorial will require you to use the [Auth0.swift](https://github.com/auth0/Auth0.swift) toolkit.

A brief description:

- [**Auth0.swift**](https://github.com/auth0/Auth0.swift) is a toolkit that lets you communicate efficiently with many the [Auth0 API](/api/info) functions and enables you to integrate the Login.

## Create an Application

If you haven't already done so, create a new application in your [Auth0 dashboard](${manage_url}/#/applications/${account.clientId}/settings) and choose **Native**.

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

<%= include('_includes/_config') %>

<%= include('_includes/_login_centralized') %>
