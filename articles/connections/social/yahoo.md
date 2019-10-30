---
title: Add Yahoo Login to Your App
connection: Yahoo!
index: 15
image: /media/connections/yahoo.png
description: How to obtain a Consumer Key and Consumer Secret for Yahoo!
seo_alias: yahoo
toc: true
topics:
  - connections
  - social
  - yahoo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Add Yahoo Login to Your App

This guide will show you how to add functionality to your web app that allows your users to log in with Yahoo.

## 1. Set up your app in Yahoo

::: panel Yahoo Account
Before proceeding, you will need a valid Yahoo User ID. If you don’t have a Yahoo account, you must [create one with Yahoo](https://login.yahoo.com).
:::

Go to [Yahoo Developer Apps](https://developer.yahoo.com/apps/) and click on the **Create an App** button to launch the app-creation screen. You will be asked for the following parameters:

| **Parameter** | **Value** |
| - | - |
| **Application&nbsp;Name** | A friendly name for your application. |
| **Application&nbsp;Type** | `Web Application` |
| **Redirect&nbsp;URI(s)** | `https://${account.namespace}` |
| **API&nbsp;Permissions** | `Profiles (Social Directory)` (and its subset of available app permissions, e.g., read, read/write). You may select additional API permissions, but you must include this option to ensure that Yahoo returns the user's email address. |

<%= include('../_find-auth0-domain-redirects') %>

When done, click **Create App** to proceed. Once the application is created, Yahoo will show you your **Client ID** (Consumer Key) and **Client Secret** (Consumer Secret). Copy these values, because you will use them to set up the connection in Auth0.

## 2. Create and enable a connection in Auth0

[Set up the Yahoo! social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and **Client Secret** generated in Step 1.

## 3. Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

<%= include('../_quickstart-links.md') %>
