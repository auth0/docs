---
title: Connect Web Apps to Apple
connection: Apple
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your web app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
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

You can add functionality to your web application that allows your users to authenticate using their Apple login credentials. As with other identity providers supported by Auth0, when your users log in, they can click the **Sign In with Apple** button, and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor authentication enabled, they'll be prompted for that as well.

To add SIWA capabilities for your native apps, see [Add Sign In with Apple to Native iOS Apps](/connections/nativesocial/apple).

::: warning
The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that Sign In with Apple (SIWA) must be available in all applications that exclusively use third-party sign-in options, such as Facebook or Google.
:::

## Prerequisites

Before you configure SIWA for your app in Auth0, you must have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).)

## Steps

To connect your app to Apple, you will:

1. [Set up your app on Apple](#set-up-your-app-on-apple)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

## Set up your app on Apple

[Register Your App in the Apple Developer Portal](/connections/apple-siwa/set-up-apple) if you have not already done so. Make a note of the following IDs and key for the application connection settings in the Auth0 Dashboard:
  * **Services ID** (Client ID)
  * **Apple Team ID**
  * **Client Secret Signing Key**
  * **Key ID**

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

Once you have registered your application with Apple and configured your application connection settings in Auth0 to use the IDs and keys obtained from Apple, your users can sign in to your applications using their Apple IDs and passwords. 

![Apple Sign In with Apple Setup Flow](/media/articles/connections/social/apple/apple-siwa-setup-flow.png)

### Create and enable a connection in Auth0

1. On the Dashboard, go to [Connections > Social](${manage_url}/#/connections/social) and click on the **Apple** connection.
1. On the **Settings** tab, fill in the following fields:
    * **Client ID** (Services ID)
    * **Apple Team ID**
    * **Client Secret Signing Key**
    * **Key ID**

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)
1. Click **Save**.

### Test the connection

[Test the connection](/connections/apple-siwa/test-siwa-connection) to verify the connection works. 

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Troubleshooting Sign In with Apple](/connections/apple-siwa/troubleshooting)
