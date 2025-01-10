---
title: Call API Using the Authorization Code Flow
description: Learn how to call your own API from regular web apps using the Authorization Code Flow.
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
  - regular-web-apps
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Authorization Code Flow

::: note
This tutorial will help you call your own API using the Authorization Code Flow. If you want to learn how the flow works and why you should use it, see [Authorization Code Flow](/flows/concepts/auth-code). If you want to learn to add login to your regular web app, see [Add Login Using the Authorization Code Flow](/flows/guides/auth-code/add-login-auth-code).
:::

Auth0 makes it easy for your app to implement the Authorization Code Flow using:

* [Regular Web App Quickstarts](/quickstart/webapp): The easiest way to implement the flow.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.


## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-regular-web). 
  * Select an **Application Type** of **Regular Web Apps**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Authorization Code**.
  * If you want your Application to be able to use [Refresh Tokens](/tokens/concepts/refresh-tokens), make sure the Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Refresh Token**.

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * If you want your API to receive <dfn data-key="refresh-token">Refresh Tokens</dfn> to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an authorization code.
2. [Request Tokens](#request-tokens): 
Exchange your authorization code for tokens.
3. [Call your API](#call-your-api):
Use the retrieved Access Token to call your API.
4. [Refresh Tokens](#refresh-tokens):
Use a Refresh Token to request new tokens when the existing ones expire.

Optional: [Explore Sample Use Cases](#sample-use-cases)


<%= include('./includes/authorize-user-call-api') %>

<%= include('./includes/request-tokens') %>

<%= include('./includes/call-api') %>

<%= include('./includes/refresh-tokens') %>

<%= include('./includes/sample-use-cases-call-api') %>

## Keep reading

- [OAuth 2.0 framework](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)
