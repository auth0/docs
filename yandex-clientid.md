# Obtaining an Application ID and Application Password for Yandex

To configure an Yandex connection you will need to register your Auth0 instance as a Yandex application.

##1. Create a new Application in Yandex:

Log in into Yandex and [create a new app](https://oauth.yandex.ru/client/new):

> Complete instructions are available [here](http://api.yandex.ru/oauth/doc/dg/tasks/register-client.xml) 

---

##2. Register a new application

Complete the form:

![](img/yandex-register-app.png)

The callback address for your app should be:

	https://@@account.namespace@@/login/callback

---

##3. Get your Application ID and Application Password

Once the application is registered, enter your new `Application ID` and `Application Password` into the connection settings in Auth0.

![](img/yandex-add-connection.png)

