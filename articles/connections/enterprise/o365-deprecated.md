---
title: Connecting Office 365 with Auth0 (Deprecated)
connection: Office 365 (Deprecated)
image: /media/connections/office-365.png
alias:
  - office365
seo_alias: o365-deprecated
description: How to obtain a ClientId and Client Secret for an Office 365 connection.
---

::: warning-banner
__Warning:__ The Office 365 connection is deprecated, you should use Windows Azure AD instead. <br/>
See [here](/office365-deprecated) for more details.
:::

# Obtain a *ClientId* and *Client Secret* for an Office 365 connection

To configure Microsoft Office 365 connections, you need to a register an application in the Seller Dashboard.

## 1. Log into the Seller Dashboard
Log into the [Seller Dashboard](https://sellerdashboard.microsoft.com), then select **client ids**.

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-1.png)

## 2. Create a new OAuth client id

Select **Add a new oauth client id**.

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-2.png)

Complete the form with your app information:

* **Friendly Client ID Name**: ${account.appName}
* **App Domain**: ${account.namespace}
* **App Redirect URL**: https://${account.namespace}/login/callback

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-3.png)

## 3. Generate the *ClientId* and *ClientSecret*

Once you have completed the form, click **GENERATE CLIENT ID**. Your `ClientId` and `ClientSecret` will appear on the page.

This is your only opportunity in Office 365 to copy the `ClientSecret`, it is not shown anywhere else once this window is closed.

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-4.png)

In your Auth0 dashboard, select **Connections > Enterprise**, then select **Office 365**.

Copy the `ClientId` and `ClientSecret` from the Seller Dashboard into your Office 365 connection settings on this page.
