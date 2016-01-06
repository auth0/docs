---
connection: Microsoft Account (formerly LiveID)
image: /media/connections/microsoft-account.png
alias:
 - live-id
 - microsoft-live
 - windowslive
 - windows-live
---

# Obtain a *Client Id* and *Client Secret* for Microsoft account

To configure Microsoft Account OAuth connections, you need to register your application in the Microsoft account Developer Center.

## 1. Log into the Microsoft account Developer Center and create an application

Log into the [Developer Center](https://account.live.com/developers/applications) and click **Create application**. Name your new app and click **I accept**:

![](/media/articles/connections/social/microsoft-account/ma-portal-1.png)

## 2. Provide basic information about your app

Once the app is created, complete the Basic Information form and click **Save**:

![](/media/articles/connections/social/microsoft-account/ma-portal-2.png)

## 3. Enter your callback URL

Select **API Settings** from the left menu. Complete the form and enter the following in the **Redirect URLs** field and click **Save**:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/microsoft-account/ma-portal-3.png)

## 4. Get your *Client Id* and *Client Secret*

Select **App Settings** from the left menu. Your app's `Client Id` and `Client Secret` will be displayed:

![](/media/articles/connections/social/microsoft-account/ma-portal-4.png)

## 5. Copy your *Client Id* and *Client Secret*

Go to your [Auth0 Dashboard](${uiURL}) and select **Connections > Social**, then choose **Windows Live**. Copy the `Client Id` and `Client Secret` from the **App Settings** section of the Microsoft account Developer Center into the fields on this page on Auth0 and click **Save**:

![](/media/articles/connections/social/microsoft-account/ma-portal-5.png)
