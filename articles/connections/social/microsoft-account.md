---
title: Connect Apps to Microsoft
connection: Microsoft Account
image: /media/connections/ms.png
index: 22
alias:
 - live-id
 - microsoft-live
 - windowslive
 - windows-live
seo_alias: microsoft-account
description: Learn how to add login functionality to your app with Microsoft Accounts. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - microsoft
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Connect Apps to Microsoft Account

You can add functionality to your web app that allows your users to log in with a Microsoft Account. 

## Prerequisites

Before you connect your Auth0 app to Microsoft Account, you must have:

* An account on the [Azure](https://azure.microsoft.com/en-us/free/?ref=microsoft.com&utm_source=microsoft.com&utm_medium=docs&utm_campaign=visualstudio) portal
* An [Azure AD Tenant](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant).

## Steps

To connect your app to Microsoft Account, you will:

1. [Set up your app in Microsoft Account](#set-up-your-app-in-microsoft-account)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Microsoft Account

1. Follow the instructions in [Quickstart: Register an application with the Microsoft identity platform (Preview)](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

2. While setting up your app, when asked to set a **Redirect URI**, enter your <dfn data-key="callback">callback URL</dfn>:
  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects.md') %>

Microsoft will generate an **Application (client) ID** for your application. You can find this on the app's **Overview** screen. 

### Create and enable a connection in Auth0

[Set up the Microsoft Account social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Application (client) ID** and **Application (client) Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>