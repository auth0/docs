# Obtaining a ClientId and Client Secret for vKontakte

To configure an vKontakte connection you will need to register your Auth0 instance as a vKontakte application.

##1. Login
Log in into [vKontakte](http://vk.vom) and goto the [developers](http://vk.com/dev) section.

##2. Create a new Application
Create a new __Application__:

![](img/vkontakte-create-app.png)

---

##2. Register a new application

Click on the __Register New Application__ button and complete the form:

![](img/amazon-register-app.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your ClientId and ClientSecret

Once the application is registered, enter your new `ClientId` and `ClientSecret` into the connection settings in Auth0.

![](img/amazon-add-connection.png)


