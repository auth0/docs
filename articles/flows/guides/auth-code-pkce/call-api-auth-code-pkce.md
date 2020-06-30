---
title: Call API Using Authorization Code Flow with PKCE
description: Learn how to call your API from a native, mobile, or single-page application using the Authorization Code flow using Proof Key for Code Exchange (PKCE).
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
  - native-apps
  - mobile-apps
  - single-page-apps
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Authorization Code Flow with PKCE

::: note
This tutorial will help you call your own API from a native, mobile, or single-page app using the Authorization Code Flow with PKCE. If you want to learn how the flow works and why you should use it, see [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce). If you want to learn to add login to your native, mobile, or single-page app, see [Add Login Using Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce).
:::

Auth0 makes it easy for your app to implement the Authorization Code Flow with Proof Key for Code Exchange (PKCE) using:

* [Auth0 Mobile SDKs](/libraries#auth0-sdks) and [Auth0 Single-Page App SDK](/libraries/auth0-spa-js): The easiest way to implement the flow, which will do most of the heavy-lifting for you. Our [Mobile Quickstarts](/quickstart/native) and [Single-Page App Quickstarts](/quickstart/spa) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.


## Prerequisites

**Before beginning this tutorial:**

* [Register the Application with Auth0](/dashboard/guides/applications/register-app-native). 
  * Select an **Application Type** of **Native** or **Single-Page App**, depending on your application type.
  * Add an **Allowed Callback URL** of **`YOUR_CALLBACK_URL`**. Your callback URL format will vary depending on your application type and platform. For details about the format for your application type and platform, see our [Native/Mobile Quickstarts](/quickstart/native) and [Single-Page App Quickstarts](/quickstart/spa).
  * Make sure the Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Authorization Code**.
  * If you want your Application to be able to use [Refresh Tokens](/tokens/concepts/refresh-tokens), make sure the Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Refresh Token**.

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * If you want your API to receive <dfn data-key="refresh-token">Refresh Tokens</dfn> to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps 

1. [Create a code verifier](#create-a-code-verifier): 
Generate a `code_verifier` that will be sent to Auth0 to request tokens.
2. [Create a code challenge](#create-a-code-challenge): 
Generate a `code_challenge` from the `code_verifier` that will be sent to Auth0 to request an `authorization_code`.
3. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an `authorization_code`.
4. [Request Tokens](#request-tokens): 
Exchange your `authorization_code` and `code_verifier` for tokens.
5. [Call your API](#call-your-api):
Use the retrieved Access Token to call your API.
6. [Refresh Tokens](#refresh-tokens):
Use a Refresh Token to request new tokens when the existing ones expire.

Optional: [Explore Sample Use Cases](#sample-use-cases)


<%= include('./includes/create-code-verifier') %>

<%= include('./includes/create-code-challenge') %>

<%= include('./includes/authorize-user-call-api') %>

<%= include('./includes/request-tokens') %>

<%= include('./includes/call-api') %>

<%= include('./includes/refresh-tokens') %>

<%= include('./includes/sample-use-cases-call-api') %>

## Keep reading

- [OAuth 2.0 framework](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)
