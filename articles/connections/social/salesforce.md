---
title: Connect Apps to Salesforce
connection: Salesforce
image: /media/connections/salesforce.png
seo_alias: salesforce
index: 27
description: Learn how to add login functionality to your app with Salesforce. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - salesforce
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---

# Connect Apps to Salesforce

This guide will show you how to add functionality to your web app that allows your users to log in with Salesforce. 

## Prerequisites

Before connecting your Auth0 app to Salesforce, you must have already [signed up for and configured your account with Salesforce](https://www.salesforce.com/).

## Steps

To connect your app to Salesforce, you will:

1. [Get Salesforce credentials](#get-salesforce-credentials)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Get Salesforce credentials

If you have already set up a [Salesforce Sandbox](https://help.salesforce.com/articleView?id=deploy_sandboxes_intro.htm&type=5), set up your app in the Sandbox, and deployed the app to production, then you need to locate the app's production **Consumer Key** and **Consumer Secret**.

Alternatively, if you are setting up a new app in production, you need to create an app in Salesforce and generate credentials for it, using [Salesforce's Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=0) docs. During this process, Salesforce will generate a **Consumer Key** and **Consumer Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| API (Enable OAuth Settings) | Click `Enable OAuth Settings` |
| Callback URL | `https://${account.namespace}/login/callback` |
| Selected OAuth Scopes | Add `Access your basic information` |

<%= include('../../connections/_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Salesforce social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you use the **Consumer Key** and the **Consumer Secret** from Step 1.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
