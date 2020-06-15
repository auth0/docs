---
title: Connect Apps to RenRen
connection: RenRen
image: /media/connections/renren.png
seo_alias: renren
description: Learn how to add login functionality to your app with RenRen. You will need to obtain an API Key and Secret Key for RenRen.
toc: true
index: 26
topics:
  - connections
  - social
  - renren
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to RenRen

You can add functionality to your web app that allows your users to log in with RenRen. 

## Prerequisites

Before connecting your Auth0 app to RenRen, you must have a [RenRen Developer](http://app.renren.com/developers) account.

## Steps

To connect your app to RenRen, you will:

1. [Set up your app in RenRen](#set-up-your-app-in-renren)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in RenRen

1. Log in to the [RenRen Integration portal](http://app.renren.com/developers) and click **Create New App**.

2. Complete the form and enter your <dfn data-key="callback">callback URL</dfn> for the *callback URL*:

  https://${account.namespace}/login/callback

<%= include('../_find-auth0-domain-redirects') %>

3/ Click **Create App**. The `API Key` and `Secret Key` is displayed.

### Create and enable a connection in Auth0

[Set up the RenRen social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

