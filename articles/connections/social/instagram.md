---
connection: Instagram
image: /media/connections/instagram.png
---

# Obtain a *Client ID* and *Client Secret* for Instagram

To configure Instagram OAuth2 connections, you will need to register Auth0 with Instagram on their Developer portal.

## 1. Log into the developer portal

Go to the Instagram [Developer portal](http://instagram.com/developer) and log in with your Instagram credentials. Click on **Register Your Application**:

![](/media/articles/connections/social/instagram/instagram-devportal-1.png)

## 2. Register your app

Click **Register a New Client**:

![](/media/articles/connections/social/instagram/instagram-devportal-2.png)

## 3. Complete information about your instance of Auth0

Complete the form. Enter this URL as a **Valid redirect URI** and click **Register**:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/instagram/instagram-devportal-3.png)

## 4. Get your *Client ID* and *Client Secret*

Once your app is registered, your `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/instagram/instagram-devportal-4.png)

## 5. Copy your *Client Id* and *Client Secret*

Go to your [Auth0 Dashboard](${uiURL}) and select **Connections > Social**, then choose **Instagram**. Copy the `Client Id` and `Client Secret` from the **Manage Clients** page of the Instagram Developer portal into the fields on this page on Auth0.

![](/media/articles/connections/social/instagram/instagram-devportal-5.png)
