---
title: Call API Using On-Behalf-Of Flow
description: Learn how to call another API from your API using the On-Behalf-Of Flow.
toc: true
topics:
  - api-authorization
  - oauth2
  - on-behalf-of
  - token-exchange
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call an API From Another API Using the On-Behalf-Of Flow

::: note
This tutorial will help you call another API from your own API using the On-Behalf-Of Flow. If you want to learn how the flow works and why you should use it, see [On-Behalf-Of Flow](/flows/concepts/on-behalf-of).
:::

Auth0 makes it easy for your app to implement the On-Behalf-Of flow using:

* [Authentication API](/api/authentication): Keep reading to learn how to call our API directly.

## Prerequisites

**Before beginning this tutorial:**

* [Register the Application with Auth0](/getting-started/set-up-app).
  * Add an **Allowed Callback URL** of **`YOUR_CALLBACK_URL`**. Your callback URL format will vary depending on your platform.
  * Make sure the Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** includes the Grant Type for the appropriate [authentication flow](/flows).
  * If you want your Application to be able to use [Refresh Tokens](/tokens/refresh-token), make sure the Application's **Grant Types** include **Refresh Token**.

* [Register your Source API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * [Enable Token Exchange](/dashboard/guides/apis/enable-token-exchange) so that this API can exchange its tokens to get tokens for other APIs.
  * If you want your source API to receive <dfn data-key="refresh-token">Refresh Tokens</dfn> to allow it to obtain a new Access Token when the previous one expires, [update grant types](/api/management/guides/apis/update-grant-types) with a value of `refresh_token`.

* [Register your Target API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * [Enable **Allow Skipping User Consent**](/dashboard/guides/apis/enable-skipping-user-consent) so that the source API can use its Access Token to get an Access Token from this API.
  * If you want your source API to receive <dfn data-key="refresh-token">Refresh Tokens</dfn> to allow it to obtain a new Access Token when the previous one expires, [enable **Allow Offline Access**](/dashboard/guides/apis/enable-offline-access).

* [Add Source API/Target API Pairing](/dashboard/guides/apis/add-api-pairing) and select requested scopes.

## Steps 

1. [Request Tokens](#request-tokens): 
Request tokens.
2. [Call your Source API](#call-your-source-api):
Use the retrieved Access Token to call the Source API.
3. [Exchange Token](#exchange-token):
Exchange the retrieved Source API Access Token for tokens to use with the Target API.
4. [Call your Target API](#call-your-target-api):
Use the retrieved Target API Access Token to call the Target API.
5. [Refresh Tokens](#refresh-tokens):
Use a Refresh Token to request new tokens when the existing ones expire.

Optional: [Explore Sample Use Cases](#sample-use-cases)

Optional: [Troubleshooting](#troubleshooting)


<%= include('./includes/request-tokens') %>

<%= include('./includes/call-api-source') %>

<%= include('./includes/exchange-token') %>

<%= include('./includes/call-api-target') %>

<%= include('./includes/refresh-tokens') %>

<%= include('./includes/sample-use-cases-call-api') %>

<%= include('./includes/troubleshooting') %>

## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [OAuth 2.0 framework](/protocols/oauth2)
- [Tokens used by Auth0](/tokens)
:::
