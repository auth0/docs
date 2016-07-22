---
connection: Weibo
image: /media/connections/weibo.png
seo_alias: weibo
---

# Obtaining a App ID and App Secret for Weibo

To configure a Weibo connection you will need to register Auth0 on the [Weibo App portal](http://open.weibo.com/apps).

## 1. Add a new Application
Log in into [Weibo portal](http://open.weibo.com/apps), register a new application:

![](/media/articles/connections/social/weibo/weibo-register-1.png)

---
## 2. Callback URLs

When asked to enter OAuth2 callback URLs use:

	https://${account.namespace}/login/callback

---
## 3. Get your App ID and App Secret

Once the project is created, enter your new `App ID` and `App Secret` into the Yahoo! connection settings in Auth0.
