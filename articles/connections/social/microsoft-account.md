---
connection: Microsoft Account
image: /media/connections/ms.png
index: 12
alias:
 - live-id
 - microsoft-live
 - windowslive
 - windows-live
seo_alias: microsoft-account
description: How to configure your Auth0 app for an OAuth connection to Microsoft Account.
---

# Connect your app to Microsoft Account

To connect your Auth0 app to Microsoft Account, you will need to create an app on the Microsoft Application Registration Portal, generate an `Application Id` and `Secret`, copy these credentials into Auth0, and enable the connection.

## 1. Create an application

Login to the [Microsoft Application Registration Portal](https://apps.dev.microsoft.com).

Click **Add an app**. 

![](/media/articles/connections/social/microsoft-account/ma-portal-1a.png)

**NOTE:** If you have existing apps, there may be two **Add an app** buttons. Select the first.

Name your new app and click **Create application**:

![](/media/articles/connections/social/microsoft-account/ma-portal-1.png)

## 2. Copy your Application Id

On the **Registration** page that follows, copy the **Application Id**. This is your `client_id`.

![](/media/articles/connections/social/microsoft-account/ma-portal-2.png)

## 3. Get your password

Click **Generate New Password**.

Copy your password. This is your `client_secret`.

![](/media/articles/connections/social/microsoft-account/ma-portal-3.png)

## 4. Enter your callback URL

Click **Add Platform**, then select **Web**.

![](/media/articles/connections/social/microsoft-account/ma-portal-4a.png)

Enter the following under **Redirect URIs**:

`https://${account.namespace}/login/callback`

![](/media/articles/connections/social/microsoft-account/ma-portal-4.png)

Scroll down to **Advanced Options** and make sure **Live SDK support** is checked.

![](/media/articles/connections/social/microsoft-account/ma-portal-4b.png)

Click **Save**.

## 5. Copy your *Client Id* and *Client Secret*

Go to the [Auth0 Dashboard](${manage_url}) and select **Connections > Social** from the left menu. 

Select the **Microsoft** connection.

Copy the `Client Id` and `Client Secret` you saved earlier into the fields on this page on Auth0. 

Click **Save**.

![](/media/articles/connections/social/microsoft-account/ma-portal-5.png)

## 6. Enable your apps

Select the **Apps** tab of the Microsoft Account settings page in Auth0 and enable the applications you want to use with this connection.

Click **Save**.

![](/media/articles/connections/social/microsoft-account/ma-portal-6.png)

## 7. Test your connection

On the [Social Connections](${manage_url}/#/connections/social) page in the Auth0 dashboard, click the **Try** button next to the Microsoft connection.

![](/media/articles/connections/social/microsoft-account/ma-portal-7.png)

Click Yes to allow your Microsoft app to access your information. 

![](/media/articles/connections/social/microsoft-account/ma-portal-8.png)

If you see the **It Works!** page, you have successfully configured your connection to Microsoft Account.

![](/media/articles/connections/social/microsoft-account/ma-portal-9.png)

