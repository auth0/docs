# Obtaining an Client Id and Client Secret for Salesforce

To configure a Salesforce OAuth2 connection you will need to register your Auth0 tenant on their __instance__.

##1. Log in into Salesforce and register a new App:

Log into [login.salesforce.com](https://login.salesforce.com/), and click on the __New__ button of __Connected Apps__ in __Build | Create | Apps__:

![](img/salesforce-register-1.png)

---

##2. Complete the basic information about your app, define the scope of access and enter your callback URL:

Complete the basic information about your app (Connected App Name, API Name and Contact Email), complete the callback URL and define Selected OAuth Scopes and click on __Save__:

![](img/salesforce-register-2.png)

	https://@@account.namespace@@/login/callback

---

##3. Get your Client Id and Client Secret

Once the application is registered, enter your new `Consumer Key` and `Consumer Secret` into the connection settings in Auth0.

![](img/salesforce-register-3.png)



