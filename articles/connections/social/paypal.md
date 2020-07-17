---
title: Connect Apps to PayPal
connection: PayPal
image: /media/connections/paypal.png
seo_alias: paypal
index: 23
description: Learn how to add login functionality to your app with PayPal. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - paypal
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to PayPal

This guide will show you how to add functionality to your web app that allows your users to log in with PayPal.

## Prerequisites

Before connecting your Auth0 app to PayPal, you must have already [signed up for and configured your account with PayPal](https://developer.paypal.com). Upon account creation, you will have access to a PayPal Sandbox.

## Steps

To connect your app to PayPal, you will:

1. [Set up your app in PayPal](#set-up-your-app-in-paypal)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in PayPal

::: warning
By default, upon login, you will be editing your Sandbox account. Make sure you switch to your production account by moving the environment toggle to **Live**.
:::

Create an app in PayPal and generate credentials for it, using [PayPal's Get Credentials](https://developer.paypal.com/docs/api/overview/#get-credentials) doc. During this process, PayPal will generate a **Client ID** and **Client Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Return URL | `${account.callback}` |
| Log In with PayPal | Enable, then under **Advanced Options**, select **Full Name**, **Date of Birth**, **Timezone**, **Locale**, and **Language**. |

<%= include('../../connections/_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the PayPal social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Client ID** and the **Secret** generated in Step 1.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

::: note
Your app's **Return URL** can take up to 3 hours to go into effect with Paypal, which can cause the connection to fail until it is updated.
:::

<%= include('../_quickstart-links.md') %>
