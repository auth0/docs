---
connection: vKontakte
image: /media/connections/vkontakte.png
---

# Obtaining an Application ID and Secure Key for vKontakte

To configure an vKontakte connection you will need to register your Auth0 instance as a vKontakte application.

##1. Create a new Application in vKontakte:
Log in into vKontakte and [create a new app](http://vk.com/editapp?act=create):

![](/media/articles/connections/social/vkontakte/vkontakte-create-app.png)

You will be required to confirm the request with an SMS message:

![](/media/articles/connections/social/vkontakte/vkontakte-validate-create-app.png)

---

##2. Register a new application

Complete the form:

![](/media/articles/connections/social/vkontakte/vkontakte-register-app.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your Application ID and Secure Key

Once the application is registered, enter your new `Application ID` and `Secure Key` into the connection settings in Auth0.

![](/media/articles/connections/social/vkontakte/vkontakte-add-connection.png)
