---
title: Connect Apps to Amazon
connection: Amazon Web Services
image: /media/connections/amazon.png
alias:
  - aws
  - amazon-web-services
seo_alias: amazon
index: 1
description: Learn how to add login functionality to your app with Amazon. You will need to obtain a Client Id and Client Secret for Amazon.
toc: true
topics:
  - connections
  - social
  - amazon
contentType: how-to
useCase:
  - customize-connections
  - add-idp
---

# Connect Apps to Amazon

You can add functioanlity to your app that allows your users to login with Amazon.

## Prerequisites

Before connecting your Auth0 app to have an account on the [Amazon portal](http://login.amazon.com). 

## Steps

To connect your app to Amazon, you will:

1. [Set up your app on Amazon](#set-up-your-app-on-amazon)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection) 

### Set up your app on Amazon

1. Log into [Login with Amazon](http://login.amazon.com) and select **App Console**.
2. Click on the **Register New Application** button and enter a **Name**, **Description**, and **Privacy Notice URL** for your app. Click **Save**.
3. Enter your callback URL. Expand the **Web Settings** section. 

| Field | Value to Provide |
| - | - |
| Allowed Javascript Origins | `https://${account.namespace}/` |
| Allowed Return URL | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Amazon social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
