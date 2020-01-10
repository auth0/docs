---
title: ID Token Structure
description: Describes how ID Tokens conform to the JWT standard and contain JWT claims asserted about the token itself, standard OIDC claims about the authenticated user, and custom claims that you define, control, and add to a token using a rule.
topics:
  - tokens
contentType:
  - reference
useCase:
  - invoke-api
  - secure-api
  - add-login
---
# ID Token Structure

ID Tokens follow the <dfn data-key="json-web-token">[JSON Web Token (JWT)](/tokens/concepts/jwts)</dfn> standard, which means that their basic structure conforms to the typical [JWT Structure](/tokens/references/jwt-structure), and they contain standard [JWT Claims](/tokens/concepts/jwt-claims) asserted about the token itself.

However, beyond what is required for JWT, ID Tokens also contain claims asserted about the authenticated user, which are pre-defined by the [OpenID Connect (OIDC)](/protocols/oidc) protocol, and are thus known as standard OIDC claims. Some standard OIDC claims include:

* `name`
* `nickname`
* `picture`
* `email`
* `email_verified`

For a full list of standard OIDC claims, see [OIDC specification: Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

You control which OIDC claims are included in the ID Token consumed by your application by including specific [OpenID Connect Scopes](/scopes/oidc-scopes) in a parameter when you request tokens while authenticating users. To learn how to request an ID Token, see [Get ID Tokens](/tokens/guides/get-id-tokens).

::: note 
You can also create [custom claims](/tokens/concepts/jwt-claims#custom-claims), which are claims that you define, control, and add to a token using a [rule](/rules). 
:::

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Get ID Tokens](/tokens/guides/get-id-tokens)
* [Store Tokens](/tokens/guides/store-tokens)
* [Validate ID Tokens](/tokens/guides/validate-id-tokens)
* [Revoke Tokens](/tokens/guides/revoke-tokens)
