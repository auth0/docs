---
title: Add Login Using the Implicit Flow
description: Learn how to add login to your single-page application (SPA) using the Implicit Flow.
toc: true
topics:
  - api-authentication
  - oidc
  - hybrid-flow
  - implicit-flow
  - SPA
  - single-page apps
contentType: tutorial
useCase:
  - add-login
---
# Add Login Using the Implicit Flow

::: note
This tutorial will help you add login to your single-page application (SPA) using the Implicit Flow. If you want to learn how the flow works and why you should use it, see [Implicit Flow](/flows/concepts/implicit). If you want to learn to call your API from a SPA, see [Call Your API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit).
:::

Auth0 makes it easy to implement the Implicit Flow by using:

* [Auth0.js](/libraries/auth0js): The easiest way to implement the flow, which will do most of the heavy-lifting for you. Our [Single-Page App Quickstarts](/quickstart/spa) will walk you through the process.
* Authentication API: If you prefer to roll your own solution, keep reading to learn how to call our API directly.

Following successful login, your application will have access to the user's [ID Token](/tokens/concepts/id-tokens) and [Access Token](/tokens/concepts/access-tokens), as well as an authorization code that can be exchanged with Auth0 for an additional Access Token. The ID Token will contain basic user profile information, and the Access Token can be used to call the Auth0 /userinfo endpoint or your own protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](applications/spa)
    * Select an **Application Type** of **Single-Page App**.
    * Add an **Allowed Callback URL** of **`${account.callback}`**.
    * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Implicit**.

## Steps

1. [Authorize the user](#authorize-the-user): Request the user's authorization and redirect back to your app.
2. [Request tokens](#request-tokens): If the SPA has a back-end, exchange your authorization code for tokens, including a secure Access Token.


Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/sample-use-cases-add-login') %>

## Keep Reading

::: next-steps
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
