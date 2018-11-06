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

Before beginning this tutorial, please:

* Register your Application with Auth0
* [Register your API with Auth0](/apis#how-to-configure-an-api-in-auth0)
* Make sure your Application's [Grant Type property](/applications/application-grant-types) is set to Authorization Code.


## Steps

1. Create a code verifier
2. Create a code challenge
3. Get the user's authorization
4. Exchange the Authorization Code for an Access Token
5. Call an API
6. Verify the Token
Optional: Customize the Tokens

Following successful login, your application will have access to the user's [ID Token](/tokens/id-token) and [Access Token](/tokens/overview-access-tokens). The ID Token will contain basic user profile information and the Access Token can be used to call Auth0 or your own protected APIs.


## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application Authentication for Mobile & Desktop Apps](/Application-auth/mobile-desktop)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
