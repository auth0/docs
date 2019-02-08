---
title: Add Login to Regular Web Applications
description: Learn how to add login to your application using the regular web app login flow.
toc: true
topics:
  - api-authentication
  - oidc
  - authorization-code
contentType: tutorial
useCase:
  - add-login
---
# Add Login Using the Regular Web App Login Flow

::: note
This tutorial will help you add login to your regular web application using the regular web app login flow. If you want to learn how the flow works and why you should use it, see [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow). If you want to learn to call your API from a regular web app, see [Call Your API Using the Regular Web App Login Flow](/flows/guides/regular-web-app-login-flow/call-api-using-regular-web-app-login-flow).
:::

Auth0 makes it easy for your app to implement the regular web app login flow using:

* [Regular Web App Quickstarts](/quickstart/webapp): The easiest way to implement the regular web app flow.
* Authentication API: If you prefer to roll your own, keep reading to learn how to call our API directly.

Following successful login, your application will have access to the user's [ID Token](/tokens/id-token) and [Access Token](/tokens/overview-access-tokens). The ID Token will contain basic user profile information, and the Access Token can be used to call the Auth0 /userinfo endpoint or your own protected APIs.

## Prerequisites

**Before beginning this tutorial:**

* [Register your Application with Auth0](/applications/webapps). 
  * Select an **Application Type** of **Regular Web Apps**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/applications/application-grant-types#how-to-edit-the-application-s-grant_types-property)** include **Authorization Code**.


## Steps

1. [Authorize the user](#authorize-the-user): 
Request the user's authorization and redirect back to your app with an `authorization_code`.
2. [Request Tokens](#request-tokens): 
Exchange your `authorization_code` for tokens.

Optional: [Explore Sample Use Cases](#sample-use-cases)


<%= include('./includes/authorize-user-add-login') %>

<%= include('./includes/request-tokens') %>

<%= include('./includes/sample-use-cases-add-login') %>


## Keep Reading

::: next-steps
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
:::
