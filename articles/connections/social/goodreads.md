---
connection: Goodreads
image: /media/connections/goodreads.png
---

# Obtaining a Consumer and Secret Keys for Goodreads

##1. Log in into Goodreads's developers site
Log in into [Goodreads's Developer site](https://www.goodreads.com/api/v1), select __developer key__:

![](/media/articles/connections/social/goodreads/goodreads-register-1.png)

---

##2. Complete information about your instance of Auth0

Use this for the `Callback URL`:

	https://${account.namespace}/login/callback

---

##4. Get your Consumer Key and Consumer Secret

Once the application is registered, enter your new `Key` and `Secret` into the connection settings in Auth0.

![](/media/articles/connections/social/goodreads/goodreads-register-2.png)
