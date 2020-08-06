---
title: Connect Apps to Basecamp
connection: Basecamp
image: /media/connections/basecamp.png
alias:
  - basecamp
  - thirtysevensignals
seo_alias: 37signals
description: How to obtain a Client Id and Client Secret for Basecamp (formerly 37Signals).
toc: true
index: 4
topics:
  - connections
  - social
  - 37signals
  - basecamp
contentType: how-to
useCase:
  - customize-connections
  - add-idp
  - add-login
---
 
# Connect Apps to Basecamp

This guide will show you how to add functionality to your web app that allows your users to log in with Basecamp (formerly 37Signals).

## Prerequisites

Before connecting your Auth0 app to Basecamp, you must have [set up an account with Basecamp](https://basecamp.com/).

## Steps

To connect your app to Basecamp, you will:

1. [Set up your app in Basecamp](#set-up-your-app-in-basecamp)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Basecamp

Register an app in Basecamp and generate credentials for it through the [Basecamp Launchpad](https://integrate.37signals.com/). While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Redirect URI | `https://${account.namespace}/login/callback` |
| Products | Select the Basecamp products with which you want your app to integrate. |

<%= include('../_find-auth0-domain-redirects') %>

During this process, Basecamp will generate a **Client ID** and **Client Secret** for your application, which you can see on the Application Details page; make note of these.

### Create and enable a connection in Auth0

[Set up the 37Signals social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and the **Client Secret** generated in Step 1.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
