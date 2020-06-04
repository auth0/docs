---
title: Connect Apps to Google
connection: Google
index: 18
image: /media/connections/google.png
description: Learn how to add login functionality to your app with Google. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
alias:
 - gmail
 - google-oauth
 - google-oauth2
seo_alias: google
toc: true
topics:
  - authentication
  - connections
  - social
  - google
contentType: how-to
useCase:
    - add-login
    - customize-connections
    - add-idp
---
# Connect Apps to Google

You can add functionality to your web app that allows your users to log in with Google. 

## Prerequisites

Before you connect your Auth0 app to Google, you must have a [Google Developer](https://console.developers.google.com/) account. You will need to get an <dfn data-key="access-token">access token</dfn> that will allow you to access the Google API. See [Setting up OAuth 2.0](https://support.google.com/googleapi/answer/6158849) for details.

## Steps

To connect your app to Google, you will:

1. [Set up your app in Google](#set-up-your-app-in-Google)
2. [Enable the Admin SDK service](#enable-the-admin-sdk-service)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Google

1. Log in to [Google Developer Console](https://console.developers.google.com/).

2. From the projects list, select a project or create a new one.
3. If the APIs & services page is already open, open the console left side menu and select **APIs & services**.
4. Click **Credentials**.
5. Click **New Credentials**, then select **OAuth client ID**.
6. On the **OAuth consent screen**, under **Authorized domains**, add `auth0.com`.
7. Select **Web application** and complete form including the following information: 

| Field | Description |
| - | - |
| Authorized JavaScript origins | `https://${account.namespace}` |
| Authorized redirect URIs | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

::: warning
If your application requests sensitive OAuth <dfn data-key="scope">scopes</dfn>, it may be [subject to review by Google](https://developers.google.com/apps-script/guides/client-verification).
:::

### Enable the Admin SDK service

Follow Google's [Enable and disable APIs](https://support.google.com/googleapi/answer/6158841) instructions.

### Create and enable a connection in Auth0

[Set up the Google social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

## Access the Google API

<%= include('../_call-api', {
  "idp": "Google"
}) %>

To request a refresh token, include the `access_type=offline` parameter when calling the Auth0 `/authorize` endpoint. [Additional scopes can be included in the /authorize request](/connections/adding-scopes-for-an-external-idp) using the `connection_scope` parameter.

For more information, see [Identity Provider Access Tokens](/tokens/concepts/idp-access-tokens).

<%= include('../_quickstart-links.md') %>
