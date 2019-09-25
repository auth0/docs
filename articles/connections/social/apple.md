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

Auth0 enables you to use the Sign In with Apple (SIWA) capability to provide Apple-based authentication to your applications. You can include SIWA for your native Apple applications, web applications, or applcationss that run on other platforms (such as Android).

::: warning
The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that SIWA must be available in all applications that use third-party sign-in options such as Facebook or Google.
:::

## Prerequisites

Before you add support for SIWA to your app, you'll need:

* An [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/).).
* A domain to point to and an internet-accessible server where you will run the app that responds on behalf of this domain. You will also need to configure this server with a TLS certificate. Apple won't accept unsecured HTTP connections. 

* A [Custom Domain](/custom-domains) set up on your Auth0 tenant for domain verification with Apple. Custom domains are not strictly required to use SIWA authorization. Domain validation is required for sending emails to private Apple addresses in native and web apps. To use the Apple Email Relay Service, configure your domain with Sender Policy Framework (SPF) DNS TXT records.

## How it works

Once you have registered your application with Apple and configured your application connection settings in Auth0 to use the IDs and keys obtained from Apple, your users can sign in to your applications using their Apple IDs and passwords. 

![Apple Sign In with Apple Setup Flow](/media/articles/connections/social/apple/apple-siwa-setup-flow.png)

When your users return to your app, you can log them in automatically if their login session is still valid. You can retrieve their credentials from the keychain and check if the access token is still valid. If the access token has expired, you can renew it using a refresh token. 

After you setup and configure SIWA and exchange the authorization code for Auth0 credentials, you can use the access tokens to [call APIs](/flows/guides/auth-code-pkce/call-api-auth-code-pkce), [assign roles to users](/dashboard/guides/users/assign-roles-users), and use the access tokens to [link accounts](/link-accounts). 

## Keep reading

* [Register Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple)
* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
