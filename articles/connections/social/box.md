---
title: Connect Apps to Box
connection: Box
image: /media/connections/box.png
seo_alias: box
description: Learn how to add login functionality to your app with Box. You will need to obtain a Client Id and Client Secret for Box.
toc: true
index: 6
topics:
  - connections
  - social
  - box
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Box

You can add functionality to your web app that allows your users to log in with Box. 

## Prerequisites

Before connecting yor Auth0 app to Box, you will need to have a [Box Developer](https://developers.box.com/) account.

## Steps

To connect your app to Box, you will:

1. [Set up your app in Box](#set-up-your-app-in-box)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Box

Set up an app in Box using Box's [Custom Apps: Setup with OAuth 2.0](https://developer.box.com/guides/applications/custom-apps/oauth2-setup/) doc. During this process, Box will generate a **Client ID** and **Client Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Redirect URI | `https://${account.namespace}/login/callback` |
| Application Scopes | Select the permissions you want to enable for this connection. |

<%= include('../_find-auth0-domain-redirects') %>

## Create and enable a connection in Auth0

[Set up the Box social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and the **Client Secret** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
