---
title: Custom Claims
description: Understand custom claims and how they function in Auth0.
topics:
  - scopes
  - claims
contentType:
  - concept
useCase:
  - development
  - add-login
  - call-api
  - secure-api
---
# Custom Claims

Custom claims are claims that you define, control, and add to a [token](/tokens) using a [rule](/rules). For example, you may want to add a user's email address to an Access Token and use that to uniquely identify the user, or you may want to add custom information stored in an Auth0 user profile to an ID Token.

Remember that all claims included in a token must have unique names. To keep your custom claims from colliding with the OpenID Connect (OIDC) [standard claims](/scopes/current/oidc-scopes#standard-claims), you must give them an identifier that [conforms to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). For example, your custom claim could be named `http://www.myexample.com/favorite_color`. 

::: warning
Auth0 always enforces namespacing; any custom claims with non-namespaced identifiers will be silently excluded from tokens.
:::

Some guidelines:

* The namespace URL does not have to point to an actual resource because it's only being used as an identifier; it will not be called.
* Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used.

::: warning
`auth0.com`, `webtask.io` and `webtask.run` are Auth0 domains and therefore cannot be used as a namespace identifier.
:::

For an example showing how to add custom claims to a token, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token).


## Refresh tokens and custom claims

As long as your rule is in place, the custom claims it adds will appear in new tokens issued when using a [Refresh Token](/tokens/refresh-token/current). Although new tokens do not automatically inherit custom claims, rules run during the refresh token flow, so the same code will be executed. This allows you to add or change custom claims in newly-issued tokens without forcing previously-authorized applications to obtain a new refresh token.

## Keep reading

* [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token)
