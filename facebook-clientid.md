# Obtaining an App ID and App Secret for Facebook

To configure Facebook connections you will need to register Auth0 with Facebook on the developers website.

##1. Log in into Facebook Developers
Go to the [Facebook Developers Apps](https://developers.facebook.com/apps), login with your account and click on the __Create New App__ button:

![](img/facebook-1.png)

---

##2. Give a name to your Application

![](img/facebook-2.png)

---

##3. Complete setup

Copy the App ID and App Secret to the clipboard:

![](img/facebook-3.png)

On app **Settings > Advanced**, enter the following URL on the "Valid OAuth redirect URIs":

    https://@@account.namespace@@/login/callback

![](img/facebook-3b.png)

---

##4. Set the App ID and Secret in Auth0

Once the application is registered, enter your new `App ID` and `App Secret` into the Facebook connection settings in Auth0.

![](img/facebook-4.png)

**That's it!** You can try it with the tester now.
