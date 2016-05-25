---
connection: Microsoft Account (formerly LiveID)
image:
alias:
 - live-id
 - microsoft-live
 - windowslive
 - windows-live
seo_alias: microsoft-account
description: How to configure your Auth0 app for an OAuth connection to Microsoft Account.
---

# Configure a Microsoft Account OAuth Connection to your Auth0 App

To configure a Microsoft Account OAuth 2.0 connection to your Auth0 app, create an application in the Microsoft Account Developer Center and copy its credentials into Auth0.

## 1. Create an application

Log into the [Microsoft Account Developer Center](https://account.live.com/developers/applications) and click **Add an app**. 

Name your new app and click **Create application**:

![](/media/articles/connections/social/microsoft-account/ma-portal-1.png)

## 2. Copy your Application Id

On the **Registration** page that follows, copy the **Application Id**. This is your `client_id`.

![](/media/articles/connections/social/microsoft-account/ma-portal-2.png)

## 3. Get your password

Click **Generate New Password**.

Copy your password. This is your `client_secret`.

![](/media/articles/connections/social/microsoft-account/ma-portal-3.png)

Click **Save** at the bottom of the page to save these settings.

## 4. Enter your callback URL

Click **Add Platform**, then select **Web**.

Enter the following under **Redirect URIs**:

`https://${account.namespace}/login/callback`

Click **Save**.

![](/media/articles/connections/social/microsoft-account/ma-portal-4.png)

## 5. Copy your *Client Id* and *Client Secret*

Go to the [Auth0 Dashboard](${uiURL}) and select **Connections > Social** from the left menu. 

Select the **Microsoft** connection.

Copy the `Client Id` and `Client Secret` you saved earlier into the fields on this page on Auth0. Click **Save**.

![](/media/articles/connections/social/microsoft-account/ma-portal-5.png)

## 6. Enable your apps

Select the **Apps** tab of the Microsoft Account settings page in Auth0 and enable the applications you want to use with this connection.

Click **Save**.

![](/media/articles/connections/social/microsoft-account/ma-portal-6.png)

## 7. Test your connection

On the [Social Connections](${uiURL}/#/connections/social) page in the Auth0 dashboard, click the **Try** button next to the Microsoft connection.

![](/media/articles/connections/social/microsoft-account/ma-portal-7.png)

Click Yes to allow your Microsoft app to access your information. 

![](/media/articles/connections/social/microsoft-account/ma-portal-8.png)

If you see the **It Works!** page, you have successfully configured your connection to Microsoft Account.

![](/media/articles/connections/social/microsoft-account/ma-portal-9.png)

