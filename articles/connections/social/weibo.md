---
title: Connect Apps to Weibo
connection: Weibo
image: /media/connections/weibo.png
seo_alias: weibo
index: 34
description: How to add Weibo login to your app
toc: true
topics:
  - connections
  - social
  - weibo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Weibo

You can add functionality to your web app that allows your users to log in with Weibo. 

## Steps

To connect your app to Weibo, you will:

1. [Set up your app in Weibo](#set-up-your-app-in-weibo)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Weibo

1. Register your app with [Weibo](https://open.weibo.com/authentication).

2. Provide a <dfn data-key="callback">callback URL</dfn> during the registration process. 

  `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects') %>

After the registration process, Weibo provides you with an **appkey** and a corresponding **appkey secret**. 

### Create and enable a connection in Auth0

[Set up the Weibo social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
