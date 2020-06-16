---
title: Connect Apps to Exact
connection: Exact
image: /media/connections/exact.png
seo_alias: exact
description: Learn how to add login functionality to your app with Exact.
index: 12
topics:
  - connections
  - social
  - exact
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Exact

You can add functionality to your web app that allows your users to log in with Exact. 

## Prerequisites

Before you connect your Auth0 app to Exact, you must have a [Exact Online App Center](https://apps.exactonline.com/) account.

## Steps

To connect your app to Exact, you will:

1. [Set up your app in Exact](#set-up-your-app-in-exact)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Exact

Set up an app in Exact using Exact's [Register a new app](https://support.exactonline.com/community/s/article/All-All-HNO-Tutorial-resources-eol-files-hlp-eol-app-center---user-eol-appcenter-user-registerapikey-u?language=en_GB) knowledge base article. You will need to log in to see this documentation. During this process, Exact will generate a **Client ID** and **Client Secret** for your application; make note of these.

You can register applications in multiple regions with Exact. By default, Auth0 will use `https://start.exactonline.nl`, but this value can be overridden with the `Base URL` parameter.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Callback URL | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Exact social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
