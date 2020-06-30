---
title: Connect Apps to vKontakte
connection: vKontakte
image: /media/connections/vkontakte.png
seo_alias: vkontakte
description: Learn how to add login functionality to your app with vKontakte.
toc: true
index: 33
topics:
  - connections
  - social
  - vkontakte
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to vKontakte

You can add functionality to your web app that allows your users to log in with vKontakte. 

## Prerequisites

Before connecting your Auth0 app to vKontakte, you must have a [vKontakte Developer](https://new.vk.com/dev) account.

## Steps

To connect your app to vKontakte, you will:

1. [Set up your app in vKontakte](#set-up-your-app-in-vkontakte)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in vKontakte

Set up an app in vKontakte. During this process, vKontakte will generate an **Application ID** and **Secure Key** for your application; make note of these.

1. Log in to [vKontakte Developers](https://new.vk.com/dev), go to **My Apps** and click **Create an Application**.

2. Select **Website** as the **Category**. 

3. Complete information about your app including the following values:

| Field | Value to Provide |
| - | - |
| Site address | `https://${account.namespace}` |
| Base domain | `${account.namespace}` |

4. Click **Connect Site** to create the app. You will be required to confirm your request with a code send via SMS.

5. Once the application is created, select **Settings** in the left nav. In the **Authorized redirect URI** field, enter your <dfn data-key="callback">callback URL</dfn>:
  `https://${account.namespace}/login/callback`

  <%= include('../_find-auth0-domain-redirects') %>

6. Click **Save**. The top of the page displays the **Application ID** and the **Secure Key**.

### Create and enable a connection in Auth0

[Set up the vKontakte social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Application ID** and **Secure Key**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>