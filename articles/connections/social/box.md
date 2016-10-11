---
connection: Box
image: /media/connections/box.png
seo_alias: box
description: How to obtain a Client Id and Client Secret for Box.
---

# Obtain a *Client Id* and *Client Secret* for Box

To configure a Box OAuth2 connection, you will need to register your Auth0 tenant on their [developer portal](https://developers.box.com/).

## 1. Register a new Box app

Log into the Box developer portal and click **My Apps** and then select **Create a Box Application**:

![](/media/articles/connections/social/box/box-register-1.png)

Name your new app and click **Create Application**:

![](/media/articles/connections/social/box/box-register-2.png)

## 2. Edit your app Properties

Once the app is created, click on **Edit Application** and review the form. There are a number of properties that you can change (e.g. contact information, logos, etc.):

![](/media/articles/connections/social/box/box-register-3.png)

Scroll down to find the `client_id` and `client_secret` fields under the **OAuth2 Parameters** section:

![](/media/articles/connections/social/box/box-register-4.png)

Enter this URL as the `redirect_uri`:

  https://${account.namespace}/login/callback

While on this page, make sure to define the appropriate permission **Scopes** for your app.

## 3. Copy your *Client Id* and *Client Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Box**. Copy the `Client Id` and `Client Secret` from the **OAuth2 Parameters** section of your app on Box into the fields on this page on Auth0:

![](/media/articles/connections/social/box/box-add-connection.png)
