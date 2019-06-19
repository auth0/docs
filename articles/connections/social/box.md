---
title: Connect your app to Box
connection: Box
image: /media/connections/box.png
seo_alias: box
description: How to obtain a Client Id and Client Secret for Box.
toc: true
topics:
  - connections
  - social
  - box
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Box

To configure a Box OAuth2 connection, you will need to register your Auth0 tenant on their [developer portal](https://developers.box.com/).

## 1. Register a new Box app

Log into the Box developer portal and click **My Apps** and then select **Create a Box Application**:

![](/media/articles/connections/social/box/box-register-1.png)

Name your new app and click **Create Application**:

![](/media/articles/connections/social/box/box-register-2.png)

## 2. Edit your app Properties

Once the app is created, click on **Edit Application** and review the form. There are a number of properties that you can change (such as contact information, logos, and so on):

![](/media/articles/connections/social/box/box-register-3.png)

Scroll down to find the `client_id` and `client_secret` fields under the **OAuth2 Parameters** section:

![](/media/articles/connections/social/box/box-register-4.png)

Enter your <dfn data-key="callback">callback URL</dfn> as the `redirect_uri`:

  https://${account.namespace}/login/callback

  <%= include('../_find-auth0-domain-redirects') %>

While on this page, make sure to define the appropriate permission <dfn data-key="scope">**scopes**</dfn> for your app.

## 3. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Box**. Copy the `Client Id` and `Client Secret` from the **OAuth2 Parameters** section of your app on Box into the fields on this page on Auth0:

![](/media/articles/connections/social/box/box-add-connection.png)

<%= include('../_quickstart-links.md') %>

