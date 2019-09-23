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

You can add functionality to your native iOS application that allows your users to use Sign In with Apple to authenticate. In addition, you can also try the Auth0 [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa).

## How it works

For a native app, the Sign in with Apple login flow works as follows:

![Sign In with Apple Authentication Flow](/media/articles/connections/social/apple/apple-siwa-authn-flow.png)

* User authenticates via Apple's SDK on their iPhone or iPad. They receive an authorization code. The user does not have to leave the app and use a browser to log in.
* The application calls Auth0's `/oauth/token` endpoint with the following parameters:
    - `subject_token`: the authorization code they received above
    - `subject_token_type`: `http://auth0.com/oauth/token-type/apple-authz-code`
    - `grant_type`: `urn:ietf:params:oauth:grant-type:token-exchange`
    - `client_id`: their Auth0 Client ID
    - `audience` and `scope` as needed (optional)

    Auth0 exchanges the `subject_token` (authorization code) with Apple for an ID token, access token, and refresh token from Apple.
* Auth0 saves the user profile, executes rules and authorization, then issues Auth0 access tokens (refresh tokens and ID tokens) as requested. These tokens are used to protect your APIs and users managed by Auth0.

## Prerequisites

Before you configure Sign In with Apple for your native app in Auth0, do the following:

* Have an [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).

* [Set Up Apps in the Apple Developer Portal](/connections/apple-siwa/guides/set-up-apple).

* Save the following IDs and key for the application connection settings in the Auth0 Dashboard:

  * Client ID (Service ID)
  * Client Secret Signing Key
  * Client Signing Key ID (optional)

## Configure the application client connection in Auth0

Once you have the credentials you need from your Apple Developer account, you need to configure the application client and the connection settings in Auth0.

1. Go to [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings).  

2. At the bottom of the page, click **Show Advanced Settings** and go to the **Mobile Settings** tab. Under **Native Social Login**. enable the **Enable Sign In with Apple** toggle. 

    ![Application Client Settings: Advanced Mobile Settings](/media/articles/connections/social/apple/apple-app-mobile-settings.png)

3. Go to [Dashboard > Connections > Social](${manage_url}/#/connections/social) and click on the **Apple** connection. 

4. On the **Settings** tab, fill in the following fields:

    * **Client ID** (Services ID)
    * **Client Secret Signing Key**
    * (optional) **Key ID** (Apple will accept the key without the ID)

    ![Application Connection Settings](/media/articles/connections/social/apple/apple-connection.png)

5. Click **Save**.

## Keep reading

* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
