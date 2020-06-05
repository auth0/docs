---
title: Connect Apps to Evernote Sandbox
connection: Evernote Sandbox
image: /media/connections/evernote.png
seo_alias: evernote
description: Learn how to add login functionality to your app with Evernote Sandbox. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
index: 5
topics:
  - connections
  - social
  - evernote
  - sandbox
contentType: how-to
useCase:
  - customize-connections
  - add-idp
  - add-login
---

# Connect Apps to Evernote Sandbox

This guide will show you how to add functionality to your web app that allows your users to log in with Evernote Sandbox, which is a separate instance of the Evernote service, designed as a safe environment for you to develop and test your applications.

::: warning
When you are ready to connect to Evernote's production environment, you will need to connect your app to Evernote's production environment. To learn how, see [Connect Apps to Evernote](/connections/social/evernote).
:::

## Prerequisites

Before connecting your Auth0 app to Evernote Sandbox, you should have already [signed up for and configured your account with Evernote](https://evernote.com/).

## Steps

To connect your app to Evernote Sandbox, you will:

1. [Request Evernote Sandbox credentials](#request-evernote-sandbox-credentials)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Request Evernote Sandbox credentials

Request Evernote Sandbox credentials by logging in to the [Evernote Developers Portal](http://dev.evernote.com), clicking **Get an API Key**, and entering the required information. During this process, Evernote will generate a **Consumer Key** and **Consumer Secret** for you; make note of these.

### Create and enable a connection in Auth0

[Set up the Evernote Sandbox social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Consumer Key** and the **Consumer Secret** generated in Step 1.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>