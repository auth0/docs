---
connection: Instagram
image: /media/connections/instagram.png
---

# Obtaining a Client ID and Client Secret for Instagram

To configure Instagram OAuth2 connections you will need to register Auth0 with Instagram on their [developer portal](http://instagram.com/developer).

##1. Log in into the developer portal
Go to the [developer portal](http://instagram.com/developer), and log in with your Instagram credentials. Click on __Register Your Application__:

![](/media/articles/connections/social/instagram/instagram-devportal-1.png)

---

##2. Complete information about your instance of Auth0

Create a new application and complete the form. Use this URL as your callback:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/instagram/instagram-devportal-2.png)

Enter your new `Client ID` and `Client Secret` into the connection settings in Auth0.
