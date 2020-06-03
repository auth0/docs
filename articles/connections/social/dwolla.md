---
title: Connect Apps to Dwolla
connection: Dwolla
image: /media/connections/dwolla.png
seo_alias: dwolla
description: How to obtain a Client Id and Client Secret for Dwolla.
toc: true
index: 9
topics:
  - connections
  - social
  - dwolla
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Dwolla

You can add functionality to your web app that allows your users to log in with Dwolla. 

## Prerequisites

Before you connect your Auth0 app to Dwolla, you must have an account on the [Dwolla Developer](https://accounts-sandbox.dwolla.com/login) portal.

## Steps

To connect your app to Dwolla, you will:

1. [Set up your app in Dwolla](#set-up-your-app-in-dwolla)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Dwolla

1. Log into the Dwolla [Developer portal](https://accounts-sandbox.dwolla.com/login) and click **Create an application**.

2. Complete the information on this page. Enter your <dfn data-key="callback">callback URL</dfn> in the **OAuth Redirect URL** field:

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

3. Click **Create application**. Once the application is registered, your app's `Key` and `Secret` will be displayed.

### Create and enable a connection in Auth0

[Set up the Dwolla social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>