---
title: Connect Apps to Baidu
connection: Baidu
image: /media/connections/baidu.png
seo_alias: baidu
description: Learn how to add login functionality to your app with Baidy. You will need to obtain a Client Id and Client Secret for Baidu.
toc: true
index: 3
topics:
  - connections
  - social
  - baidu
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Baidu

You can add functionality to your app that allows your users to log in with Baidu.

## Prerequisites

Before connecting your Auth0 app to Baidu, you must have an account on the [Baidu integration portal](https://developer.baidu.com/dev).

## Steps

To connect your app to Baidu, you will:

1. [Set up your app in Baidu](#set-up-your-app-in-baidu)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Baidu

1. Log into the [integration portal](https://developer.baidu.com/dev) and register a new app.

2. Get your API Key and Secret Key.

3. Enter the callback URL. Use the following value for the <dfn data-key="callback">callback URL</dfn>:

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

4. Select your application on the console, and then click on `API 管理 -> 安全设置`

### Create and enable a connection in Auth0

[Set up the Baidu social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.


<%= include('../_quickstart-links.md') %>
