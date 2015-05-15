# Obtaining a ClientId and Client Secret for Amazon

To configure an Amazon connection you will need to register Auth0 on the Amazon portal.

##1. Add a new Application
Log in into [Amazon](http://login.amazon.com) and select __App Console__:

![](//cdn.auth0.com/docs/img/amazon-login-1.png)

---

##2. Register a new application

Click on the __Register New Application__ button and complete the form:

![](//cdn.auth0.com/docs/img/amazon-register-app.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your ClientId and ClientSecret

Once the application is registered, enter your new `ClientId` and `ClientSecret` into the connection settings in Auth0.

![](//cdn.auth0.com/docs/img/amazon-add-connection.png)


