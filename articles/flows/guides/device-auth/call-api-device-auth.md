---
title: Call API Using Device Authorization Flow
description: Learn how to call your API from an input-constrained device using the Device Authorization flow.
toc: true
topics:
  - api-authentication
  - oidc
  - device-authorization
  - native-apps
  - desktop-apps
  - mobile-apps
  - devices
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Call Your API Using the Device Authorization Flow

::: note
This tutorial will help you call your own API from an input-constrained device using the Device Authorization Flow. If you want to learn how the flow works and why you should use it, see [Device Authorization Flow](/flows/concepts/device-auth).
:::

Auth0 makes it easy for your app to implement the Device Authorization flow using:

* Authentication API: Keep reading to learn how to call our API directly. For an interactive experience, see our [Device Flow Playground](https://auth0.github.io/device-flow-playground/).

## Prerequisites

**Before beginning this tutorial:**

* [Register the Application with Auth0](/dashboard/guides/applications/register-app-native). 
  * Select an **Application Type** of **Native**.
  * Add an **Allowed Callback URL** of **`YOUR_CALLBACK_URL`**. Your callback URL format will vary depending on your platform. For details about the format for your platform, see our [Native/Mobile Quickstarts](/quickstart/native).
  * Make sure the Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Device Code**.

* [Register your API with Auth0](/architecture-scenarios/mobile-api/part-2#create-the-api)
  * If you want your API to receive [Refresh Tokens](/tokens/refresh-token) to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

## Steps

1. [Request device code](#request-device-code): Request a device code that the user can use to authorize the device.
2. [Request Tokens](#request-tokens): 
Poll the token endpoint to request a token.
3. [Authorize the user](#authorize-the-user): 
Request the user's authorization, so the device can receive a token.
4. [Call Your API](#call-your-api):
Use the retrieved Access Token to call your API.
5. [Refresh Tokens](#refresh-tokens):
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
- [New Tenant Logs for Devices](/logs#log-data-event-listing)
:::


## Steps

1. Authorization request
2. Token request
3. Authorization server requirements
4. Security considerations

::: note
Device application developers can send user agent information in the "user-agent."
:::

::: note
TLS ciphers
:::