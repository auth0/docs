---
connection: Instagram
index: 4
image: /media/connections/instagram.png
seo_alias: instagram
description: This page shows you how to connect your Auth0 app to Instagram. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to Instagram

To connect your Auth0 app to Instagram, you will need to generate a *Client ID* and *Client Secret* in an Instagram app, copy these keys into your Auth0 settings, and enable the connection.

## 1. Log into the developer portal

Go to the Instagram [Developer portal](http://instagram.com/developer) and log in with your Instagram credentials. 

If asked, complete the Developer Signup:

![](/media/articles/connections/social/instagram/instagram-devportal-0.png)

On the page that follows, click **Register Your Application**:

![](/media/articles/connections/social/instagram/instagram-devportal-1.png)

## 2. Register your app

Click **Register a New Client**:

![](/media/articles/connections/social/instagram/instagram-devportal-2.png)

## 3. Enter your callback URL

Complete the form. Enter these values in the following fields:

**Website URL**: `https://${account.namespace}`

**Valid redirect URI**: `https://${account.namespace}/login/callback`
	
Click **Register**.

![](/media/articles/connections/social/instagram/instagram-devportal-3.png)

## 4. Get your *Client ID* and *Client Secret*

Once your app is registered, your `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/instagram/instagram-devportal-4.png)

## 5. Copy your *Client Id* and *Client Secret* into Auth0

In a separate window, login to your [Auth0 Dashboard](${uiURL}) and select **Connections > Social** in the left nav. 

Select **Instagram**. 

Copy the `Client Id` and `Client Secret` from the **Manage Clients** page of the Instagram Developer portal into the fields on this page on Auth0.

Select the **Permissions** you want to enable.

Click **SAVE**.

![](/media/articles/connections/social/instagram/instagram-devportal-5.png)

## 6 Enable the Connection

Go to the **Apps** tab of the Instagram connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/instagram/instagram-devportal-6.png)

## 7 Test the connection

Close the **Settings** window to return to the [Connections > Social](${uiURL}/#/conncetions/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Instagram logo:

![](/media/articles/connections/social/instagram/instagram-devportal-7.png)

Click **TRY**.

Click **Authorize** to allow your app access.

![](/media/articles/connections/social/instagram/instagram-devportal-7a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/instagram/instagram-devportal-7b.png)
