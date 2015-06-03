---
connection: Exact
image: /media/connections/exact.png
---

# Obtaining an Client Id and Client Secret for Exact

To configure an Exact OAuth2 connection you will need to register your Auth0 tenant on their [developer portal](https://apps.exactonline.com/).

##1. Log in into the developer portal and register a new App.

##2. Edit your App Properties.

Enter your app name. You will also be asked for a `Callback URL`. Use this value:

	https://@@account.namespace@@/login/callback

##3. Copy `client_id` and `client_secret` to the Auth0 dashbaord.

> You can register applications in multiple regions with Exact. By default Auth0 will use `https://start.exactonline.nl`, but this value can be overriden with the `Base URL` parameter.
