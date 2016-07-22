---
connection: Dwolla
image: /media/connections/dwolla.png
seo_alias: dwolla
---

# Obtain a *Client ID* and *Client Secret* for Dwolla

To configure OAuth2 connections with Dwolla, you will need to register Auth0 on the Dwolla Developer portal.

## 1. Log into the developer portal

Log into the Dwolla [Developer portal](https://uat.dwolla.com/applications) and click **Create an application**:

![](/media/articles/connections/social/dwolla/dwolla-1.png)

## 2. Register your new app

Complete the information on this page. Enter the following URL in the **OAuth Redirect URL** field:

	https://${account.namespace}/login/callback

![](/media/articles/connections/social/dwolla/dwolla-2.png)

Click **Create application**.

## 3. Get your *Key* and *Secret*

Once the application is registered, your app's `Key` and `Secret` will be displayed on the following page:

![](/media/articles/connections/social/dwolla/dwolla-3.png)

## 4. Copy your *Key* and *Secret*

Go to the [Social Connections](${uiURL}/#/connections/social) section of your Auth0 Dashboard and choose **Dwolla**. Copy the `Key` and `Secret` from the **Application** page of your app on Dwolla into the `Client Id` and `Client Secret` fields on this page on Auth0:

![](/media/articles/connections/social/dwolla/dwolla-4.png)
