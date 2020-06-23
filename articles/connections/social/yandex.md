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

Set up an app in [Yandex](https://oauth.yandex.ru/client/new) using Yandex's [Application Registration](https://yandex.ru/dev/oauth/doc/dg/tasks/register-client-docpage/) doc. During this process, Yandex will generate an **Application ID** and **Application Password** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Callback URL | `https://${account.namespace}/login/callback` |
| Scopes | Select the appropriate options depending on your application's needs. |

<%= include('../_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Yandex social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Application ID** and **Application Password**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
