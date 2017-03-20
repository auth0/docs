---
title: Authentication for Mobile & Desktop Apps
description: Explains how to authenticate users in a mobile or desktop application.
toc: true
---

# Authentication for Mobile & Desktop Apps

You can authenticate users of your mobile/desktop applications by:

* Using the [Lock](/libraries/lock) client libraries;
* Calling the Auth0 OAuth 2.0 endpoints.

This article will cover how to call the Auth0 OAuch 2.0 endpoints using the [Authorization Code Grant Flow using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce). Doing so requires you to:

1. Create a random key (called the **code verifier**) and its transformed value (called the **code challenge**)
2. Obtain the user's authorization
3. Obtain an access token
4. Call the API using the new access token

## Overview

Auth0 allows you to use the OAuth 2.0 endpoints for authenticating users...

## Register Your Client

If you haven't already created a new [Client](/clients) in Auth0, you'll need to do so before implementing your authentication flow. The Auth0 Client maps to your application and allows your application to use Auth0 for authentication purposes.

### Create a New Client

Go to the [Auth0 Dashboard](${manage_url}) and click on [Clients](${manage_url}/#/clients) in the left-hand navigation bar. Click **Create Client**.

The **Create Client** window will open, allowing you to enter the name of your new Client. Choose **Native** as the **Client Type**. When done, click on **Create** to proceed.

![](/media/articles/client-auth/mobile-desktop/create-client.png)

Once Auth0 creates the Client, navigate to the Client's **Settings** tab to add the following to the **Allowed Callback URLs** field:

`https://${account.namespace}/mobile`

Scroll to the bottom of the page and click **Save**.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)

## Implement Authentication
