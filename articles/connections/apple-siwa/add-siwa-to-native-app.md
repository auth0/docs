---
title: Add Sign In with Apple to Native iOS Apps
description: Learn how to add native login functionality to your native app with Apple. 
toc: true
topics:
  - authentication
  - connections
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add Sign In with Apple to Native iOS Apps

## Prerequisites

Before you configure Sign In with Apple for your native app in Auth0, do the following:

* Have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).

* [Set Up Apps in the Apple Developer Portal](/connections/apple-siwa/guides/set-up-apple)

## Set up the application client connection

Once you have the credentials you need from your Apple Developer account, you need to configure the application client and the connection settings in Auth0.

1. On the Auth0 Dashboard, go to **Applications**. Click the gear to open the settings for your app. 

2. At the bottom of the page, click **Show Advanced Settings** and go to the **Mobile Settings** tab. Under **Native Social Login**. enable the **Enable Sign In with Apple** toggle. 

    ![Application Client Settings: Advanced Mobile Settings](/media/articles/connections/social/apple/apple-app-mobile-settings.png)

3. Go to **Connections** > **Social**, and click on the **Apple** connection.

4. On the **Settings** tab, complete the fields **Client ID** (Services ID), **Client Secret Signing Key**, and **Apple Team ID**. You can also fill in the **Key ID** but it is optional, as Apple will accept the key without the ID.

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)

5. Click **Save**.

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
* [Set Up Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
