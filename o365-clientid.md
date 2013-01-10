# Obtaining a ClientId and Client Secret for an Office 365 connection

To configure Microsoft Office 365 connections you need to a register an application in the Seller Dashboard.

##1. Log in into the Seller Dashboard
Log into [the Seller Dashboard](https://sellerdashboard.microsoft.com), then select __client ids__:

![](img/o365-portal-1.png)

---

##2. Create a new OAuth client id

![](img/o365-portal-2.png)

Complete the form with your app information:

* **Friendly Client ID Name**: @@account.appName@@
* **App Domain**: @@tenant@@.auth0.com
* **App Redirect URL**: https://@@account.namespace@@/login/callback

![](img/o365-portal-3.png)

##3. Generate the ClientId and ClientSecret

Copy the `ClientId` and `ClientSecret` into your connection settings. This is your last chance to copy the `ClientSecret` in Office 365! It is not shown anywhere else once you close this window.

![](img/o365-portal-4.png)
