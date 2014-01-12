# Obtaining an API Key and Secret Key for RenRen

To configure a RenRen OAuth2 connection you will need to register your Auth0 tenant on their [integration portal](http://app.renren.com/developers).

##1. Log in into the integration portal and register a new App:

![](img/renren-register-1.png)

---

##2. Enter app information and callback URL:

Use the following value for the callback URL:

	https://@@account.namespace@@/login/callback

![](img/renren-register-2.png)

---

##3. Get API Key and Secret Key:

Once the app is registered, enter the new API Key and Secret Key in Auth0's RenRen connection:

![](img/renren-register-3.png)
