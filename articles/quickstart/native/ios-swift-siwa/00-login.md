---
title: Login
description: This tutorial demonstrates how to add user login to a Swift application using Sign In With Apple.
budicon: 448
topics:
  - quickstarts
  - native
  - ios
  - swift
  - siwa
github:
  path: 00-Login
contentType: tutorial
useCase: quickstart
requirements:
  - CocoaPods
  - Xcode 11 Beta 6
  - iOS 13 Beta 8 Device
---

<!-- markdownlint-disable MD002 MD041 -->

## Before you Start

This tutorial describes how to implement the native [Sign In With Apple](https://developer.apple.com/sign-in-with-apple/) introduced in iOS 13. If instead you would like to implement Web Authentication with Auth0, please check out the [iOS Swift Login tutorial](/quickstart/native/ios-swift).

Before you continue, it is assumed that:
* You have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).
* You have configured your Auth0 tenant and application client to enable **Sign In With Apple** to work. See [Add Sign In with Apple to Your Native App](/articles/connections/references/apple-native/guides/add-siwa-to-native-app) for details on how to do this.

<%= include('_includes/_login_centralized') %>