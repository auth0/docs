---
title: Connect your app to Docomo dAccount
connection: Docomo
image: /media/connections/daccount.png
seo_alias: docomo
description: How to obtain a Client ID and Client Secret for Docomo dAccount.
toc: true
topics:
  - connections
  - social
  - docomo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Docomo dAccount

To configure a Docomo dAccount connection you will need to register Auth0 on the [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/).

## 1. Add a new Service

First log in into your [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/), once you have logged in click on the **RP site information management (RPサイト情報管理画面)** link on the side navigation.

![dAccount Connect Top](/media/articles/connections/social/docomo/connect-top.png)

This will bring up RP site information management page. Click the **Add new RP site info (新規RPサイト情報追加)** button to add a new service.

![dAccount RP Site Info](/media/articles/connections/social/docomo/rp-info-1.png)

Fill out the form by providing the following information:

| Field | Description
--------|------------
Service name (サービス名) | Your application's name.
Service overview (サービス概要) | A brief description of your application.
<dfn data-key="access-token">Access Token</dfn> lifetime (アクセストークン有効期間 秒) | The lifetime of your Access Token in seconds.
Redirect URI (リダイレクトURI) | The <dfn data-key="callback">callback URL</dfn> for your application (`https://${account.namespace}/login/callback`)
Available scopes (利用可能スコープ) | The <dfn data-key="scope">scopes</dfn> for the information you are requesting for your app.

<%= include('../_find-auth0-domain-redirects') %>

![dAccount RP Site Registration](/media/articles/connections/social/docomo/rp-register.png)

When finished, click **Register (登録)**.

## 2. Get your **Client ID** and **Client Secret**

Go to the details page for your service by clicking on the **Details (詳細)** button.

![dAccount RP site info](/media/articles/connections/social/docomo/rp-info-2.png)

This page will contain your **Client ID (クライアントID)** and **Client Secret (クライアントシークット)**, to be used in the next step.

![dAccount Service Details](/media/articles/connections/social/docomo/service-details.png)

## 3. Setup the Connection to Auth0

In a separate tab or page, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

Click on the **NTT Docomo** connection.

Enter your **Client ID** and **Client ID** from the dAccount Connect service you created, select your **Attributes** then click **SAVE**.

![Paste your Client ID and Client Secret](/media/articles/connections/social/docomo/enter-keys.png)

Next on the **Clients** tab, enable which of your applications will be able to use this connection. After enabling the applications, click **SAVE**.

## 4. Test the Connection

On the [Connections > Social](${manage_url}/#/connections/social) page of the Auth0 dashboard you should now see a **TRY** button with the NTT Docomo connection.

![Try Button](/media/articles/connections/social/docomo/try-connection.png)

Click on this to test the new connection. If your connection has been correctly configured, this should take you to a login page where you can log in with your dAccount.

<%= include('../_quickstart-links.md') %>

