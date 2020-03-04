---
title: Connect your app to Dwolla
connection: Dwolla
image: /media/connections/dwolla.png
seo_alias: dwolla
description: How to obtain a Client Id and Client Secret for Dwolla.
toc: true
topics:
  - connections
  - social
  - dwolla
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Dwolla

To configure OAuth2 connections with Dwolla, you will need to register Auth0 on the Dwolla Developer portal.

## 1. Log into the developer portal

Log into the Dwolla [Developer portal](https://accounts-sandbox.dwolla.com/login) and click **Create an application**:

![](/media/articles/connections/social/dwolla/dwolla-1.png)

## 2. Register your new app

Complete the information on this page. Enter your <dfn data-key="callback">callback URL</dfn> in the **OAuth Redirect URL** field:

  https://${account.namespace}/login/callback

  <%= include('../_find-auth0-domain-redirects') %>

![](/media/articles/connections/social/dwolla/dwolla-2.png)

Click **Create application**.

## 3. Get your *Key* and *Secret*

Once the application is registered, your app's `Key` and `Secret` will be displayed on the following page:

![](/media/articles/connections/social/dwolla/dwolla-3.png)

## 4. Copy your *Key* and *Secret*

Go to the [Social Connections](${manage_url}/#/connections/social) section of your Auth0 Dashboard and choose **Dwolla**. Copy the `Key` and `Secret` from the **Application** page of your app on Dwolla into the `Client Id` and `Client Secret` fields on this page on Auth0:

![](/media/articles/connections/social/dwolla/dwolla-4.png)

<%= include('../_quickstart-links.md') %>

