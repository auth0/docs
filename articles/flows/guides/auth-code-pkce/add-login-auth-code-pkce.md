---
title: Add Login Using the Authorization Code Flow with PKCE
description: Learn how to add login to your native or mobile application using the Authorization Code Flow with Proof Key for Code Exchange (PKCE).
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
  - native-apps
  - mobile-apps
contentType: tutorial
useCase:
  - add-login
---
# Add Login Using the Authorization Code Flow with PKCE

::: note
This tutorial will help you add login to your native/mobile app using the Authorization Code Flow with PKCE. If you want to learn how the flow works and why you should use it, see [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce). If you want to learn to call your API from a native/mobile app, see [Call Your API Using Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).
:::

Auth0 makes it easy for your app to implement the Authorization Code Flow with Proof Key for Code Exchange (PKCE) using:

* [Auth0 Mobile SDKs](/libraries#auth0-sdks): The easiest way to implement the flow, which will do most of the heavy-lifting for you. Our [Mobile Quickstarts](/quickstart/native) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

Following successful login, your application will have access to the user's [ID Token](/tokens/id-token) and [Access Token](/tokens/overview-access-tokens). The ID Token will contain basic user profile information, and the Access Token can be used to call the Auth0 /userinfo endpoint or your own protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-native). 
  * Select an **Application Type** of **Native**.
  * Add an **Allowed Callback URL** of **`YOUR_CALLBACK_URL`**. Your callback URL format will vary depending on your platform. For details about the format for your platform, see our [Native/Mobile Quickstarts](/quickstart/native).
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Authorization Code**.

## Steps

Each time your user chooses to authenticate you will need to:

1. [Create a code verifier](#create-a-code-verifier): 
Generate a `code_verifier` that will be sent to Auth0 to request tokens.
2. [Create a code challenge](#create-a-code-challenge): 
Generate a `code_challenge` from the `code_verifier` that will be sent to Auth0 to request an `authorization_code`.
3. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an `authorization_code`.
4. [Request Tokens](#request-tokens): 
Exchange your `authorization_code` and `code_verifier` for tokens.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/create-code-verifier') %>

<%= include('./includes/create-code-challenge') %>

<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/request-tokens') %>

<%= include('./includes/sample-use-cases-add-login') %>

## Keep Reading

::: next-steps
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
