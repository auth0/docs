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

Auth0 enables you to use the Sign In with Apple capability to provide Apple-based authentication to your applications. You can include Sign In with Apple for your native Apple applications, web applications, or applcationss that run on other platforms (such as Android).

::: warning
The [Apple App Store Developer Guidelines](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple) require that Sign In with Apple (SIWA) must be available in all apps that use third-party sign-in options such as Facebook or Google.
:::

## Prerequisites

Before you add support for SIWA to your web app, you'll need:

* An [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).
* A domain (such as <YOUR CUSTOM DOMAIN>.com) to point to and an internet-accessible server where you will run the app that responds on behalf of this domain. You will also need to configure this server with a TLS certificate (Apple won't accept unsecured HTTP connections). To use the Email Relay Service, you will also need to configure your domain with Sender Policy Framework (SPF) DNS TXT records.

::: note
You can set this up using [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04), [Freenom](https://freenom.com/), or [Let's Encrypt](https://letsencrypt.org/).
:::

* A [Custom Domain](/custom-domains) set up on your Auth0 tenant for domain verification with Apple. Custom domains are not strictly required to use SIWA authorization. Domain validation is required for sending emails to private Apple addresses in native and web apps. 

![Apple Sign In with Apple Setup Flow](/media/articles/connections/social/apple/apple-siwa-setup-flow.png)

## Keep reading

* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits for Sign In with Apple](/policies/rate-limits#limits-on-sign-in-with-apple)
* [Set Up Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple)
* [Configure Email Relay Service for Sign In with Apple](/connections/apple-siwa/configure-email-relay-service)
* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
