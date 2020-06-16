---
title: Connect Apps to GitHub
connection: Github
image: /media/connections/github.png
seo_alias: github
index: 16
description: Learn how to add login functionality to your app with GitHub. You can also access the GitHub API.
toc: true
topics:
  - connections
  - social
  - github
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to GitHub

You can add functionality to your web app that allows your users to log in with GitHub. 

## Prerequisites

Before you connect your Auth0 app to GitHub, you must have a [GitHub Developer](https://github.com/settings/developers) account.

## Steps

To connect your app to GitHub, you will:

1. [Set up your app in GitHub](#set-up-your-app-in-gitHub)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in GitHub

Set up an app in GitHub. During this process, GitHub will generate a **Client ID** and **Client Secret** for your application; make note of these.

1. Log in to [GitHub](https://github.com/) and go to **OAuth applications** in your [developer settings](https://github.com/settings/developers). 
2. Click [Register a new application](https://github.com/settings/applications/new).
3. Complete the form including the information:

| Field | Description |
| - | - |
| Homepage URL | `https://${account.namespace}` |
| Authorization callback URL | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

4. Click **Register application** to proceed. Your app's **Client ID** and **Client Secret** will be displayed.

### Create and enable a connection in Auth0

[Set up the GitHub social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

## Troubleshooting

If you are receiving `Access Denied` when calling the GitHub API, you probably have not requested the correct permissions for the user during login. For information on how to fix that, refer to [Add scopes/permissions to call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp).

<%= include('../_quickstart-links.md') %>
