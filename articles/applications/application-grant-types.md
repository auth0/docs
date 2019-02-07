---
description: Using the Grant Types property on Applications
toc: true
topics:
  - applications
  - grant-types
contentType: 
    - reference
    - concept
    - how-to
useCase:
  - build-an-app
---
# Application Grants Types

Application grant types (or _flows_) are methods by which you grant limited access to your resources to another entity without exposing credentials, and through which applications can gain [Access Tokens](). The [OAuth 2.0 protocol]() supports several types of grants, which allow different types of access.

Based on the needs of your application, some grant types are more appropriate than others. Auth0 provides many different authentication and authorization flows and allows you to indicate which grant types are appropriate based on the `grant_types` property of your Auth0-registered Application.

For example, let's say you are securing a mobile app. In this case, you'd use the [Authorization Code using Proof Key for Code Exchange (PKCE) Grant](/api-auth/grant/authorization-code-pkce).

Alternatively, if you were securing a client-side app (such as a mobile app that's *not* native), you'd use the [Implicit Grant](api-auth/grant/implicit).

::: note
Not sure which grant type is appropriate for your use case? Refer to [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use) for help.
:::

## Keep Reading

* Available Grant Types
* Auth0 Grant Types Mapping
* Legacy Grant Types
