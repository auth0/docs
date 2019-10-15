---
title: Add Sign In with Apple to Web or Other Apps
description: Learn how to add native login functionality to your web or other app with Apple. 
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
# Add Sign In with Apple to Web or Other Apps

You can add functionality to your web application that allows your users to authenticate using their Apple login credentials. As with other identity providers supported by Auth0, when your users log in, they can click the **Sign In with Apple** button, and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor authentication enabled, they'll be prompted for that as well.

## Prerequisites

Before you configure Sign In with Apple (SIWA) for your native app in Auth0, you must:

* Have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).)
* [Register Your App in the Apple Developer Portal](/connections/apple-siwa/set-up-apple) if you have not already done so. Make a note of the following IDs and key for the application connection settings in the Auth0 Dashboard:
  * **Services ID** (Client ID)
  * **Apple Team ID**
  * **Client Secret Signing Key**
  * **Key ID**

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

## Configure and enable the connection in Auth0

Once you have the credentials you need from your Apple Developer account, you need to configure the connection settings and enable the connection for your application in Auth0. 

::: note
The **Client Secret Signing Key** is the contents of the key file you downloaded when setting up the key on the Apple Developer site. You can copy and paste the content of that file into this field.
:::

1. On the Dashboard, go to [Connections > Social](${manage_url}/#/connections/social) and click on the **Apple** connection.
1. On the **Settings** tab, fill in the following fields:
    * **Client ID** (Services ID)
    * **Apple Team ID**
    * **Client Secret Signing Key**
    * **Key ID**

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)
1. Click **Save**.
1. [Test the connection](/connections/apple-siwa/test-siwa-connection). 

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
