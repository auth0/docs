---
title: Call API from Single-Page Applications
description: Learn how to call your API using the single-page login flow
toc: true
topics:
  - api-authentication
  - oidc
  - hybrid-flow
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Single-Page Login Flow

::: note
This tutorial will help you call your own API using the single-page login flow. If you want to learn how the flow works and why you should use it, see [Single-Page Login Flow](/flows/concepts/single-page-login-flow). If you want to learn to add login to your single-page application (SPA), see [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow).
:::

Auth0 makes it easy for your app to implement the single-page login flow using:

* [Auth0.js](/libraries/auth0js): The easiest way to implement the single-page login flow, which will do most of the heavy-lifting for you. Our [Single-Page App Quickstarts](/quickstart/spa) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/applications/spa). 
  * Select an **Application Type** of **Single-Page App**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Implicit**.

* [Register your API with Auth0](/architecture-scenarios/spa-api/part-2#create-the-api)

## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with the requested credentials.
2. [Call Your API](#call-api): 
Use the retrieved Access Token to call your API.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/authorize-user-call-api') %>

<%= include('./includes/call-api') %>

<%= include('./includes/sample-use-cases-call-api') %>

## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
