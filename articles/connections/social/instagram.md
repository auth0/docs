---
title: Connect your app to Instagram
connection: Instagram
index: 4
image: /media/connections/instagram.png
seo_alias: instagram
description: This article shows you how to connect your Auth0 app to Instagram. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
tags:
  - connections
  - social
  - instagram
---
# Connect your app to Instagram

This article describes how to add login with Instagram to your app. It also discusses how you can get an Access Token in order to access the Instagram API.

First you need to connect your Auth0 application to Instagram. This is summarized in the following steps:

- Register a client at the Instagram Developer Portal
- Get the **Client ID** and **Client Secret**
- Copy these keys into your Auth0 settings
- Enable the Instagram social connection in Auth0

## 1. Log into the developer portal

Go to the Instagram [Developer portal](http://instagram.com/developer) and log in with your Instagram credentials. 

If asked, complete the Developer Signup:

![](/media/articles/connections/social/instagram/instagram-devportal-0.png)

On the page that follows, click **Register Your Application**:

![](/media/articles/connections/social/instagram/instagram-devportal-1.png)

## 2. Register your app

Click **Register a New Client**:

![](/media/articles/connections/social/instagram/instagram-devportal-2.png)

## 3. Enter your callback URL

Complete the form. Enter these values in the following fields:

**Website URL**: `https://${account.namespace}`

**Valid redirect URI**: `https://${account.namespace}/login/callback`
  
Click **Register**.

![](/media/articles/connections/social/instagram/instagram-devportal-3.png)

## 4. Get your Client ID and Client Secret

Once your app is registered, you will be navigated to the **Manage Clients** page. Click on the **Manage** button for your new client.

![](/media/articles/connections/social/instagram/instagram-devportal-4.png)

This will bring you to the page that contains your **Client ID** and **Client Secret**. Copy these for use in the next step.

![](/media/articles/connections/social/instagram/instagram-devportal-4-1.png)

## 5. Copy your **Client Id** and **Client Secret** into Auth0

In a separate window, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth Dashboard. 

Select **Instagram**. 

Copy the `Client Id` and `Client Secret` from the **Manage Client** page of the Instagram Developer portal into the fields on this page on Auth0.

Select the **Permissions** you want to enable.

Click **SAVE**.

![](/media/articles/connections/social/instagram/instagram-devportal-5.png)

## 6. Enable the Connection

Go to the **Apps** tab of the Instagram connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/instagram/instagram-devportal-6.png)

## 7. Test the connection

Close the **Settings** window to return to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the Instagram logo:

![](/media/articles/connections/social/instagram/instagram-devportal-7.png)

Click **TRY**.

Click **Authorize** to allow your app access.

![](/media/articles/connections/social/instagram/instagram-devportal-7a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/instagram/instagram-devportal-7b.png)

[Click here to learn more about authentication with Instagram](https://www.instagram.com/developer/authentication/)

## 8. Access Instagram API

Once you successfully authenticate a user, Instagram includes an [Access Token](/tokens/access-token) in the user profile it returns to Auth0. 

You can then use this token to call their API.

In order to get a Instagram Access Token, you have to retrieve the full user's profile, using the Auth0 Management API, and extrach the Access Token from the response. For detailed steps refer to [Call an Identity Provider API](/connections/calling-an-external-idp-api).

Once you have the token you can call the API, following Instagram's documentation.

::: note
For more information on these tokens, refer to [Identity Provider Access Tokens](/tokens/idp).
:::

<%= include('../_quickstart-links.md') %>
