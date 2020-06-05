---
title: Connect Apps to Evernote
connection: Evernote
image: /media/connections/evernote.png
seo_alias: evernote
description: Learn how to add login functionality to your app with Evernote. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - evernote
contentType: how-to
useCase:
  - customize-connections
  - add-idp
  - add-login
---

# Connect Apps to Evernote

This guide will show you how to add functionality to your web app that allows your users to log in with Evernote.

## Prerequisites

Before connecting your Auth0 app to Evernote's production environment, you should have already set up a connection to Evernote's Sandbox. To learn how, see [Connect Apps to Evernote Sandbox](/connections/social/evernote-sandbox).

## Steps

To connect your app to Evernote, you will:

1. [Request that Evernote activate your API Key on production](#request-that-evernote-activate-your-api-key-on-production)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Request that Evernote activate your API Key on production

When you [connected your app to Evernote Sandbox](/connections/social/evernote-sandbox), Evernote generated a **Consumer Key** and **Consumer Secret** for you. You now need to request that Evernote activate your **Consumer Key** on production.

To do this, navigate to [Support Resources for Evernote Developers](https://dev.evernote.com/support/), click **Activate an API Key**, and enter the requested information.

### Create and enable a connection in Auth0

[Set up the Evernote social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Now that they have been activated in production, use the **Consumer Key** and the **Consumer Secret** generated when you [connected your app to Evernote Sandbox](/connections/social/evernote-sandbox).

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
