# Obtaining a ClientId and Client Secret in Microsoft Account

To configure Microsoft Account OAuth connections you need to create an application within Microsoft Account portal (formerly known as Live Connect Developer Center). 

##1. Log in into Live Connect Developer Center
Log into [the portal](http://msdn.microsoft.com/en-us/live/ff519582), then select __My Apps__:

![](img/ma-portal-1.png)

---

##2. Create an application

![](img/ma-portal-2.png)

Once created the `ClientId` and `ClientSecret` will be available. Enter this information into your connection settings. 

This is also a good time to setup your callback URL into Auth0:

	http://@@{account.namespace}/login/callback
