---
title: Add Sign in with Apple to Your App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
beta: true
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
# Add Sign in with Apple to Your App

This guide will show you how to add functionality to your web app that allows your users to use Apple's "Sign in with Apple" functionality. Using the Apple connection will require the following:

* An [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple.
* A [Custom Domain](/custom-domains) set up on your Auth0 tenant (this is required because you must be able to do domain verification with Apple).

::: note
You can test out the Apple connection by simply going to the [Dashboard](${manage_url}) to **Connections > Social** and Try the Apple connection, leaving the settings blank. This will let you test it out with Auth0’s developer credentials. Prior to use in production applications, however, you will need to set up your own, which this guide details.
:::

## 1. Set up your app in your Apple Developer Account

Once your Developer Account is set up, you can follow the instructions in the [Apple Setup Guide](/connections/apple-setup) to get your app set up.

While setting up your app, make sure you save the following items for later:

* The Client ID (the Service ID)
* The Client Secret Signing Key
* The Apple Team ID
* The Client Signing Key ID (optional)

When setting up the app, your **Return URL** should be in the following format: `https://<YOUR CUSTOM DOMAIN>/login/callback`. If you have any issues, refer to the [Apple Documentation](https://developer.apple.com/sign-in-with-apple/get-started/).

## 2. Create and enable a connection in Auth0

Once you have the credentials you need from your Apple developer account, go to [**Connections** > **Social**](${manage_url}) in the Dashboard, and click on the **Apple** connection.

Fill in the Client ID (Services ID), Client Secret Signing Key, the Team ID, and the Client Signing Key ID (if you have it) here. You can also fill in the Key ID, but this is optional, as Apple will accept the key without the ID.

![Apple Connection Settings](/media/articles/connections/social/apple/apple_connection.png)

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

::: note
If you are using the Classic Universal Login flow, or embedding Lock.js in your application, make sure you are using Lock.js version 11.16 or later.
:::

## Keep reading

* [What is Sign in with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* [Apple's Sign in with Apple page](https://developer.apple.com/sign-in-with-apple/)

<%= include('../_quickstart-links.md') %>
