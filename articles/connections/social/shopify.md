---
connection: Shopify
image: /media/connections/shopify.png
---

# Obtaining a API Key and Shared Secret for Shopify

To configure Shopify OAuth2 connections you will need to register Auth0 with Shopify on their [partner portal](https://app.shopify.com/services/partners/auth/login).

##1. Create an App on the Partner Portal
Go to the [partner portal](https://app.shopify.com/services/partners), and login with your WordPress credentials. Select __Apps__ and click on __Create app__:

![](/media/articles/connections/social/shopify/shopify-devportal-1.png)

---

##2. Complete information about your instance of Auth0

Create a new application and complete the form. Use this URL as your callback:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/shopify/shopify-devportal-2.png)

---

##4. Get your API Key and Shared Secret

Once the application is registered, enter your new `API Key` and `Shared Secret` into the connection settings in Auth0.
