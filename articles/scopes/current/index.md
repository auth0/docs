---
title: Scopes
description: Understand the principle of scopes and explore general examples of their use.
topics:
  - scopes
  - permissions
contentType:
  - concept
  - index
useCase:
  - development
  - add-login
  - secure-api
  - call-api
---
# Scopes

::: note
Often, the concepts of scopes and permissions are unintentionally combined. For info about permissions and the distinction between permissions and scopes, see [Permissions](/authorization/concepts/permissions).
:::

_Scopes_ are used by an application to define the actions it would like to be allowed to do on a user's behalf.

Scopes only come into play in delegation scenarios and are limited in that they cannot allow an app to do more than what the user's privileges within the resource being accessed already allow them to do. To determine an application's effective permissions, an API should combine incoming scopes with the privileges assigned within its own internal access control system and make access control decisions accordingly.

If you don't want to create an internal access control system, you can build a [role-based access control (RBAC) system](/authorization/concepts/rbac) using our [Authorization core feature set or Authorization Extension](/authorization/concepts/core-vs-extension). In this case, the behavior of scopes are modified, and you can define [permissions](/authorization/concepts/permissions), assign them to roles or users, and pass assigned permissions in tokens.

## Ways to use scopes

When an app requests permission to access a resource through an authorization server, it uses the `scope` parameter to specify what scopes it needs, and the authorization server uses the `scope` parameter to respond with the scopes that were actually granted (if the granted scopes were different from what was requested).

Generally, you use scopes in three ways:

* From an [application](/applications), to verify the identity of a user and get basic profile information about the user, such as their email or picture. In this scenario, the scopes available to you include those implemented by the [OpenID Connect](/protocols/oidc) protocol. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

* In an [API](/apis), to implement access control. In this case, you need to define custom scopes (or permissions, if using our [Authorization core feature set or Authorization Extension](/authorization/concepts/core-vs-extension)) for your API and then identify them so that calling applications can use them. For details, refer to [API Scopes](/scopes/current/api-scopes).

* From an application, to call an API that has implemented its own custom scopes. In this case, you need to know which custom scopes are defined for the API you are calling. For an example of calling a custom API from an application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access)

## Best practices

Understand your use case and choose the most restrictive scopes possible. 

If you are requesting scopes, make sure you ask for enough access for your application to function, but only request what you absolutely need. Are you establishing a user's identity or asking the user to allow you to interact with their data? There's a big difference between importing a user's Facebook profile information and posting to their wall. By only requesting what you need, you are more likely to gain user consent when required since users are more likely to grant access for limited, clearly-specified scopes. 

Similarly, when creating custom scopes for an API, consider what levels of granular access applications may need and design accordingly.

## Requested scopes versus granted scopes

In certain cases, users get to consent to the access being requested. While usually the scopes returned will be identical to those requested, users can edit granted scopes (both during initial consent and sometimes after, depending on the resource), thereby granting an app less access than it requested. 

As an application developer, you should be aware of this possibility and handle these cases in your app. For example, your app could warn the user that they will see reduced functionality. It could also send the user back through the authorization flow to ask for additional permissions. But again, remember that when asked for consent, users can always say no.

::: note
By default, Auth0 skips user consent for first-party applications, which are applications that are registered under the same Auth0 domain as the API they are calling; however, you can configure your API in Auth0 to require user consent from first-party applications. Third-party applications, which are external applications, require user consent.
:::

## Keep reading

- [OpenID Connect Scopes](/scopes/current/oidc-scopes)
- [API Scopes](/scopes/current/api-scopes)
- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Restrict Access to APIs](/api-auth/restrict-access-api)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)
