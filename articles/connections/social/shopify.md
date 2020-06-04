---
title: Connect Apps to Shopify
connection: Shopify
image: /media/connections/shopify.png
seo_alias: shopify
index: 30
description: Learn how to add login functionality to your app with Shopify. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - shopify
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Connect Apps to Shopify

You can add functionality to your web app that allows your users to log in with Shopify. 

## Prerequisites

Before connecting your Auth0 app to Shopify, you must be a member of the [Shopify Partners program](https://www.shopify.com/partners).

## Steps

To connect your app to Shopify, you will:

1. [Set up your app in Shopify](#set-up-your-app-in-shopify)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Shopify

1. Register an app in Shopify using the instructions on [Public Apps](https://help.shopify.com/en/api/getting-started/authentication/public-authentication#generate-credentials-from-your-partner-dashboard). 

2. Complete information about your app including the following values:

| Field | Value to Provide |
| - | - |
| App URL | `https://${account.namespace}` |
| Whitelisted redirection URL(s) | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

3. Submit your settings. Your **API key** and **API secret key** will be displayed.

### Create and enable a connection in Auth0

[Set up the Shopify social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

::: note
To automatically authenticate users who have already been verified by Auth0, you can use the [Multipass](https://help.shopify.com/api/reference/multipass) feature.
:::

<%= include('../_quickstart-links.md') %>