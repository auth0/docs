---
title: Add Sign In with Apple to Web or Other Apps
description: Learn how to add native login functionality to your web or other app with Apple. 
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
# Add Sign In with Apple to Web or Other Apps

You can add functionality to your web application that allows your users to use their Apple login credentials to authenticate. As with other identity providers supported by Auth0, when your users login, they can click the "Sign In with Apple" button and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor authentication enabled, they'll be prompted for that as well.

## Prerequisites

Before you configure Sign In with Apple (SIWA) for your native app in Auth0, do the following:

* Have an [Apple Developer](https://developer.apple.com/programs/) account.

* [Register Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple). Make a note of the following IDs and key for the application connection settings in the Auth0 Dashboard:

  * Services ID (Client ID)
  * Client Secret Signing Key
  * Apple Team ID (App ID)
  * Client Signing Key ID (optional)

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

## Configure and enable the connection in Auth0

Once you have the credentials you need from your Apple Developer account, you need to configure the connection settings and enable the connection for your application in Auth0.

1. On the Dashboard, go to [Connections > Social](${manage_url}/#/connections/social) and click on the **Apple** connection.

2. On the **Settings** tab, fill in the following fields:

    * **Client ID** (Services ID)
    * **Client Secret Signing Key**
    * **Apple Team ID** (App ID)
    * (optional) **Key ID** (Apple will accept the key without the ID.)

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)

3. Click **Save**.

4. [Test the connection](/connections/apple-siwa/test-siwa-connection). 

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
