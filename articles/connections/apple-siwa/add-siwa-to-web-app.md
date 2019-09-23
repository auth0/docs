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

You can add functionality to your web application that allows your users to use their Apple login credentials to authenticate. As with other identity providers supported by Auth0, when your users login, they can click the "Sign In with Apple" button and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor authentication enabled, they'll be prompted for that as well.

## Prerequisites

Before you configure Sign In with Apple (SIWA) for your native app in Auth0, do the following:

* Have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).

* A [custom domain](/custom-domains) set up on your Auth0 tenant (because you must be able to do domain verification with Apple).

* [Set Up Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple). Make a note of the following IDs and key for the application connection settings in the Auth0 Dashboard:

  * Service ID (Client ID)
  * Client Secret Signing Key
  * App ID (Apple Team ID)
  * Client Signing Key ID (optional)

::: note
If you are using the Classic Universal Login flow or embedding `Lock.js` in your application, make sure you are using `Lock.js` version 11.16 or later. 
:::

## Configure and enable the connection in Auth0

1. Go to the [Auth0 Dashboard > Connections > Social](${manage_url}/#/connections/social) and click on the **Apple** connection.

2. On the **Settings** tab, fill in the following fields:

    * **Client ID** (Services ID)
    * **Client Secret Signing Key**
    * **Apple Team ID**
    * (optional) **Key ID** (Apple will accept the key without the ID)

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)

3. Click **Save**.

4. [Test the connection](/connections/social/apple/test-siwa-connection). 

## Verify domain ownership on the Apple Developer portal

1. Move your project code to your server and make it run like you did locally. You still don't need to provide the final environment variables. To achieve that, you can use whatever means you prefer. For example, you can use Git, or you can move the files manually (with the help of `scp` or similar). 

2. After running this project on an internet-accessible server (which must respond on behalf of the domain you configured in the Apple developer account), go back to the page you left open on the Apple Developer portal (**Register a Services ID**), and click **Verify**. If you got everything right, Apple will confirm that you own the informed domain.

## Configure client variables

Now that you have verified your domain with Apple, define the environment variables needed to use this identity provider. 

For most OAuth-compliant identity providers, the `CLIENT_SECRET` variable is static. However, Apple rotates this secret by using signed JSON Web Tokens (JWTs) that carry the `exp` claim. To generate this key, go to **Keys** in **Certificates, Identifiers, & Profiles** section in your Apple Developer portal and configure the following variables: 

* **CLIENT_ID**: Gets the value that you used as the identifier of the Service ID you created at Apple  (`com.<YOUR CUSTOM DOMAIN>.webapp`). 
* **CALLBACK**: The URL to which the user will be redirected after the authentication process takes place. You will have to use the value you passed to the **Return URL** field (`https://<YOUR CUSTOM DOMAIN>/login/callback`) on the same Service ID. 

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
* [Configure Email Relay Service for Sign In with Apple](/connections/apple-siwa/configure-email-relay-service)
add-siwa-to-native-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
