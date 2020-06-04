---
title: Connect Apps to Yandex
connection: Yandex
image: /media/connections/yandex.png
seo_alias: yandex
index: 38
description: How to obtain an Application ID and Application Password for Yandex.
toc: true
topics:
  - connections
  - social
  - yandex
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Yandex

You can add functionality to your web app that allows your users to log in with Yandex. 

## Prerequisites

Before connecting your Auth0 app to Yandex, you must have a [Yandex Developer](https://developer.store.yandex.com/) accout.

## Steps

To connect your app to Yandex, you will:

1. [Set up your app in Yandex](#set-up-your-app-in-yandex)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Yandex

1. Log in into [Yandex]((https://oauth.yandex.ru/client/new)) and create a new app. Complete instructions are available [here](http://api.yandex.ru/oauth/doc/dg/tasks/register-client.xml).

2. Complete the form.
3. The <dfn data-key="callback">callback URL</dfn> for your app should be:

  https://${account.namespace}/login/callback

<%= include('../_find-auth0-domain-redirects') %>

4. Scopes in Yandex are also defined in this screen. Select what kind of information you are requesting for your app. Once the application is registered, your `Application ID` and `Application Password` are displayed.

### Create and enable a connection in Auth0

[Set up the Yandex social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
