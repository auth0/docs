---
description: Learn how to execute a mobile login flow.
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
contentType: tutorial
useCase:
  - secure-api
  - call-api
  - add-login
---
# Implement the Mobile Login Flow

<%= include('../../../_includes/_pipeline2') %>

::: note
This tutorial will help you implement the mobile login flow. If you want to learn how the flow works and why you should use it, see [Mobile Login Flow](/flows/concepts/mobile-login-flow).
:::

Auth0 makes it easy for your app to implement the mobile login flow using:

* [Auth0 Mobile SDKs](/libraries): The easiest way to implement the mobile login flow, which will do most of the heavy-lifting for you. Our [Mobile Quickstarts](/quickstart/native) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

If you prefer to embed your own login pages within your mobile app, you can implement our login widget (Lock UI) directly into your app with our:

* [iOS Lock UI Component library](/libraries/lock-ios/v2)
* [Android Lock UI Component library](/libraries/lock-android/v2)

Following successful login, your application will have access to the user's [ID Token](/tokens/id-token) and [Access Token](/tokens/overview-access-tokens). The ID Token will contain basic user profile information, and the Access Token can be used to call the Auth0 /userinfo endpoint or your own protected APIs.

## Prerequisites

This tutorial can be used to add login to your mobile app or to call an API from your mobile app.

**Before beginning this tutorial:**

* [Register your Application with Auth0](/applications/native). 
  * Select an **Application Type** of **Native**.
  * Add an **Allowed Callback URL** of **https://${account.namespace}/mobile**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Authorization Code**.
  
**If calling an API, you should also:**

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * Add an **Allowed Callback URL** of **com.myclientapp://myclientapp.com/callback**.
  * If you want your API to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps

1. [Create a code verifier](/flows/guides/mobile-login-flow/create-code-verifier): 
Generate a `code_verifier` that will be sent to Auth0 to request tokens.
2. [Create a code challenge](/flows/guides/mobile-login-flow/create-code-challenge): 
Generate a `code_challenge` from the `code_verifier` that will be sent to Auth0 to request an `authorization_code`.
3. [Authorize the user](/flows/guides/mobile-login-flow/authorize-user): 
Request the user's authorization and redirect back to your app with an `authorization_code`.
4. [Request Tokens](/flows/guides/mobile-login-flow/request-tokens): 
Exchange your `authorization_code` and `code_verifier` for tokens.
5. [Refresh Tokens](/flows/guides/mobile-login-flow/refresh-tokens):
Use a refresh token to request new tokens.

Optional: [Explore Sample Use Cases](/flows/guides/mobile-login-flow/sample-use-cases)

<%= include('./create-code-verifier') %>
<%= include('./create-code-challenge') %>
<%= include('./authorize-user') %>
<%= include('./request-tokens') %>
<%= include('./refresh-tokens') %>
<%= include('./sample-use-cases') %>

## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
