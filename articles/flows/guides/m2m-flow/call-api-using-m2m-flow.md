---
description: Learn how to execute a machine-to-machine application flow using the client credientials grant.
toc: true
topics:
  - api-authentication
  - oidc
  - client-credentials
  - M2M
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call My API Using the M2M Flow

::: note
This tutorial will help you implement the M2M flow. If you want to learn how the flow works and why you should use it, see [M2M Flow](/flows/concepts/m2m-flow).
:::

Auth0 makes it easy for your app to implement the M2M flow using:

* [Auth0 SDKs](/libraries): The easiest way to implement the M2M flow, which will do most of the heavy-lifting for you. Our [Backend/API Quickstarts](/quickstart/backend) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

Following successful authentication, the calling application will have access to an [Access Token](/tokens/overview-access-tokens), which can be used to call your protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register the M2M Application with Auth0](/applications/machine-to-machine). 
  * Select an **Application Type** of **Machine to Machine Applications**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Client Credentials**.
  
* [Register your API with Auth0](/architecture-scenarios/server-api/part-2#configure-the-api)
  
 * Authorize the M2M Application to call your API [using the dashboard](/api-auth/config/using-the-auth0-dashboard) or [using our Management API](/api-auth/config/using-the-management-api).

## Steps

1. [Request a token](#request-token): 
From the authorized application, request an Access Token for your API. 
2. [Call your API](#call-api): 
Use the retrieved Access Token to call your API.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/request-token') %>

<%= include('./includes/call-api') %>

<%= include('./includes/sample-use-cases') %>


Once your API receives a request with an Access Token, it will need to validate the token. For details, see [Validate Access Tokens](/api-auth/tutorials/verify-access-token).


## Keep reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [How to change scopes and add custom claims to tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
