---
title: Connect your app to Weibo
connection: Weibo
image: /media/connections/weibo.png
seo_alias: weibo
description: How to obtain an App ID and App Secret for Weibo.
toc: true
topics:
  - connections
  - social
  - weibo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Weibo

To allow users to log in to your app using their Weibo accounts, you'll need to register Auth0 with the Weibo platform.

## Register Auth0 with Weibo

Begin by [registering your Auth0 app with Weibo](https://open.weibo.com/authentication).

You will be prompted to provide a callback URL during the registration process. Use `https://${account.namespace}/login/callback`.

After the registration process, Weibo provides you with an **appkey** and a corresponding **appkey secret**. Make a note of these values, since you'll need to provide them to Auth0.

## Set up the Auth0 connection

Log in to Auth0, and go to [Connections > Social](${manage_url}/#/connections/social).

Find **Weibo** and toggle its switch so that it turns green.

![](/media/articles/connections/social/shopify/shopify-devportal-1.png)

The dialog window to configure your connection appears. Provide the **App Key** and the **App Secret** values you received after registering your app with Weibo.

Next, select your **Attributes** and **Permissions**. Your selections here will influence the information that Auth0 receives from the user profile sent by Weibo.

Scroll to the bottom and click **SAVE**.

### Enable your connection

Switch to the **Applications** tab, and toggle the applications will be able to use this connection.

![Enable the Applications](/media/articles/connections/social/weibo/enable-clients.png)

When finished, click **SAVE**.

## 5. Test the Connection

On the [Connections > Social](${manage_url}/#/connections/social) page of the Auth0 dashboard you should now see a **TRY** button with the Weibo connection.

![Try Button](/media/articles/connections/social/weibo/try-connection.png)

Click on this to test the new connection. This should bring up a confirmation page for the connection:

![Confirmation page](/media/articles/connections/social/weibo/confirmation.png)

If accepted, you should be able to see the **It Works!** confirmation page that your connection has been configured correctly.

<%= include('../_quickstart-links.md') %>


