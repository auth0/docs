---
title: Automatically Generate Leads in Shopify
description: Learn how to automatically generate leads in Shopify using rules.
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Automatically Generate Leads in Shopify

To increase e-commerce sales, you may want to integrate with Shopify. With Auth0, you can not only [configure Shopify as a social identity provider](/connections/social/shopify) out-of-the-box, you can also automatically generate leads in Shopify using a specialized rule template.

In this example, we will use a rule to automatically generate a lead with Shopify when a user authenticates.

## Prerequisites

Before connecting your Auth0 app to Shopify, you must [sign up for and configure your account with Shopify](https://www.shopify.com/).

## Steps

To connect your app to Shopify, you will:

1. [Set up your app in Shopify](#set-up-your-app-in-shopify)
2. [Get your Shopify credentials](#get-your-shopify-credentials)
3. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Set up your app in Shopify

Create an app in Shopify and generate credentials for it, using Shopify's [Authenticate a Private App with Shopify Admin](https://shopify.dev/tutorials/authenticate-a-private-app-with-shopify-admin). During this process, Shopify will generate an **API Key** and **API Password** for your application; make note of these.

### Get your Shopify credentials

You will also need to get your Shopify API URL. To learn about the structure of your Shopify API URL, see Shopify's [Make Your First Shopify API Request](https://shopify.dev/tutorials/make-your-first-shopify-api-request#making-your-first-request).

Once you have retrieved your Shopify API URL, keep this value on hand because we will use it in the next step.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **shopify-leads-from-login** template from the **Webhook** section, then use the following settings:

::: warning
You may use global variables to configure these in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first.
:::

| Variable | Value |
| -------- | ----- |
| SHOPIFY_API_KEY | API Key for the application you previously set up in Shopify. |
| SHOPIFY_API_PWD | API Password for the application you previously set up in Shopify. |
| SHOPIFY_API_URL | Your Shopify API URL. |

By default, your rule will be activated upon save.
