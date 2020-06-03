---
title: Connect Apps to LinkedIn
connection: LinkedIn
index: 21
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
# Connect Apps to LinkedIn

You can add functionality to your web app that allows your users to log in with LinkedIn. 

## Prerequisites

Before you connect your Auth0 app to GitHub, you must have an account on the [LinkedIn Developer](https://www.linkedin.com/developers) portal.

## Steps

To connect your app to LinkedIn, you will:

1. [Set up your app in LinkedIn](#set-up-your-app-in-LinkedIn)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in LinkedIn

1. Log in to the [LinkedIn Developer portal](https://www.linkedin.com/developers), and click **Create App**.
2. Provide the basic details about your app.
3. Select the products you'd like to add/integrate into your app. By default, you'll get the abilities to **Share on LinkedIn** and **Sign In with LinkedIn**. You can, however, also use the **Marketing Developer Platform**.
4. Click **Create App**. LinkedIn generates a **Client ID** and **Client Secret** for your application. You can find these on the app's **Auth** screen under **Application credentials**. 
5. On the **Auth** screen under **OAuth 2.0 Settings**. Click the **pencil** icon, then click **Add redirect URL**. Enter the following redirect URL:

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

6. Click **Update** to save your changes.

### Create and enable a connection in Auth0

[Set up the LinkedIn social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

## Access LinkedIn's API

<%= include('../_call-api', {
  "idp": "LinkedIn"
}) %>

<%= include('../_quickstart-links.md') %>
