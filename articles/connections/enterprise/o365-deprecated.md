---
title: Connecting Office 365 with Auth0 (Deprecated)
connection: Office 365 (Deprecated)
image: /media/connections/office-365.png
alias:
  - office365
---

# Obtaining a ClientId and Client Secret for an Office 365 connection

To configure Microsoft Office 365 connections you need to a register an application in the Seller Dashboard.

## 1. Log in into the Seller Dashboard
Log into [the Seller Dashboard](https://sellerdashboard.microsoft.com), then select __client ids__:

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-1.png)

---

## 2. Create a new OAuth client id

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-2.png)

Complete the form with your app information:

* **Friendly Client ID Name**: ${account.appName}
* **App Domain**: ${account.namespace}
* **App Redirect URL**: https://${account.namespace}/login/callback

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-3.png)

## 3. Generate the ClientId and ClientSecret

Copy the `ClientId` and `ClientSecret` into your connection settings. This is your last chance to copy the `ClientSecret` in Office 365! It is not shown anywhere else once you close this window.

![](/media/articles/connections/enterprise/o365-deprecated/o365-portal-4.png)
