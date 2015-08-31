---
connection: PayPal
image: /media/connections/paypal.png
---

# Obtaining a App Id and App Secret for PayPal

To configure a PayPal OpenId Connect connection you will need to register Auth0 on the PayPal developer portal.

## 1. Log in into Developer Portal
Go to the [developer portal](https://developer.paypal.com/), and log in with your PayPal credentials and then click on __Dashboard__ and then on __My Apps__:

![](/media/articles/connections/social/paypal/paypal-1.jpg)

---

## 2. Complete information about your Auth0 instance

![](/media/articles/connections/social/paypal/paypal-4.jpg)



* Your return URL is:

	https://${account.namespace}/login/callback

> Note that you can control the scope of access through Auth0 (currently: profile, email, address, phone). But you will also need to enable that access in the portal checking the right attributes.

---

## 3. Get your App Id and App Secret

Once the application is registered, enter your new `App Id` and `App Secret` into the connection settings in Auth0.

![](/media/articles/connections/social/paypal/paypal-5.jpg)

![](/media/articles/connections/social/paypal/paypal-2.jpg)

![](/media/articles/connections/social/paypal/paypal-3.jpg)
