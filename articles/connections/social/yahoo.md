---
connection: Yahoo!
image: /media/connections/yahoo.png
seo_alias: yahoo
index: 15
description: How to obtain a Consumer Key and Consumer Secret for Yahoo!
---

# Obtaining a Consumer Key and Consumer Secret for Yahoo!

To configure a Yahoo! connection you will need to register Auth0 on the [Yahoo! Developer Network portal](https://developer.yahoo.com/).

## 1. Add a new Project
Log in to [Yahoo! Developer Network portal](https://developer.yahoo.com/) and click on __Create an App__:

![](/media/articles/connections/social/yahoo/yahoo-register-1.png)

---

## 2. Register a new project

Complete the form. For __Access Scopes__ select "This app requires access to private user data." and use this URL for the __Callback Domain__:

  https://${account.namespace}/login/callback

Also make sure to select at least one Yahoo API:

![](/media/articles/connections/social/yahoo/yahoo-register-3.png)

---

## 3. Get your Consumer Key and Consumer Secret

Once the project is created, enter your new `Consumer Key` a  nd `Consumer Secret` into the Yahoo! connection settings in Auth0.

![](/media/articles/connections/social/yahoo/yahoo-register-2.png)
