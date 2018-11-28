---
description: Learn how to call your API using an SPA
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
# Call My API Using a Single Page Application (SPA)

<%= include('../../../_includes/_pipeline2') %>

::: note
This tutorial will help you call your API using the regular web app login flow. If you want to learn how the flow works and why you should use it, see [Regular Web App Login Flow](/flows/concepts/single-page-login-flow).
:::

Auth0 makes it easy for your app to implement the SPA login flow using:

* [Auth0 Mobile SDKs](/libraries): The easiest way to implement the regular web app flow, which will do most of the heavy-lifting for you. Our [Regular Web App Quickstarts](/quickstart/spa) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

## Prerequisites

This tutorial can be used call your API from a single page web app. If you want to learn to add login to your SPA, see [Add Login Using the Single Page App Login Flow](/flows/guides/spa-flow/add-login-using-spa-flow).

**Before beginning this tutorial:**

* [Register your Application with Auth0](/applications/webapps). 
  * Select an **Application Type** of **Single Page Web App**.
  * Add an **Allowed Callback URL** of **https://${account.namespace}/callback**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Authorization Code** and **Implicit**.

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * Add an **Allowed Callback URL** of **com.myapi://myapi.com/callback**.
  * If you want your API to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps

1. [Authorize the user](#authorize-the-user): Request the user's authorization and redirect back to your app.
1. [Parse the response from Auth0](#parse-the-response-from-auth0): Parse the hash fragments in the URL used by Auth0 to redirect the user to get the Authorization Code, ID Token, and/or Access Token.
1. [Exchange the Authorization Code for an Access Token](#exchange-the-authorization-code-for-an-access-token): Exchange the Authorization Code with Auth0 for an Access Token that allows you to call your protected API.
3. [Call Your API](#call-api): Use the Access Token you retrieved by exchanging your authorization code to call your API.
1. [Refresh Tokens](#refresh-tokens): Use a refresh token to request new Access Tokens if the existing ones are expired.

Optional: [Explore Sample Use Cases](#sample-use-cases)

<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/parse-the-response-from-auth0') %>

<%= include('./includes/exchange-the-authorization-code-for-an-access-token') %>

<%= include('./includes/call-api') %>

<%= include('./includes/refresh-tokens') %>

<%= include('./includes/sample-use-cases-call-api') %>

## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::