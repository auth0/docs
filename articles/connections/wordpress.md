# Obtaining a Client ID and Client Secret for WordPress

To configure WordPress OAuth2 connections you will need to register Auth0 with WordPress on their [developer portal](http://developer.wordpress.com/).

##1. Log in into the developer portal
Go to the [developer portal](http://developer.wordpress.com/), and login with your WordPress credentials. Select __My Applications__ and click on __Create New Application__:

![](//cdn.auth0.com/docs/img/wordpress-devportal-1.png)

---

##2. Complete information about your instance of Auth0

Create a new application and complete the form. Use this URL as your callback:

	https://@@account.namespace@@/login/callback

![](//cdn.auth0.com/docs/img/wordpress-devportal-2.png)

---

##4. Get your Client ID and Client Secret

Once the application is registered, enter your new `Client ID` and `Client Secret` into the connection settings in Auth0.

![](//cdn.auth0.com/docs/img/wordpress-devportal-3.png)

