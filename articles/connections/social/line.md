---
title: Connect Apps to LINE
connection: LINE
index: 20
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
# Connect Apps to LINE

You can add functionality to your app that allows your users to login with LINE.

## Prerequisites

Before connecting your Auth0 app to LINE, you will need to have an account on [LINE](https://developers.line.biz/console/register/line-login/channel/).

## Steps

To connect your app to LINE, you will:

1. [Set up your app in LINE](#set-up-your-app-in-line)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in LINE

Follow the instructions in the [Getting started with LINE Login](https://developers.line.biz/en/docs/line-login/getting-started/).

While setting up the channel in LINE for your app, make sure you save the **Channel ID** and the **Channel Secret**.

### Create and enable a connection in Auth0

[Set up the Bitbucket social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
