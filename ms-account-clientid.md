---
	Title: Getting Microsoft Account ClientId and ClientSecret
---

###1. Log in into Live Connect Developer Center
Log into [the portal](http://msdn.microsoft.com/en-us/live/ff519582), then select __My Apps__:

![](img/ma-portal-1.png)

###2. Create an application

![](img/ma-portal-2.png)

This is also a good time to setup your callback URL into Auth0:

	http://@@{account.namespace}/login
