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
# Application Grant Types

Auth0 provides many different authentication and authorization flows to suit your needs. For example, if you are securing a mobile app, you'd use the [Authorization Code using Proof Key for Code Exchange (PKCE) OAuth 2.0 Grant](/api-auth/grant/authorization-code-pkce), or if you're securing a client-side app (such as a mobile app that's *not* native), you'd use the [Implicit Grant](api-auth/grant/implicit).

However, you might want to limit the use of certain flows (which we'll refer to as "grant types" in this doc) depending on the type of app you're securing. You can set and manage these limitations using the `grant_types` property that each Application has.

In this doc, we'll talk about:

* What grant types are
* The grant types available
* How to set the Applications's `grant_type` property
* What grant types are available based on the Applications's `grant_type` property value

## What Grant Types Are

OAuth 2.0 is a protocol that allows you to grant limited access to your resources to another entity without exposing credentials. By using Auth0, you can support different OAuth 2.0 flows without worrying about the technical aspects/implementation.

OAuth 2.0 supports several types of grants, which are methods by which you can gain Access Tokens (string values that represent the permissions granted). Different grant types allow different types of access, and based on the needs of your app, some grant types are more appropriate than others. Auth0 allows you to indicate which sets of permissions are appropriate based on the `grant_type` property.

::: note
Not sure which grant type is appropriate for your use case? Refer to [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use) for help.
:::





