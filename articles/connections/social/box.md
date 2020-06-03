---
title: Connect Apps to Box
connection: Box
image: /media/connections/box.png
seo_alias: box
description: How to obtain a Client Id and Client Secret for Box.
toc: true
index: 6
topics:
  - connections
  - social
  - box
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Box

You can add functionality to your web app that allows your users to log in with Box. 

## Prerequisites

Before connecting yor Auth0 app to Box, you will need to register your Auth0 tenant on their [developer portal](https://developers.box.com/).

## Steps

To connect your app to Shopify, you will:

1. [Set up your app in Box](#set-up-your-app-in-box)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Box

1. Log into the Box developer portal and click **My Apps** and then select **Create a Box Application**.

2. Name your new app and click **Create Application**.

3. Click on **Edit Application** and review the form. 

4. Scroll down to `client_id` and `client_secret` fields under the **OAuth2 Parameters** section.

5. Enter your <dfn data-key="callback">callback URL</dfn> as the `redirect_uri`:

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

6. Define the appropriate permission <dfn data-key="scope">**scopes**</dfn> for your app.

## Create and enable a connection in Auth0

[Set up the Box social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
