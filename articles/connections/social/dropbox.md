---
title: Connect Apps to Dropbox
connection: Dropbox
image: /media/connections/dropbox.png
seo_alias: dropbox
description: Learn how to connect your Auth0 app to Dropbox. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
index: 8
topics:
  - connections
  - social
  - dropbox
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Dropbox

You can add functionality to your web app that allows your users to log in with Dropbox. 

::: note
This connection will only work with <dfn data-key="lock">Lock</dfn> version 9.2 or higher.
:::

## Prerequisites

Before you connect your Auth0 app to Dropbox, you must have a [Dropbox Developer](https://www.dropbox.com/developers) account.

## Steps

To connect your app to Dropbox, you will:

1. [Set up your app in Dropbox](#set-up-your-app-in-dropbox)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Dropbox

Set up an app in Dropbox using Dropbox's [App Console: Creating a Dropbox App](https://www.dropbox.com/developers/reference/getting-started#app%20console) doc. During this process, Dropbox will generate an **App key** and **App secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Choose an API | **Dropbox API**. |
| Choose the type of access you need | Appropriate options depending on your needs. |
| App name | Your application name. |
| Redirect URIs | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Dropbox social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **App key** and **App secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>