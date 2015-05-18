# Obtaining a App ID and Secret with The City

##1. Log in into The City portal

Log in into your The City portal, and select __Admin__:

![](@@env.MEDIA_URL@@/articles/thecity-clientid/thecity-register-1.png)

---

##2. Create new Plugin

Select __API > Plugin > Create plugin__:

![](@@env.MEDIA_URL@@/articles/thecity-clientid/thecity-register-2.png)

Complete the form using this callback URL:

![](@@env.MEDIA_URL@@/articles/thecity-clientid/thecity-register-3.png)

	https://@@account.namespace@@/login/callback

Press __Create__

---

##3. Get your App ID & Secret

Once the application is created, enter your new `App ID` and `Secret` into the connection settings in Auth0.

![](@@env.MEDIA_URL@@/articles/thecity-clientid/thecity-register-4.png)
