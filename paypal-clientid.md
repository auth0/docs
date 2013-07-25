# Obtaining a App Id and App Secret for PayPal

To configure a PayPal OpenId Connect connection you will need to register Auth0 on the PayPal developer portal.

##1. Log in into Developer Portal
Go to the [developer portal](https://devportal.x.com/), and sign in with your PayPal credentials and then click on __Manage Applications__:

![](img/paypal-devportal-1.png)

---

##2. Complete information about your Auth0 instance

![](img/paypal-devportal-2.png)



* Make sure you select __OAuth 2.0 / OpenId Connect__ as the protocols option.
* Your callback URL is:

	https://@@account.namespace@@/login/callback

> Note that you can control the scope of access through Auth0 (currently: profile, email, address, phone). But you will also need to enable that access in the portal checking the right attributes.

---

##3. Get your App Id and App Secret

Once the application is registered, enter your new `App Id` and `App Secret` into the connection settings in Auth0.

![](img/paypal-devportal-3.png)

![](img/paypal-devportal-4.png)

