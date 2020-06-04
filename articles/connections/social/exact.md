---
title: Connect Apps to Exact
connection: Exact
image: /media/connections/exact.png
seo_alias: exact
description: Learn how to connect your application to Exact.
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

1. Log in to the [Exact Online App Center](https://apps.exactonline.com/)and click **Manage Apps**, then **Add a new application**. You can register applications in multiple regions with Exact. By default, Auth0 will use `https://start.exactonline.nl`, but this value can be overridden with the `Base URL` parameter.

2. Enter your app name.

3. Enter your <dfn data-key="callback">callback URL</dfn>: 

  `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects') %>

4. Click **Save**.

5. Click **Edit** below your app. 

6. On the **Manage App** page, under the **Authorization** section, copy the `Client Id` and `Client Secret` provided.

### Create and enable a connection in Auth0

[Set up the Exact social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
