---
title: Connect Apps to Planning Center
connection: Planning Center
image: /media/connections/planning-center.png
seo_alias: planning-center
description: Learn how to add login functionality to your app with Planning Center. You will need to get a Client Id and Client Secret for Planning Center.
toc: true
index: 25
topics:
  - connections
  - social
  - planning-center
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Planning Center

You can add functionality to your web app that allows your users to log in with Planning Center. 

## Prerequisites

Before connecting your Auth0 app to Planning Center, you must have a [Planning Center Developer](https://api.planningcenteronline.com/) account.

## Steps

To connect your app to Planning Center, you will:

1. [Set up your app in Planning Center](#set-up-your-app-in-planning-center)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Planning Center

Set up an app in Planning Center. During this process, Planning Center will generate a **Client ID** and **Secret** for your application; make note of these.

1. Log in to the [Planning Center Developer](https://api.planningcenteronline.com/) portal and click **Register** on the **Developer Applications** page.
2. Complete form including the following information.

| Field | Value to Provide |
| - | - |
| App URL | `https://${account.namespace}` |
| Whitelisted redirection URL(s) | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

4. Click **Submit**. Your `Client Id` and `Secret` will be displayed.

### Create and enable a connection in Auth0

[Set up the Planning Center social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>