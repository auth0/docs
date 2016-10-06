---
connection: Dropbox
image: /media/connections/dropbox.png
seo_alias: dropbox
description: This page shows you how to connect your Auth0 app to Dropbox. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to Dropbox

To connect your Auth0 app to Dropbox, you will need to generate a *Client ID* and *Client Secret* in a Dropbox app, copy these keys into your Auth0 settings, and enable the connection.

::: panel-info Lock version
This connection will only work with Lock version 9.2 or higher.
:::

## 1. Login to the developer portal

Go to the [Dropbox Developer](https://www.dropbox.com/developers) portal and log in with your Dropbox credentials. 

Click **Create your app**:

![](/media/articles/connections/social/dropbox/dropbox-01.png)

## 2. Create your app

1. Under **Choose an API**, select **Dropbox API**.
2. Under **Choose the type of access you need**, select **App folder** or **Full Dropbox**, depending on your needs.
3. Name your app.
4. Click **Create app**.

![](/media/articles/connections/social/dropbox/dropbox-02.png)

## 3. Enter your callback URL

On your app's **Settings** page that follows, enter this URL in the **Redirect URIs** field:

`https://${account.namespace}/login/callback`
  
Click **Add**:

![](/media/articles/connections/social/dropbox/dropbox-03.png)

## 4. Get your *Client ID* and *Client Secret*

On the same **Settings** page, your `App key` and `App secret` will be displayed:

![](/media/articles/connections/social/dropbox/dropbox-04.png)

## 5. Copy your *Client Id* and *Client Secret* into Auth0

In a separate window, login to your [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left nav. 

Select **Dropbox**. 

![](/media/articles/connections/social/dropbox/dropbox-05.png)

Copy the `App key` and `App secret` from the **Settings** page of the Dropbox Developer portal into the fields on this page on Auth0:

![](/media/articles/connections/social/dropbox/dropbox-06.png)

Click **SAVE**.

## 6 Enable the Connection

Select the **Apps** tab of the Dropbox connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/dropbox/dropbox-07.png)

## 7 Test the connection

Close the **Settings** window to return to the [Connections > Social](${manage_url}/#/conncetions/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Dropbox logo:

![](/media/articles/connections/social/dropbox/dropbox-08.png)

Click **TRY**.

Click **Allow** to grant your app access.

![](/media/articles/connections/social/dropbox/dropbox-09.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/dropbox/dropbox-10.png)
