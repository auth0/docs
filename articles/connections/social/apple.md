---
title: Add Sign in with Apple to Your App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your app with Apple. 
topics:
  - authentication
  - connections
  - native-social
  - apple
contentType: concept
useCase:
  - add-login
  - connections
  - add-siwa
---
# Add Sign In with Apple to Your App

Auth0 enables you to use the Sign In with Apple (SIWA) capability to provide Apple-based authentication to your applications. You can include SIWA for your native Apple applications, web applications, or applications that run on other platforms (such as Android).

::: warning
The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that SIWA must be available in all applications that exclusively use third-party sign-in options, such as Facebook or Google.
:::

## Prerequisites

Before you add support for SIWA to your app, you'll need:

* an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).)

## How it works

Once you have registered your application with Apple and configured your application connection settings in Auth0 to use the IDs and keys obtained from Apple, your users can sign in to your applications using their Apple IDs and passwords. 

![Apple Sign In with Apple Setup Flow](/media/articles/connections/social/apple/apple-siwa-setup-flow.png)

Choose a guide to get started: 

* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)

## Keep reading

* [Register Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple)
* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Troubleshooting Sign In with Apple](/connections/apple-siwa/troubleshooting)
