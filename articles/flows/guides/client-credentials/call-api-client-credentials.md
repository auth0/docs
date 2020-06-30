---
title: Call API Using the Client Credentials Flow
description: Learn how to call your API from a machine-to-machine (M2M) application using the Client Credentials Flow.
toc: true
topics:
  - api-authentication
  - oidc
  - client-credentials
  - M2M
  - machine-to-machine apps
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Client Credentials Flow

::: note
This tutorial will help you call your API from a machine-to-machine (M2M) application using the Client Credentials Flow. If you want to learn how the flow works and why you should use it, see [Client Credentials Flow](/flows/concepts/client-credentials).
:::

Auth0 makes it easy for your app to implement the Client Credentials Flow. Following successful authentication, the calling application will have access to an [Access Token](/tokens/concepts/access-tokens), which can be used to call your protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register your API with Auth0](/architecture-scenarios/server-api/part-2#configure-the-api)

* [Register the M2M Application with Auth0](/dashboard/guides/applications/register-app-m2m). 
  * Select an **Application Type** of **Machine to Machine Applications**.
  * Choose your previously-registered API.    
  * Authorize the M2M Application to call your API.

## Steps

1. [Request a token](#request-token): 
From the authorized application, request an Access Token for your API. 
2. [Call your API](#call-your-api): 
Use the retrieved Access Token to call your API.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/request-token') %>

<%= include('./includes/call-api') %>

<%= include('./includes/sample-use-cases') %>

Once your API receives a request with an Access Token, it will need to validate the token. For details, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

## Keep reading

- [How to change scopes and add custom claims to tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)
