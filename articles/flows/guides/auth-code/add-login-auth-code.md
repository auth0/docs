---
title: Add Login Using the Authorization Code Flow
description: Learn how to add login to your regular web application using the Authorization Code Flow.
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
  - regular-web-apps
contentType: tutorial
useCase:
  - add-login
---
# Add Login Using the Authorization Code Flow

::: note
This tutorial will help you add login to your regular web application using the Authorization Code Flow. If you want to learn how the flow works and why you should use it, see [Authorization Code Flow](/flows/concepts/auth-code). If you want to learn to call your API from a regular web app, see [Call Your API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code).
:::

Auth0 makes it easy for your app to implement the Authorization Code Flow using:

* [Regular Web App Quickstarts](/quickstart/webapp): The easiest way to implement the flow.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

Following successful login, your application will have access to the user's [ID Token](/tokens/concepts/id-tokens) and [Access Token](/tokens/concepts/access-tokens). The ID Token will contain basic user profile information, and the Access Token can be used to call the Auth0 /userinfo endpoint or your own protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/dashboard/guides/applications/register-app-regular-web). 
  * Select an **Application Type** of **Regular Web Apps**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include **Authorization Code**.


## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an `authorization_code`.
2. [Request Tokens](#request-tokens): 
Exchange your `authorization_code` for tokens.

Optional: [Explore Sample Use Cases](#sample-use-cases)


<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/request-tokens') %>

<%= include('./includes/sample-use-cases-add-login') %>

## Keep reading

- [OAuth 2.0 framework](/protocols/oauth2)
- [OpenID Connect (OIDC) protocol](/protocols/oidc)
- [Tokens](/tokens)

