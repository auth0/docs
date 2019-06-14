---
title: Add Login with Apple to Your App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your app with Apple. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
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
# Add Apple Login to Your App

This guide will show you how to add functionality to your web app that allows your users to "Sign in with Apple". Using the Apple connection will require the following:

* An Apple Developer account, which is a paid account with Apple.
* A Custom Domain set up on your Auth0 tenant (This is required because you must be able to do domain verification with Apple).

## 1. Set up your app in your Apple Developer Account

Once your Developer Account is set up, you can follow the instructions in the [Sign In With Apple Documentation](https://developer.apple.com/sign-in-with-apple/get-started/) to get your app set up.

While setting up your app, make sure you make save the following items for later:

* The Client ID (the Service ID)
* The Client Signin Key
* The Apple Team ID

Also note that when setting up the app, your **Return URL** should be in the following format: `https://<YOUR CUSTOM DOMAIN>/login/callback`.

## 2. Create and enable a connection in Auth0

[Set up the Apple social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the required Client ID, Signin Key, and Team ID that were generated in Step 1.

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

## Additional Info

* [What is Sign in with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* [Apple's Sign in with Apple page](https://developer.apple.com/sign-in-with-apple/)

<%= include('../_quickstart-links.md') %>
