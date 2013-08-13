# Obtaining an Client Id and Client Secret for 37Signals

To configure a 37Signals OAuth2 connection you will need to register your Auth0 tenant on their [integration portal](https://integrate.37signals.com/).

##1. Log in into the integration portal and register a new App:

The first form consists of basic information about your app (name, website, logo):

![](img/37signals-register-1.png)

---

##2. Define the scope of access and enter your callback URL:

Define which 37Signals applications you want access to, and complete the callback URL in Auth0:

![](img/37signals-register-2.png)

	https://@@account.namespace@@/login/callback

---

##3. Get your Client Id and Client Secret

Once the application is registered, enter your new `Client Id` and `Client Secret` into the connection settings in Auth0.

![](img/37signals-register-4.png)



