---
title: Application Grant Types
description: Learn about the concept of grant types and how they relate to applications.
toc: true
topics:
  - applications
  - grant-types
contentType: 
  - concept
useCase:
  - build-an-app
---
# Application Grant Types

Application grant types (or _flows_) are methods through which applications can gain [Access Tokens](/tokens/access-tokens) and by which you grant limited access to your resources to another entity without exposing credentials. The [OAuth 2.0 protocol](/protocols/oauth2) supports several types of grants, which allow different types of access.

Based on the needs of your application, some grant types are more appropriate than others. Auth0 provides many different authentication and authorization flows and allows you to indicate which grant types are appropriate based on the `grant_types` property of your Auth0-registered Application.

For example, let's say you are securing a mobile app. In this case, you'd use the [Authorization Code using Proof Key for Code Exchange (PKCE) Grant](/flows/concepts/auth-code-pkce).

Alternatively, if you were securing a client-side app (such as a single-page app), you'd use the [Implicit Grant](/flows/concepts/implicit).

::: note
Not sure which grant type is appropriate for your use case? Refer to [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use) for help.
:::

## Keep Reading

* To learn which grant types are available in Auth0, see [Available Grant Types](/applications/reference/grant-types-available).
* To learn which grant types are available based to different application types, see [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
* Learn how to [update an application's grant types using the Auth0 Dashboard](/dashboard/guides/applications/update-grant-types) or the [Management API](/api/management/guides/applications/update-grant-types).
* For info on working with legacy grant types and their alternatives, see [Legacy Grant Types](/applications/concepts/grant-types-legacy)
