---
title: Connect Web Apps to Apple
connection: Apple
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your web app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
public: true
toc: true 
index: 2
public: true
topics:
  - authentication
  - connections
  - social
  - apple
contentType: concept
useCase:
  - add-login
  - connections
  - add-siwa
---
# Connect Web Apps to Apple

You can add functionality to your web application that allows your users to log in with Apple. The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that Sign In With Apple (SIWA) must be available in all applications that exclusively use third-party sign-in options, such as Facebook or Google.

::: note
To add SIWA capabilities to your native app, see [Add Sign In with Apple to Native iOS Apps](/connections/nativesocial/apple).
:::

## Prerequisites

Before you configure SIWA for your app in Auth0, you must have an [Apple Developer Program](https://developer.apple.com/programs/) account, which is a paid account. A free trial is available if you are a member of the [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).

## Steps

To connect your app to Apple, you will:

1. [Set up your app in Apple](#set-up-your-app-in-apple)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

## Set up your app in Apple

1. [Register Your App in the Apple Developer Portal](/connections/apple-siwa/set-up-apple). 
2. Note the following IDs and keys:
    * Services ID (Client ID)
    * Apple Team ID
    * Client Secret Signing Key
    * Key ID

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

### Create and enable a connection in Auth0

[Set up the Apple social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the following values:
* Client ID (Services ID)
* Apple Team ID
* Client Secret Signing Key
* Key ID

### Test the connection

[Test the connection](/connections/apple-siwa/test-siwa-connection) to verify the connection works. 

If you have issues, see [Troubleshooting Sign In with Apple](/connections/apple-siwa/troubleshooting). 