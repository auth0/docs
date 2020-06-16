---
title: Connect Apps to Yahoo
connection: Yahoo!
index: 36
image: /media/connections/yahoo.png
description: Learn how to add login functionality to your app with Yahoo. You will need to obtain a Consumer Key and Consumer Secret for Yahoo.
seo_alias: yahoo
toc: true
topics:
  - connections
  - social
  - yahoo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Yahoo

You can add functionality to your web app that allows your users to log in with Yahoo. 

## Prerequisites

Before connecting your Auth0 app to Shopify, you must have:

* [Yahoo User ID](https://login.yahoo.com)
* [Yahoo Developer](https://developer.yahoo.com/) account

## Steps

To connect your app to Yahoo, you will:

1. [Set up your app in Yahoo](#set-up-your-app-in-yahoo)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Yahoo

Set up an app in Yahoo. During this process, Yahoo will generate a **Client ID** and **Client Secret** for your application; make note of these.

1. Log in to [Yahoo Developer Apps](https://developer.yahoo.com/apps/) and click **Create an App**.

2. Complete information about your app including the following values:

| Field | Value to Provide |
| - | - |
| App URL | `https://${account.namespace}` |
| Redirect URL(s) | `https://${account.namespace}/login/callback` |
namespace}` |
| API Permissions | **Profiles (Social Directory)** (and its subset of available app permissions. You may select additional API permissions, but you must include this option to ensure that Yahoo returns the user's email address. |

<%= include('../_find-auth0-domain-redirects') %>

3. Click **Create App**. Yahoo displays your **Client ID** (Consumer Key) and **Client Secret** (Consumer Secret). 

### Create and enable a connection in Auth0

[Set up the Yahoo social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and the **Client Secret** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
