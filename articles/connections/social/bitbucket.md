---
connection: Bitbucket
image: /media/connections/bitbucket.png
seo_alias: bitbucket
description: This page shows you how to connect your Auth0 app to Bitbucket. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to Bitbucket

To connect your Auth0 app to Bitbucket, you will need to generate a *Key* and *Secret* in a Bitbucket app, copy these keys into your Auth0 settings, and enable the connection.

::: panel-info Lock version
This connection will only work with Lock version 9.2 or higher.
:::

## 1. Login to Bitbucket

Login to [Bitbucket](https://bitbucket.org/).

Click on your account icon in the upper right and select **Bitbucket settings**: 

![](/media/articles/connections/social/bitbucket/bitbucket-01.png)

Select **OAuth**  in the left nav:

![](/media/articles/connections/social/bitbucket/bitbucket-02.png)

## 2. Create your app

Click **Add consumer**.

Provide a name for your app.

In the Callback URL field, enter the folowing:

`https://${account.namespace}/login/callback`

Select the Permissions you want to enable for this connection.

Click **Save**.

![](/media/articles/connections/social/bitbucket/bitbucket-03.png)

## 3. Get your *Key* and *Secret*

On the page that follows, click the name of your app under **OAuth consumers** to reveal your keys:

![](/media/articles/connections/social/bitbucket/bitbucket-04.png)

## 4. Copy your *Client Id* and *Client Secret* into Auth0

In a separate window, login to your [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left nav. 

Select **Bitbucket**:

![](/media/articles/connections/social/bitbucket/bitbucket-05.png)

Copy the `Key` and `Secret` from the **OAuth integrated applications** page on Bitbucket into the fields on this page on Auth0.

Select the **Permissions** you want to enable.

Click **SAVE**.

![](/media/articles/connections/social/bitbucket/bitbucket-06.png)

## 5. Enable the Connection

Go to the **Apps** tab of the Bitbucket connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/bitbucket/bitbucket-07.png)

## 6. Test the connection

Close the **Settings** window to return to the [Connections > Social](${manage_url}/#/conncetions/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Bitbucket logo:

![](/media/articles/connections/social/bitbucket/bitbucket-08.png)

Click **TRY**.

Click **Grant access** to allow your app access.

![](/media/articles/connections/social/bitbucket/bitbucket-09.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/bitbucket/bitbucket-10.png)
