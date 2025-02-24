---
title: Call API Using the Implicit Flow
description: Learn how to call your API from single-page apps (SPA) using the Implicit Flow.
toc: true
topics:
  - api-authentication
  - oidc
  - implicit-flow
  - single-page apps
  - SPA
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Implicit Flow

::: note
This tutorial will help you call your own API from a single-page application (SPA) using the Implicit Flow. If you want to learn how the flow works and why you should use it, see [Implicit Flow](/flows/concepts/implicit). If you want to learn to add login to your single-page application (SPA), see [Add Login Using the Implicit Flow](/flows/guides/implicit/add-login-implicit).
:::

Auth0 makes it easy for your app to implement the Implicit Flow using:

* [Auth0.js](/libraries/auth0js): The easiest way to implement the flow, which will do most of the heavy-lifting for you. Our [Single-Page App Quickstarts](/quickstart/spa) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-spa). 
  * Select an **Application Type** of **Single-Page App**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Implicit**.

* [Register your API with Auth0](/architecture-scenarios/spa-api/part-2#create-the-api)

## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with the requested credentials.
2. [Call Your API](#call-your-api): 
Use the retrieved Access Token to call your API.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/authorize-user-call-api') %>

<%= include('./includes/call-api') %>

<%= include('./includes/sample-use-cases-call-api') %>

## Keep reading

- [OAuth 2.0 framework](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)
