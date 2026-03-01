---
title: Add Login Using the Implicit Flow with Form Post
description: Learn how to add login to your single-page application (SPA) using the Implicit Flow with Form Post.
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
# Add Login Using the Implicit Flow with Form Post

::: note
This tutorial will help you add login to your single-page application (SPA) using the Implicit Flow with Form Post. If you want to learn how the flow works and why you should use it, see [Implicit Flow with Form Post](/flows/concepts/implicit). 

You can use the Implicit Flow with Form Post for login-only use cases; if you need to request Access Tokens while logging the user in so you can call your API, use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce).
:::

Auth0 makes it easy to implement the Implicit Flow with Form Post by using:

* [Express OpenID Connect SDK](https://www.npmjs.com/package/express-openid-connect): The easiest way to implement the flow, which will do most of the heavy-lifting for you. If you use our [Javascript SDK](/libraries/auth0js), please ensure you are implementing mitigations that are appropriate for your architecture.
* Authentication API: If you prefer to roll your own solution, keep reading to learn how to call our API directly. 

Following successful login, your application will have access to the user's [ID Token](/tokens/id-tokens). The ID Token will contain basic user profile information.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](applications/spa)
    * Select an **Application Type** of **Single-Page App**.
    * Add an **Allowed Callback URL** of **`${account.callback}`**.
    * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Implicit**.

## Steps

1. [Authorize the user](#authorize-the-user): Request the user's authorization and redirect back to your app.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/sample-use-cases-add-login') %>

## Keep reading

- [The OAuth 2.0 protocol](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)
