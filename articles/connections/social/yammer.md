---
title: Connect Apps to Yammer
connection: Yammer
image: /media/connections/yammer.png
description: How to obtain the credentials required to configure your Auth0 connection to Yammer.
seo_alias: yammer
index: 37
toc: true
topics:
  - connections
  - social
  - yammer
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Yammer

You can add functionality to your web app that allows your users to log in with Yammer. 

## Prerequisites

Before connecting your Auth0 app to Yammer, you must have a [Yammer Developer](https://developer.yammer.com/) account.

## Steps

To connect your app to Yammer, you will:

1. [Set up your app in Yammer](#set-up-your-app-in-yammer)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Yammer

1. Log in to [Yammer Developer Center](https://developer.yammer.com/) and click on **Apps** in the top menu.
2. Click on **Register an App**.
3. Then click **Register New App**.
4. Name your app and complete the form. For the **Redirect URI**, enter your <dfn data-key="callback">callback URL</dfn>: 

  `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects') %>

5. Click **Continue**. Once your app is created, your `Client ID` and `Client Secret` will be displayed.

### Create and enable a connection in Auth0

[Set up the Yammer social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

