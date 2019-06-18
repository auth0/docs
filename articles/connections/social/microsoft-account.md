---
title: Add Microsoft Account Login to Your App
connection: Microsoft Account
image: /media/connections/ms.png
index: 12
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
# Add Microsoft Account Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with Microsoft Accounts.

## 1. Set up your app in the Microsoft Azure portal

To learn how, follow Microsoft's [Quickstart: Register an application with the Microsoft identity platform (Preview)](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) doc.

During this process, Microsoft will generate an **Application (client) ID** for your application; you can find this on the app's **Overview** screen. Make note of this.

While setting up your app, make sure you use the following settings:

* When asked to set a **Redirect URI**, enter your <dfn data-key="callback">callback URL</dfn> `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects.md') %>

## 2. Add credentials to your Microsoft app

To learn how, follow Microsoft's [Quickstart: Configure a client application to access web APIs (Preview)](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-credentials-to-your-web-application) doc. You want to generate a **Client secret**. Once generated, make note of it.

## 3. Create and enable a connection in Auth0

[Set up the Microsoft social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Application (client) ID** generated in Step 1 and the **Client Secret** generated in Step 2.

## 4. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

<%= include('../_quickstart-links.md') %>