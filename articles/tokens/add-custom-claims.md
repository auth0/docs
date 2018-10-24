---
description: How to add custom claims to tokens using Rules
topics:
  - tokens
  - access-tokens
  - id-tokens
  - custom-claims
  - scopes
  - claims
  - namespaces
contentType:
  - how-to
useCase:
  - invoke-api
---

# Add Custom Claims to Tokens

You can add custom claims to your [Access Tokens](/tokens/overview-access-tokens) or [ID Tokens](/tokens/id-token) using [Rules](/rules). The claim name must conform to a namespaced format to avoid possible collisions with standard OIDC claims. 

The format you should follow is:  `http://my-namespace/claim-name`.

::: note
You cannot use the following Auth0 namespaces: 
* `auth0.com`
* `webtask.io`
* `webtask.run` 
:::

## Keep reading

* [User Profile Claims and Scope](/api-auth/tutorials/adoption/scope-custom-claims#custom-claims)
* [Open ID Standard OIDC Claims Specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

