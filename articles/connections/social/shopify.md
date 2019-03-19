---
title: Add Shopify Login to Your App
connection: Shopify
image: /media/connections/shopify.png
seo_alias: shopify
description: How to add Shopify Login to Your App
toc: true
topics:
  - connections
  - social
  - shopify
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect your app to Shopify

This guide will show you how to enable your users to log in to your Auth0 app using their Shopify credentials.

## Prerequisites

Before connecting your Auth0 app to Shopify, you must be a [member of the Shopify Partners program](https://www.shopify.com/partners).

## 1. Create an app using the Shopify Partner Dashboard

Begin by [creating a new public application](https://help.shopify.com/en/api/getting-started/authentication/public-authentication#generate-credentials-from-your-partner-dashboard) using your Partner Dashboard.

During the app creation process, Shopify will ask you for several URIs. Provide the following:

| Field | Value to Provide |
| - | - |
| App URL | `https://${manage_url}.auth0.com` |
| Whitelisted redirection URL(s) | `https://${manage_url}.auth0.com/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

When you've created your app, you'll be directed to your app's overview page, where you'll be shown the **API key** and the **API secret key**. Make a note of these values, since you'll need to provide these to Auth0 when creating your new connection.

## 2. Create and enable your Auth0 connection

[Set up the Shopify social connection](/connections/guides/set-up-connections-social) in Auth0. Make sure you have the API ID and API secret key Shopify provided to you in Step 1.

## 3. Test the connection

At this point, you're ready to [test your connection](/connections/guides/test-connections-social). Please note that, after logging in, you'll be prompted to allow your app access. Click **Install unlisted app** to do so.

::: note
You can use the [Multipass](https://help.shopify.com/api/reference/multipass) feature to automatically authenticate users who have already been verified by Auth0.
:::

<%= include('../_quickstart-links.md') %>