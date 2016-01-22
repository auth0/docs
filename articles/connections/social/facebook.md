---
connection: Facebook
image: /media/connections/facebook.png
---

# Obtain an *App ID* and *App Secret* for Facebook

To configure Facebook connections, you will need to register Auth0 on the Facebook Developers website.

## 1. Log into Facebook Developers

Go to [Facebook Developers Apps](https://developers.facebook.com/apps) and login with your account. Click the **Create New App** button:

![](/media/articles/connections/social/facebook/facebook-1.png)

If asked to choose a platform, select **Advanced Setup**:

![](/media/articles/connections/social/facebook/facebook-1a.png)

## 2. Name your application

Provide a **Display Name** for your app, choose a **Category**, and click **Create App ID**:

![](/media/articles/connections/social/facebook/facebook-2.png)

Complete the **Security Check**:

![](/media/articles/connections/social/facebook/facebook-2a.png)

## 3. Copy your new app's *App ID* and *App Secret*

Once your app is created, copy the `App ID` and `App Secret` from the **Dashboard** page:

![](/media/articles/connections/social/facebook/facebook-3.png)

## 4. Enter your callback URL

Go to **Settings** and select the **Advanced** tab. 

Scroll down to the **Client OAuth Settings** section and enter the following URL in the **Valid OAuth redirect URIs** field:

    https://${account.namespace}/login/callback

![](/media/articles/connections/social/facebook/facebook-4.png)

## 5. Set the App ID and Secret in Auth0

Go to your Auth0 [Dashboard](${uiURL}/#/connections/social) and select **Connections > Social**, then choose **Facebook**. 

Copy the `App ID` and `App Secret` from the **Basic Settings** of your app on Facebook into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/facebook/facebook-5.png)

Now you can test your new app by clicking the **Try** button at the bottom of the page:

![](/media/articles/connections/social/facebook/facebook-5a.png)

## 6. Set the Facebook application to Live

Before users can login to your new Facebook application, you must select **Yes** in the **Status & Review** tab of your Facebook Developers page:

![](/media/articles/connections/social/facebook/facebook-6.png)
