# Obtaining a ClientId and Client Secret for vKontakte

To configure an vKontakte connection you will need to register your Auth0 instance as a vKontakte application.

##1. Create a new Application in vKontakte:
Log in into vKontakte and [create a new app](http://vk.com/editapp?act=create):

![](img/vkontakte-create-app.png)

You will be required to confirm the request with an SMS message:

![](img/vkontakte-validate-create-app.png)

---

##2. Register a new application

Complete the form:

![](img/vkontakte-register-app.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your ClientId and ClientSecret

Once the application is registered, enter your new `ClientId` and `ClientSecret` into the connection settings in Auth0.

![](img/vkontakte-add-connection.png)

