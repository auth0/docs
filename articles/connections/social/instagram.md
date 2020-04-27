---
title: Connect your app to Instagram
connection: Instagram
index: 4
image: /media/connections/instagram.png
seo_alias: instagram
description: This article shows you how to connect your Auth0 app to Instagram. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - instagram
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect your app to Instagram

::: warning 
Instagram is deprecating their legacy APIs in favor of the new [Instagram Graph API](https://developers.facebook.com/docs/instagram-basic-display-api), which requires users to authenticate using Facebook Login. For more information, see [this Instagram blog post](https://developers.facebook.com/blog/post/2019/10/15/launch-instagram-basic-display-api/).
:::

This article describes how to add functionality to your app that will allow your user to log in with Instagram.

First you need to connect your Auth0 application to Instagram. This is summarized in the following steps:

- Follow all the steps required by the Graph API in order to register a new client
- Get the **Client ID** and **Client Secret** for your new client from the [Facebook Developers page](https://developers.facebook.com/)
- Copy these keys into your Auth0 settings
- Enable the Instagram social connection in Auth0

## 1. Configure the Instagram Graph API

To register your app with the Graph API and get the credentials for your client, refer to the Facebook's documentation: [Getting Started with the Instagram Graph API](https://developers.facebook.com/docs/instagram-api/getting-started/).

Once you are done you should have two pieces of information: the **Client ID** and **Client Secret** for your app.

## 2. Set the credentials in the Dashboard

1. Go to [Dashboard > Connections > Social](${manage_url}/#/connections/social)
2. Select **Instagram**
3. Copy the **Client Id** and **Client Secret** from the Developer portal into the corresponding fields on this page
4. Select the **Permissions** you want to enable.
5. Click **SAVE**.

![](/media/articles/connections/social/instagram/instagram-devportal-5.png)

## 3. Enable the connection

Go to the **Apps** tab of the Instagram connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/instagram/instagram-devportal-6.png)

## 4. Test the connection

Close the **Settings** window to return to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Instagram logo:

![](/media/articles/connections/social/instagram/instagram-devportal-7.png)

Click **TRY**.

Click **Authorize** to allow your app access.

![](/media/articles/connections/social/instagram/instagram-devportal-7a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/instagram/instagram-devportal-7b.png)

<%= include('../_quickstart-links.md') %>
