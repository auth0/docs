---
title: Connect your app to Weibo
connection: Weibo
image: /media/connections/weibo.png
seo_alias: weibo
description: How to obtain an App ID and App Secret for Weibo.
toc: true
tags:
  - connections
  - social
  - weibo
---

# Connect your app to Weibo

To configure a Weibo connection you will need to register Auth0 on the [Weibo App portal](http://open.weibo.com/apps).

## 1. Add a new Application

First log in into your [Weibo portal](http://open.weibo.com/apps), once you have logged in go to the [Development page](http://open.weibo.com/development) and click on the orange button.

![Weibo Development Page](/media/articles/connections/social/weibo/development-page.png)

This will bring up options for which type of application you wish to create. Select the web application option which should be third from the left.

![Select Web App](/media/articles/connections/social/weibo/select-web-app.png)

In the first field, enter the name for your application. Make sure **Web Application** (the third option 网页应用) is selected for the application type. The check box agrees to the terms.

![Create New App](/media/articles/connections/social/weibo/create-app.png)

## 2. Enter your callback URLs

Then you will be brought to your application information page. Click on advanced (高级信息) options from the left sidebar.

![Select Advanced](/media/articles/connections/social/weibo/click-advanced.png)

Under OAuth2.0 授权设置 enter `https://${account.namespace}/login/callback` as the callback urls. Then click on the green button.

![Enter your callback urls](/media/articles/connections/social/weibo/enter-callback.png)

## 3. Get your **App Key** and **App Secret**

Return to the basic information page (基本信息) for your application by clicking on the top option under the gear icon for Application Information.

![Select Basic](/media/articles/connections/social/weibo/click-basic.png)

This page will contain your **App Key** and **App Secret**, to be used in the next step.

![Copy your App Key and App Secret](/media/articles/connections/social/weibo/get-app-key-secret.png)

## 4. Setup the Connection in Auth0

In a separate tab or page, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

Click on the **Weibo** connection.

Enter your **App Key** and **App Secret** from Weibo, select your **Attributes** and **Permissions** then click **SAVE**.

![Paste your App Key and App Secret](/media/articles/connections/social/weibo/enter-keys.png)

Next click on the **Applications** tab next to **Settings** and enable which of your applications will be able to use this connection.

![Enable the Applications](/media/articles/connections/social/weibo/enable-clients.png)

When finished, click **SAVE**.

## 5. Test the Connection

On the [Connections > Social](${manage_url}/#/connections/social) page of the Auth0 dashboard you should now see a **TRY** button with the Weibo connection.

![Try Button](/media/articles/connections/social/weibo/try-connection.png)

Click on this to test the new connection. This should bring up a confirmation page for the connection:

![Confirmation page](/media/articles/connections/social/weibo/confirmation.png)

If accepted, you should be able to see the **It Works!** confirmation page that your connection has been configured correctly.

<%= include('../_quickstart-links.md') %>


