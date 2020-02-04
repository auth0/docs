---
description: List of breaking changes for OIDC-conformant applications
topics:
  - api-authentication
  - oidc
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC-Conformant Applications

<%= include('./_about.md') %>

In order to make the transition to the [OIDC-conformant authentication pipeline](/api-auth/tutorials/adoption) more predictable, applications now include an option called "OIDC Conformant", available under **Advanced Settings > OAuth**:

![OIDC-conformant application setting](/media/articles/dashboard/oidc_conformant.png)

The objective of this flag is to disable as many legacy features as possible, so you can run into the OIDC-conformant pipeline's breaking changes at configuration time rather than run time.
Enabling this flag on an application will have the following effects:

* The following features are deprecated in favor of [silent authentication](/api-auth/tutorials/adoption/implicit):
    - <dfn data-key="refresh-token">Refresh Tokens</dfn> on authentication with the [implicit grant](/api-auth/tutorials/adoption/implicit)
    - /ssodata endpoint and `getSSOData()` method from Lock/auth0.js
* <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/api-auth/tutorials/adoption/single-sign-on)</dfn> can only be performed from Auth0 login pages.
* Using `response_type=token` will only return an <dfn data-key="access-token">Access Token</dfn>, not an ID Token. Use `response_type=id_token` or `response_type=token id_token` instead.
* ID Tokens obtained with the implicit grant will be signed asymmetrically using RS256.
* The /tokeninfo endpoint is disabled.
* Responses from /userinfo will [conform to the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse), similar to the [contents of ID Tokens](/api-auth/tutorials/adoption/scope-custom-claims)
* Implicit grant authentication requests made without a <dfn data-key="nonce">[`nonce` parameter](/api-auth/tutorials/nonce)</dfn> will be rejected.
* [Refresh Tokens must be used at the token endpoint]() instead of /delegation.
* The `device` parameter, originally used to obtain Refresh Tokens, is now considered invalid.
* The legacy [resource owner endpoint](/api/authentication#database-ad-ldap-active-) is disabled.
    - <dfn data-key="passwordless">Passwordless</dfn> authentication for embedded login is implemented at this endpoint, so it will be disabled as well. 
* The [/oauth/access_token endpoint](/api/authentication#post-oauth-access_token), used for social authentication from native mobile applications, is disabled.
  An OIDC-conformant alternative will be added in future releases.
* The [`scope` parameter of authentication requests](/api-auth/tutorials/adoption/scope-custom-claims) will comply to the OIDC specification:
    - Custom claims must be [namespaced](/tokens/guides/create-namespaced-custom-claims) and added to ID Tokens or Access Tokens via rules.
    - The namespace identifiers for custom claims must be **HTTP** or **HTTPS** URIs.
    - Custom <dfn data-key="scope">scope</dfn> values can be defined by a [resource server (API)](/api-auth/tutorials/adoption/api-tokens).
* OIDC-conformant applications cannot be the source or target application of a [delegation request](/api-auth/tutorials/adoption/delegation).

## I don't want to make all these changes at once!

The "OIDC Conformant" flag will force all of these changes at the same time for a given application, but it's not the only option to gradually transition to the OIDC-conformant authentication pipeline.
Any authentication requests made with an <dfn data-key="audience">`audience`</dfn> parameter will use the new pipeline, and all other requests will continue to work as usual.

If your application doesn't need a resource server but you want opt-in to the new pipeline on a per-request basis, you can use the following `audience` parameter:

```
https://${account.namespace}/userinfo
```

## Keep reading

<%= include('./_index.md') %>
