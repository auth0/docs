---
description: Learn how to call your own API using the regular web app login flow.
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Regular Web App Login Flow

::: note
This tutorial will help you call your own API using the regular web app login flow. If you want to learn how the flow works and why you should use it, see [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow). If you want to learn to add login to your regular web app, see [Add Login Using the Regular Web App Login Flow](/flows/guides/regular-web-app-login-flow/add-login-using-regular-web-app-login-flow).
:::

Auth0 makes it easy for your app to implement the regular web app login flow using:

* [Regular Web App Quickstarts](/quickstart/webapp): The easiest way to implement the regular web app flow.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.


## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/applications/webapps). 
  * Select an **Application Type** of **Regular Web Apps**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Authorization Code**.

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * If you want your API to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an authorization code.
2. [Request Tokens](#request-tokens): 
Exchange your authorization code for tokens.
3. [Call Your API](#call-api):
Use the retrieved Access Token to call your API.
4. [Refresh Tokens](#refresh-tokens):
Use a refresh token to request new tokens when the existing ones expire.

Optional: [Explore Sample Use Cases](#sample-use-cases)


<%= include('./includes/authorize-user-call-api') %>

<%= include('./includes/request-tokens') %>

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
