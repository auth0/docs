---
title: Connect Apps to Instagram
connection: Instagram
index: 19
image: /media/connections/instagram.png
seo_alias: instagram
description: Learn how to add login functionality to your app with Instagram. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
public: false
topics:
  - connections
  - social
  - instagram
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Instagram

You can add functionality to your web app that allows your users to log in with Instagram.

::: note
Instagram has deprecated their legacy APIs in favor of the new [Instagram Graph API](https://developers.facebook.com/docs/instagram-basic-display-api), which requires users to authenticate using Facebook Login.
:::

## Prerequisites

Before you connect your Auth0 app to Instagram, you must have a [Facebook Developer](https://developers.facebook.com/) account. Follow the instructions in [Getting Started with the Instagram Graph API](https://developers.facebook.com/docs/instagram-api/getting-started/). You must get an <dfn data-key="access-token">access token</dfn> that allows you to access the Facebook API.

## Steps

To connect your app to Instagram, you will:

1. [Set up your app with the Graph API](#set-up-your-app-with-the-graph-api)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app with the Graph API

1. Log in to the [Facebook Developer](https://developers.facebook.com/) portal.
2. Follow steps for [App Development](https://developers.facebook.com/docs/apps#register) to register your app.
3. Add **Facebook Login** to your app in the **App Dashboard**.
4. On the **Facebook Login > Settings** page, under **Valid Oauth Redirect URIs**, enter your <dfn data-key="callback">callback URL</dfn>:
  `https://${account.namespace}/login/callback`

  You can also set a **Deauthorize Callback URL** that will be called when a user deauthorizes your app.

<%= include('../_find-auth0-domain-redirects') %>

::: note
If your application requests sensitive permissions, it may be [subject to review by Facebook](https://developers.facebook.com/docs/apps/review/). Only the `default` and `email` permissions do not currently require app review. For info on Facebook permissions, see Facebook's [Facebook Login Permissions Reference](https://developers.facebook.com/docs/facebook-login/permissions/).
:::

Once you are done you should have two pieces of information: the **Client ID** and **Client Secret** for your app.

### Create and enable a connection in Auth0

[Set up the Instagram social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
