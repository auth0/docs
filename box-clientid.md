# Obtaining an Client Id and Client Secret for Box

To configure a Box OAuth2 connection you will need to register your Auth0 tenant on their [developer portal](https://developers.box.com/).

##1. Log in into the developer portal and register a new App:

![](img/box-register-1.png)

![](img/box-register-2.png)

---

##2. Edit your App Properties

After the app is created, click on __Edit__ and review the (long) form. There're a number of properties that you can change (e.g. contact information, logos, etc.).

![](img/box-register-3.png)

Scroll down and you'll find the `client_id` and `client_secret` fields under the __OAuth2 Parameters__ section: 

![](img/box-register-4.png)

Enter this URL as the `redirect_uri`:

	https://@@account.namespace@@/login/callback

Make sure you define the appropriate permission `scopes` for your app.
