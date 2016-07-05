---
connection: Facebook
index: 2
image: /media/connections/facebook.png
seo_alias: facebook
description: This page shows you how to connect your Auth0 app to Facebook. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to Facebook

To connect your Auth0 app to Facebook, you will need to generate a *Client ID* and *Client Secret* in a Facebook app, copy these keys into your Auth0 settings, and enable the connection.

## 1. Login to Facebook Developers

Go to [Facebook Developers](https://developers.facebook.com) and login with your account. Select **Add a New App** from the dropdown in the upper right:

![](/media/articles/connections/social/facebook/facebook-1.png)

When asked to select a platform, click **Basic Setup**:

![](/media/articles/connections/social/facebook/facebook-1a.png)

## 2. Name your application

Provide a **Display Name** and **Contact Email**.

Select a **Category** and click **Create App ID**:

![](/media/articles/connections/social/facebook/facebook-2.png)

Complete the **Security Check**.

## 3. Enter your callback URL

On the **Product Setup** page that follows, click **Get Started** next to **Facebook Login**:

![](/media/articles/connections/social/facebook/facebook-3.png)

Scroll down to the **Client OAuth Settings** section and enter the following URL in the **Valid OAuth redirect URIs** field:

`https://${account.namespace}/login/callback`

![](/media/articles/connections/social/facebook/facebook-3a.png)

Click **Save Changes**.

## 4. Get your *App ID* and *App Secret*

Select **Settings** in the left nav.

Click **Show** to reveal the `App Secret`. (You may be required to re-enter your Facebook password.)

![](/media/articles/connections/social/facebook/facebook-4.png)

Save a copy of the `App ID` and `App Secret` to enter into the **Settings** page of you app on Auth0 as described in [Step 7](#7-copy-your-app-id-and-app-secret-into-auth0).

## 5. Enter your Site URL

On the same **Basic Settings** page, scroll down and click **Add Platform**:

![](/media/articles/connections/social/facebook/facebook-4a.png)

Select **Website** in the pop-up:

![](/media/articles/connections/social/facebook/facebook-4b.png)

In the **Site URL** field, enter the following:

`https://${account.namespace}`

![](/media/articles/connections/social/facebook/facebook-4c.png)

## 6. Make your Facebook app public

Click **Yes** on the **App Review** page of your app to make it available to the public.

![](/media/articles/connections/social/facebook/facebook-5.png)

## 7. Copy your *App ID* and *App Secret* into Auth0

Login to the [Auth0 Dashboard](${uiURL}) and select **Connections > Social** in the left navigation.

Select the connection with the Facebook logo to access this connection's **Settings** page.

Copy the `App ID` and `App Secret` from the **Settings** of your app on Facebook into the fields on this page on Auth0:

![](/media/articles/connections/social/facebook/facebook-6.png)

Select all the **Attributes** and **Permissions** you want to enable.

Click **Save**.

**Note:** Your users will be able to choose which Attributes they wish to share, and by default this selection is only made when they first authorize the application. [Click here to learn more about handling declined permissions.](/connections/social/reprompt-permissions)

## 8. Enable the Connection

Go to the **Apps** tab of the Facebook connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/facebook/facebook-7.png)

## 9. Test your app

Go back to the [Connections > Social](${uiURL}/#/conncetions/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Facebook logo:

![](/media/articles/connections/social/facebook/facebook-8.png)

Click **TRY**.

Click **Okay** to allow your app access.

![](/media/articles/connections/social/facebook/facebook-8a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/facebook/facebook-8b.png)

