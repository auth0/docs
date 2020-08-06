---
title: Connect Apps to Salesforce Sandbox
connection: Salesforce Sandbox
image: /media/connections/salesforce.png
seo_alias: salesforce-sandbox
index: 28
description: Learn how to add login functionality to your app with Salesforce Sandbox. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - salesforce
contentType: how-to
useCase:
  - customize-connections
  - add-idp
  - add-login
---

# Connect Apps to Salesforce Sandbox

In addition to its production system, Salesforce offers sandboxes, so you can isolate customization and development work from your production environment until you’re ready to deploy changes. This guide will show you how to add functionality to your web app that allows your users to log in with Salesforce Sandbox.

To learn more about Salesforce Sandboxes, see Salesforce's [Sandboxes: Staging Environments for Customizing and Testing](https://help.salesforce.com/articleView?id=deploy_sandboxes_intro.htm&type=5) docs.

## Prerequisites

Before connecting your Auth0 app to Salesforce Sandbox, you must have already [signed up for and configured your account with Salesforce](https://www.salesforce.com/) and [create a Salesforce Sandbox](https://help.salesforce.com/articleView?id=data_sandbox_create.htm&type=5).

## Steps

To connect your app to Salesforce Sandbox, you will:

1. [Set up your app in Salesforce Sandbox](#set-up-your-app-in-salesforce)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Salesforce Sandbox

Create an app in Salesforce Sandbox and generate credentials for it, using [Salesforce's Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=0) docs. During this process, Salesforce will generate a **Consumer Key** and **Consumer Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| API (Enable OAuth Settings) | Click `Enable OAuth Settings` |
| Callback URL | `https://${account.namespace}/login/callback` |
| Selected OAuth Scopes | Add `Access your basic information` |

<%= include('../../connections/_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Salesforce Sandbox social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Consumer Key** and the **Consumer Secret** generated in Step 1.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
