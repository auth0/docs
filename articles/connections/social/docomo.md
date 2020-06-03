---
title: Connect Apps to Docomo dAccount
connection: Docomo
image: /media/connections/daccount.png
seo_alias: docomo
description: How to obtain a Client ID and Client Secret for Docomo dAccount.
toc: true
index: 7
topics:
  - connections
  - social
  - docomo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Docomo dAccount

You can add functionality to your web app that allows your users to log in with Docomo dAccount. 

## Prerequisites

Before connecting your Auth0 app to Docomo dAccount, you must have an account on the [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/).

## Steps

To connect your app to Shopify, you will:

1. [Set up your app in Docomo dAccount](#set-up-your-app-in-docomo-daccount)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app on Docomo dAccount

1. Log in into your [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/), and click on the **RP site information management (RPサイト情報管理画面)** link on the side navigation.

2. Click the **Add new RP site info (新規RPサイト情報追加)** button to add a new service.

3. Fill out the form by providing the following information:

| Field | Description
--------|------------
Service name (サービス名) | Your application's name.
Service overview (サービス概要) | A brief description of your application.
<dfn data-key="access-token">Access Token</dfn> lifetime (アクセストークン有効期間 秒) | The lifetime of your Access Token in seconds.
Redirect URI (リダイレクトURI) | The <dfn data-key="callback">callback URL</dfn> for your application (`https://${account.namespace}/login/callback`)
Available scopes (利用可能スコープ) | The <dfn data-key="scope">scopes</dfn> for the information you are requesting for your app.

<%= include('../_find-auth0-domain-redirects') %>

4. When finished, click **Register (登録)**.

5. Go to the details page for your service by clicking on the **Details (詳細)** button. This page contains your **Client ID (クライアントID)** and **Client Secret (クライアントシークット)**, to be used in the next step.

### Create and enable a connection in Auth0

[Set up the Docomo dAccount social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

