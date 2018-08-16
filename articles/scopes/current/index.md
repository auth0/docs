---
title: Scopes
description: Overview of scopes
toc: true
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

The OAuth 2.0 protocol is a delegated authorization mechanism, where an application requests access to resources controlled by the user (the resource owner) and hosted by an API (the resource server), and the authorization server issues the application a more restricted set of credentials than those of the user.

The **scope** parameter allows the application to express the desired scope of the access request. The **scope** parameter can also be used by the authorization server in the response to indicate which scopes were actually granted (if they are different than the ones requested).

You can use scopes to:

- Let an application authenticate users and get additional information about them, such as their email or picture. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

- Implement granular access control to your API. In this case, you need to define [custom scopes (claims)](/scopes/current/custom-claims) for your API and add these newly-created scopes to your `scope` request parameter: `scope=read:contacts`. For details, refer to [API Scopes](/scopes/current/api-scopes).