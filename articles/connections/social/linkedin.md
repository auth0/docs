---
title: Add LinkedIn Login to Your App
connection: LinkedIn
index: 3
image: /media/connections/linkedin.png
seo_alias: linkedin
description: Learn how to add login functionality to your app with LinkedIn. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - linkedin
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add LinkedIn Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with LinkedIn. Along the way, you will also learn how to get an Access Token that will allow you to access the LinkedIn API.

## 1. Set up your app in LinkedIn

Log in to the [LinkedIn Developer portal](https://www.linkedin.com/developers), and click **Create App**. During this process, LinkedIn will generate a **Client ID** and **Client Secret** for your application; you can find these on the app's **Auth** screen under **Application credentials**.

While setting up your app, make sure you use the following settings:

* On the **Auth** screen, under **OAuth 2.0 Settings**, set the following parameters:

| Field |	Description |
| Redirect URLs |	https://${account.namespace}/login/callback |

<%= include('../_find-auth0-domain-redirects') %>

## 2. Create and enable a connection in Auth0

[Set up the LinkedIn social connection](/connections/guides/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and **Client Secret** generated in Step 1.

## 3. Test the connection

You're ready to [test your connection](/connections/guides/test-connections-social).

## Access LinkedIn's API

<%= include('../_call-api', {
  "idp": "LinkedIn"
}) %>

<%= include('../_quickstart-links.md') %>