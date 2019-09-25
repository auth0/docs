---
title: Register Apps in the Apple Developer Portal
description: Learn how to set up your application with Apple before you set up your Apple connection in the Auth0 Dashboard.
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
# Register Apps in the Apple Developer Portal

Before you configure an Apple social connection in the Auth0 Dashboard, you need to set up your application on your Apple Developer account in the Apple Developer Portal. Once that is complete, you can use the assigned credentials you receive from Apple to set up your Apple connection in the Auth0 Dashboard. 

::: note
You can test the Apple connection with Auth0's developer credentials first by using the [Dashboard](${manage_url}) and going to **Connections > Social**. Click **Try** on the Apple connection, leaving the settings blank. Prior to using the connection in production, you must provide your own credentials as shown below.

![Developer Program](/media/articles/connections/social/apple/apple-developerprogram.jpg)
:::

After you register your application, you will be given the following IDs and keys to use in the application connection settings in the Dashboard:

  * **App ID**
  * **Services ID** (Client ID)
  * **Apple Team ID**
  * **Client Secret Signing Key**
  * **Client Signing Key ID** (optional)

## Prerequisite

A paid [Apple Developer](https://developer.apple.com/programs/) account. 

## Obtain Team ID

1. Sign in to your [Apple Developer Account](https://developer.apple.com/account/#/overview/).

2. Go to the [Membership page](https://developer.apple.com/account/#/membership/) of your Apple Developer account.

    ![Membership Page](/media/articles/connections/social/apple/apple-membership.jpg)

3. Make note of your Team ID.

## Create App ID

1. On the Apple Developer Portal, go to **Certificates, IDs, & Profiles > Identifiers** and click the **blue plus icon** next to **Identifiers** to create a new App ID.
2. Choose **App IDs** as the identifier type and click **Continue**
3. Provide a description and a Bundle ID (reverse-domain name style, e.g., `com.customdomain`)
4. Scroll down and check **Sign In with Apple**. 
5. Click **Continue** and then click **Register**

## Create Services ID

1. Back in the **Certificates, IDs, & Profiles** section, click the **blue plus icon** next to **Identifiers**.

    ![Register Services ID](/media/articles/connections/social/apple/apple-registerservicesid.jpg)

2. Choose **Services IDs** and click **Continue**. Fill in the description and identifier (`com.customdomain.webapp`).
3. After checking **Sign In with Apple**, click on **Configure** and define your **Web Domain** (`customdomain.com`) and your **Return URL**. Make sure that your Return URL follows this format: `https://customdomain.com/login/callback`.

    ![Configure URLs](/media/articles/connections/social/apple/apple-configureurls.jpg)

4. Click **Save**, **Continue**, and then click **Register**.

Next, you will use these credentials on the [Auth0 Dashboard > Connections > Social](${manage_url}/#/connections/social) page in the dashboard to continue to configure your application. Depending on which type of application you want to configure, choose one of the following methods:

* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
