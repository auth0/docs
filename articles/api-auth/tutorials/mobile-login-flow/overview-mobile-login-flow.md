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

<%= include('../../_includes/_pipeline2') %>

::: note
This tutorial will help you implement the mobile login flow. If you want to learn how the flow works and why you should use it, see [Mobile Login Flow](/api-auth/grant/authorization-code-pkce).
:::

Auth0 makes it easy for your app to implement the mobile login flow using:

* [Auth0 Mobile SDKs](/libraries): The easiest way to implement the mobile login flow, which will do most of the heavy-lifting for you. Our [Mobile Quickstarts](/quickstart/native) will walk you through the process.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

If you prefer to embed your own login pages within your mobile app, you can implement our login widget (Lock UI) directly into your app with our:

* [iOS Lock UI Component library](/libraries/lock-ios/v2)
* [Android Lock UI Component library](/libraries/lock-android/v2)


## Prerequisites

This tutorial can be used to add login to your app or to call an API from your app.

Before beginning the tutorial, please:

* [Register your Application with Auth0](/application-auth/guides/register-application-dashboard). 
  * Select an **Application Type** of **Native**.
  * Add an **Allowed Callback URL** of **https://${account.namespace}/mobile**.
  * Make sure your Application's **[Grant Types](/applications/guides/change-app-grant-type-dashboard)** include **Authorization Code**.
  * If you want your app to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enabled **Allow Offline Access**.
  
If calling an API, you should also:

* [Register your API with Auth0](/api-auth/guides/register-api)
  * Add an **Allowed Callback URL** of **com.myclientapp://myclientapp.com/callback**.
  * If you want your API to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enabled **Allow Offline Access**.


## Steps

1. [Create a code verifier](/api-auth/tutorials/mobile-login-flow/create-code-verifier): 
Generate a code_verifier that will be sent to Auth0 to request an authorization_code.
2. [Create a code challenge](/api-auth/tutorials/mobile-login-flow/create-code-challenge): 
Generate a code_challenge from the code_verifier that, along with the code_verifier, will be sent to Auth0 to request an authorization_code.
3. [Authorize the user](/api-auth/tutorials/mobile-login-flow/authorize-user): 
Request the user's authorization and redirect back to your app with an authorization_code.
4. [Request Tokens](/api-auth/tutorials/mobile-login-flow/request-tokens): 
Exchange your authorization_code and code_verifier for tokens.

Optional: [Explore Sample Use Cases](/api-auth/tutorials/mobile-login-flow/sample-use-cases)

Following successful login, your application will have access to the user's [ID Token](/tokens/id-token) and [Access Token](/tokens/overview-access-tokens). The ID Token will contain basic user profile information, and the Access Token can be used to call Auth0 or your own protected APIs.


## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application Authentication for Mobile & Desktop Apps](/Application-auth/mobile-desktop)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
