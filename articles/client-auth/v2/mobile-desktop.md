---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application.
toc: true
---

# Authentication for Mobile & Desktop Apps

You can authenticate users of your mobile/desktop applications by:

* Using the [Lock](/libraries/lock) client libraries;
* Calling the Auth0 OAuth 2.0 endpoints.

This article will cover how to call the Auth0 OAuch 2.0 endpoints using the [Authorization Code Grant Flow using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce).

## Overview

Auth0 exposes OAuth 2.0 endpoints that you can use to authenticate users. You can call these endpoints through an embedded browser in your **native** application. After authentication completes, you can return an `id_token` that contains the user's profile information.

Please note that, instead of following this tutorial, you can use any of Auth0's client libraries. These encapsulate all the logic required and make it easier for your to implement authentication. Please refer to our [Native Quickstarts](/quickstart/native) to get started with any of these.

## Register Your Client

If you haven't already created a new [Client](/clients) in Auth0, you'll need to do so before implementing your authentication flow. The Auth0 Client maps to your application and allows your application to use Auth0 for authentication purposes.

### Create a New Client

Go to the [Auth0 Dashboard](${manage_url}) and click on [Clients](${manage_url}/#/clients) in the left-hand navigation bar. Click **Create Client**.

The **Create Client** window will open, allowing you to enter the name of your new Client. Choose **Native** as the **Client Type**. When done, click on **Create** to proceed.

::: panel-danger Warning
The Authorization Code flow with PKCE can only be used for Native Clients.
:::

![](/media/articles/client-auth/mobile-desktop/create-client.png)

Once Auth0 creates the Client, navigate to the Client's **Settings** tab to add the following to the **Allowed Callback URLs** field: `https://${account.namespace}/mobile`

Scroll to the bottom of the page and click **Save**.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)
