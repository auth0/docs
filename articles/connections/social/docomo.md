---
title: Connect Apps to Docomo dAccount
connection: Docomo
image: /media/connections/daccount.png
seo_alias: docomo
description: Learn how to add login functionality to your app with Docomo dAccount. You will need to obtain a Client Id and Client Secret for Docomo.
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

# Connect Apps to Docomo dAccounts

You can add functionality to your web app that allows your users to log in with Docomo dAccount. 

## Prerequisites

Before connecting your Auth0 app to Docomo dAccount, you must have a [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/) account.

## Steps

To connect your app to Docomo dAccount, you will:

1. [Set up your app in Docomo dAccount](#set-up-your-app-in-docomo-daccount)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Docomo dAccount

1. Log in to the [dAccount Connect Portal](https://dac-g.apl01.spmode.ne.jp/VIEW_OC01/GOCA00004/), and click on the **RP site information management (RPサイト情報管理画面)** link on the side navigation.

2. Click the **Add new RP site info (新規RPサイト情報追加)** button to add a new service.

3. Fill out the form by providing the following information:

| Field | Value to enter |
--------|----------------|
| Service name (サービス名) | Application name. |
| Service overview (サービス概要) | Brief description of your application. |
| <dfn data-key="access-token">Access Token</dfn> lifetime (アクセストークン有効期間 秒) | Lifetime of your Access Token in seconds. |
| Redirect URI (リダイレクトURI) | `https://${account.namespace}/login/callback` |
| Available scopes (利用可能スコープ) | <dfn data-key="scope">Scopes</dfn> for the information you are requesting for your app. |

<%= include('../_find-auth0-domain-redirects') %>

4. When finished, click **Register (登録)**.

5. Go to the details page for your service by clicking on the **Details (詳細)** button. This page contains your **Client ID (クライアントID)** and **Client Secret (クライアントシークット)**; make note of these.

### Create and enable a connection in Auth0

[Set up the Docomo dAccount social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

