---
title: Connect your app to Shopify
connection: Shopify
image: /media/connections/shopify.png
seo_alias: shopify
description: How to connect your Auth0 app to Shopify.
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

To connect your Auth0 app to Shopify, you will need to create an app using the Shopify Partner Platform and integrate it with your Auth0 connection.

## Prerequisites

Before connecting your Auth0 app to Shopify, you must be a [member of the Shopify Partners program](https://www.shopify.com/partners).

## 1. Create an app using the Shopify Partner Dashboard

Begin by [creating a new public application](https://help.shopify.com/en/api/getting-started/authentication/public-authentication#generate-credentials-from-your-partner-dashboard) using your Partner Dashboard.

During the app creation process, Shopify will ask you for several URIs. Provide the following:

| Field | Value to Provide |
| - | - |
| App URL | `https://${manage_url}.auth0.com` |
| Whitelisted redirection URL(s) | `https://${manage_url}.auth0.com/login/callback` |

When you've created your app, you'll be directed to your app's overview page, where you'll be shown the **API key** and the **API secret key**. Make a note of these values, since you'll need to provide these to Auth0 when creating your new connection.

## 2. Create your Auth0 connection

After logging into the Auth0 [Dashboard](${manage_url}), go to [Connections > Social](${manage_url}/#/connections/social).

Find **Shopify** and toggle its switch so that it turns green.

![](/media/articles/connections/social/shopify/shopify-devportal-1.png)

The dialog window to configure your connection appears. Provide the following values

| Parameter | Description |
| - | - |
| API key | The Shopify **API key** you received after creating your Shopify app |
| Shared secret | The Shopify **API secret key** you received after creating your Shopify app |
| Shop name | The name of your Shopify store -- usually the first part of your URL, e.g., **shop-name.myshopify.com**

Finally, select the appropriate **Permissions**. These are the permissions Auth0 will request from the Shopify API to request additional information.

![](/media/articles/connections/social/shopify/shopify-devportal-2.png)

Scroll to the bottom and click **Save**.

## 5. Enable the connection

Switch to the **Apps** tab of the Shopify connection, and select the Auth0 apps for which you want to enable this connection.

![](/media/articles/connections/social/shopify/shopify-devportal-3.png)

## 6. Test the connection

Close the connections configuration window to return to the **Connections > Social** section of the Dashboard.

A **TRY** icon will appear next to the Shopify logo. Click **TRY**.

![](/media/articles/connections/social/shopify/shopify-devportal-4.png)

Log in to your Shopify store, then click **Install unlisted app** when prompted to allow your app access. If you have configured everything correctly, you will see the **It works!** page.

![](/media/articles/connections/social/shopify/shopify-devportal-5.png)

::: note
You can use the [Multipass](https://help.shopify.com/api/reference/multipass) feature to automatically authenticate users who have already been verified by Auth0.
:::

<%= include('../_quickstart-links.md') %>