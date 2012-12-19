# Obtaining a ClientId and Client Secret for an Office 365 connection

To configure Microsoft Office 365 connections you need to a register an application in the Seller Dashboard.

##1. Log in into the Seller Dashboard
Log into [the Seller Dashboard](https://sellerdashboard.microsoft.com), then select __client ids__:

![](img/o365-portal-1.png)

---

##2. Create a new OAuth client id

![](img/o365-portal-2.png)

Complete your app information. For the __App Redirect URL__ use:

	http://@@account.namespace@@/login/callback

![](img/o365-portal-3.png)

##3. Generate the ClientId and ClientSecret

Once the app is created, the `ClientId` and `ClientSecret` will be available. Enter this information into your connection settings. 

![](img/o365-portal-4.png)
