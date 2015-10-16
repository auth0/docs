---
connection: LinkedIn
image: /media/connections/linkedin.png
---

# Obtain a *Client ID* and *Client Secret* for LinkedIn

To configure LinkedIn OAuth2 connections, you will need to register Auth0 with LinkedIn on their Developer portal.

## 1. Log into the developer portal

Login to the LinkedIn [Developer portal](http://developer.linkedin.com/) and click **My Apps**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-1.png)

## 2. Create your app

Click **Create Application**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-2.png)

## 3. Complete information about your app

Complete the form and click **Submit**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-3.png)

## 4. Enter your callback URL

Enter the following URL in the **Authorized Redirect URLs** field and click **Add**: 

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/linkedin/linkedin-devportal-4.png)

## 5. Get your *Client ID* and *Client Secret*

On the same page, your `Client ID` and `Client Secret` will be displayed:

![](/media/articles/connections/social/linkedin/linkedin-devportal-5.png)

## 6. Copy your *Client Id* and *Client Secret*

Go to your [Auth0 Dashboard](${uiURL}) and select **Connections > Social**, then choose **LinkedIn**. Copy the `Client Id` and `Client Secret` from the **Authentication** page of your app on LinkedIn into the fields on this page on Auth0:

![](/media/articles/connections/social/linkedin/linkedin-devportal-6.png)
