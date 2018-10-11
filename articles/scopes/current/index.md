---
title: Scopes
description: Overview of scopes
topics:
  - scopes
contentType:
  - reference
  - concept
  - index
useCase:
  - development
---
# Scopes

The OAuth 2.0 protocol is a delegated authorization mechanism, where an application requests access to resources controlled by the user (the resource owner) and hosted by an API (the resource server). The authorization server issues the application a more restricted set of credentials than those of the user in the form of an Access Token.

The permissions represented by the Access Token in OAuth 2.0 terms are known as scopes. The `scope` parameter allows the application to express the desired scope of the access request. The `scope` parameter can also be used by the authorization server in the response to indicate which scopes were actually granted (if they are different than the ones requested).

You can use scopes to:

- Let an application verify the identity of a user (by using [Open ID Connect](/protocols/oidc)) and get basic profile information about the user, such as their email or picture. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

- Implement granular access control to your API. In this case, you need to define [custom scopes](/scopes/current/api-scopes) for your API and add these newly-created scopes to your `scope` request parameter: `scope=read:contacts`.
