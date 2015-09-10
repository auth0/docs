---
connection: Facebook
image: /media/connections/facebook.png
---

# Obtain an *App ID* and *App Secret* for Facebook

To configure Facebook connections, you will need to register Auth0 on the Facebook Developers website.

## 1. Log into Facebook Developers
Go to [Facebook Developers Apps](https://developers.facebook.com/apps) and login with your account. Click the **Create New App** button:

![](/media/articles/connections/social/facebook/facebook-1.png)

## 2. Name your application

Provide a **Display Name** for your app, choose a **Category**, and click **Create App**.

![](/media/articles/connections/social/facebook/facebook-2.png)

## 3. Copy your new app's *App ID* and *App Secret*

Once your app is created, copy the `App ID` and `App Secret` from the **Basic Settings** page:

![](/media/articles/connections/social/facebook/facebook-3.png)

Then, go to **Settings > Advanced** and enter the following URL in the **Valid OAuth redirect URIs** field:

    https://${account.namespace}/login/callback

![](/media/articles/connections/social/facebook/facebook-3b.png)

## 4. Set the App ID and Secret in Auth0

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Facebook**. Copy the `App ID` and `App Secret` from the **Basic Settings** of your app on Facebook into the fields on this page on Auth0.

![](/media/articles/connections/social/facebook/facebook-4.png)

**That's it!** You can try it with the tester now.

## 5. Set the Facebook application to Live

Before users can login to your new Facebook application, you must set it to Live in the **Status & Review** tab of your Facebook Developers page.

![](/media/articles/connections/social/facebook/facebook-5.png)
