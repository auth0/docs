# Obtaining an App ID and App Secret for Facebook

To configure Facebook connections you will need to register Auth0 with Facebook on the developers website.

##1. Log in into Facebook Developers
Go to the [Facebook Developers Apps](https://developers.facebook.com/apps), login with your account and click on the __Create New App__ button:

![](@@env.MEDIA_URL@@/articles/connections/facebook/facebook-1.png)

---

##2. Give a name to your Application

![](@@env.MEDIA_URL@@/articles/connections/facebook/facebook-2.png)

---

##3. Complete setup

Copy the App ID and App Secret to the clipboard:

![](@@env.MEDIA_URL@@/articles/connections/facebook/facebook-3.png)

On app **Settings > Advanced**, enter the following URL on the "Valid OAuth redirect URIs":

    https://@@account.namespace@@/login/callback

![](@@env.MEDIA_URL@@/articles/connections/facebook/facebook-3b.png)

---

##4. Set the App ID and Secret in Auth0

Once the application is registered, enter your new `App ID` and `App Secret` into the Facebook connection settings in Auth0.

![](@@env.MEDIA_URL@@/articles/connections/facebook/facebook-4.png)

**That's it!** You can try it with the tester now.

##5. Set the Facebook application to Live

Before your users can login with the new facebook application, you must set it to live via the "Status & Review" tab in the facebook developer page.
