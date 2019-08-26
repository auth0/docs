---
title: Add LINE Login to Your App
connection: LINE
index: 3
image: /media/connections/line.png
seo_alias: line
description: Learn how to add login functionality to your app with LINE. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - authentication
  - connections
  - social
  - line
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Add LINE Login to Your App

This guide will show you how to add functionality to your web app that allows your users to use LINE to login.

::: note
You can test out the LINE connection by simply going to the [Dashboard](${manage_url}) to **Connections > Social** and Try the LINE connection, leaving the settings blank. This will let you test it out with Auth0’s developer credentials. Prior to use in production applications, however, you will need to set up your own, which this guide details.
:::

## 1. Set up your app with LINE

You can follow the instructions in the [LINE Documentation](https://developers.line.biz/en/docs/line-login/getting-started/) to get a channel set up for your app in LINE.

While setting up the channel in LINE for your app, make sure you save the following items from your LINE channel's settings for later:

* The Channel ID
* The Channel Secret

## 2. Create and enable a connection in Auth0

Navigate to the [Connections > Social page](${manage_url}) in the Auth0 Dashboard, and click on the LINE connection.

Fill in the Channel ID and the Channel Secret here.

![LINE Connection Settings](/media/articles/connections/social/line/line_connection.png)

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

<%= include('../_quickstart-links.md') %>
