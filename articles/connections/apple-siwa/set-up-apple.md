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
:::

After you register your application, you will be given the following IDs and keys to use in the application connection settings in the Dashboard:

* Services ID (Client ID)
* Apple Team ID
* Client Secret Signing Key
* Key ID

## Prerequisites

Before you can register your app in the Apple Developer Portal, you must have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).)

## Obtain Team ID

1. Sign in to your [Apple Developer Account](https://developer.apple.com/account/#/overview/), and go to the [Membership page](https://developer.apple.com/account/#/membership/) of your Apple Developer account.
    ![Membership Page](/media/articles/connections/social/apple/apple-membership.jpg)
1. Make note of your Team ID.

## Create App ID

1. On the Apple Developer Portal, go to **Certificates, IDs, & Profiles > Identifiers** and click the **blue plus icon** next to **Identifiers** to create a new App ID.
1. Choose **App IDs** as the identifier type and click **Continue**.
1. Provide a description and a Bundle ID (reverse-domain name style, e.g., `com.example`).
1. Scroll down and check **Sign In with Apple**.
1. Click **Continue**, and then click **Register**.

## Create Services ID

1. Return to the **Certificates, IDs, & Profiles** section and click the **blue plus icon** next to **Identifiers**.
    ![Register Services ID](/media/articles/connections/social/apple/apple-registerservicesid.jpg)
1. Choose **Services IDs** and click **Continue**. Fill in the description and identifier (`com.example.webapp`).
1. After checking **Sign In with Apple**, click on **Configure** and define your **Web Domain** (`example.com`) and your **Return URL**. Make sure that your Return URL is your Auth0 domain, such as `foo.auth0.com` (or your Auth0 custom domain if you have one) and follows this format: `https://YOUR_AUTH0_DOMAIN/login/callback`.
    ![Configure URLs](/media/articles/connections/social/apple/apple-configurls2.png)
1. Click **Save**, **Continue**, and then click **Register**.

::: note
At this time, Apple does not require validation of the redirect URL, and doing so is typically not necessary.
:::

### Set up your Client Secret Signing Key

1. Go to **Keys** under the **Certificates, Identifiers, & Profiles** section of your Apple developer dashboard.
1. Click on the **blue plus icon** to add a new key.
1. Enter a **Key Name** and check the **Sign In with Apple** option.
1. Click **Configure** to make sure the **Choose a Primary App ID** field is filled with the correct App ID.
1. Click **Save**, **Continue**, and then **Register**.
1. On the page to which you're redirected after registering, make a note of the Key ID. Then, download the key. 

Next, you will use these credentials on the [Auth0 Dashboard > Connections > Social](${manage_url}/#/connections/social) page to continue to configure your application. Depending on which type of application you want to configure, choose one of the following methods:

* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
