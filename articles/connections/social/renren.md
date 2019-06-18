---
title: Connect your app to RenRen
connection: RenRen
image: /media/connections/renren.png
seo_alias: renren
description: How to obtain an API Key and Secret Key for RenRen.
toc: true
topics:
  - connections
  - social
  - renren
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to RenRen

To configure a RenRen OAuth2 connection, you will need to register Auth0 on the RenRen integration portal.

## 1. Create a new App

Log into the RenRen [integration portal](http://app.renren.com/developers) and click **Create New App**:

![](/media/articles/connections/social/renren/renren-register-1.png)

## 2. Enter app information

Complete the required information on this page. Enter your <dfn data-key="callback">callback URL</dfn> for the *callback URL*:

  https://${account.namespace}/login/callback

  <%= include('../_find-auth0-domain-redirects') %>

Click **Create App**.

![](/media/articles/connections/social/renren/renren-register-2.png)

## 3. Get your *API Key* and *Secret Key*

Once the app is created, the `API Key` and `Secret Key` will be displayed on the following page:

![](/media/articles/connections/social/renren/renren-register-3.png)

## 4. Copy your *API Key* and *Secret Key*

Go to the [Social Connections](${manage_url}/#/connections/social) section of your Auth0 Dashboard and choose **RenRen**. Copy the `API Key` and `Secret Key` from the **New App** page on RenRen into fields on this page on Auth0:

![](/media/articles/connections/social/renren/renren-register-4.png)

<%= include('../_quickstart-links.md') %>

