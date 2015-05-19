---
connection: Microsoft Account (formerly LiveID)
---

# Obtaining a ClientId and Client Secret in Microsoft Account

To configure Microsoft Account OAuth connections you need to register an application in the Live Connect Developer Center.

##1. Log in into Live Connect Developer Center
Log into [the Developer Center](https://account.live.com/developers/applications), then select __My Apps__:

![](@@env.MEDIA_URL@@/articles/connections/social/microsoft-account/ma-portal-1.png)

---

##2. Create an application

![](@@env.MEDIA_URL@@/articles/connections/social/microsoft-account/ma-portal-2.png)

After the app is created, copy the `ClientId` and `ClientSecret` and enter them into your connection settings.

Also, make sure you setup the callback URL for the app. That information should go into the `redirect domain` textbox and for your setup is:

	https://@@account.namespace@@/login/callback
