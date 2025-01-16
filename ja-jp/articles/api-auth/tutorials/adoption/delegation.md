---
title: Delegation and the OIDC-conformant pipeline
topics:
  - api-authentication
  - oidc
  - delegation
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Delegation and the OIDC-Conformant Pipeline

<%= include('../../../_includes/_deprecate-delegation') %>

<%= include('./_about.md') %>

[Delegation](/api/authentication#delegation) is used for many operations, depending on your particular use case:

* Exchanging an ID Token issued to one application for a new one issued to a different application
* Using a <dfn data-key="refresh-token">Refresh Token</dfn> to obtain a fresh ID Token
* Exchanging an ID Token for a third-party API token, such as Firebase or AWS.

Given that [ID Tokens should no longer be used as API tokens](/api-auth/tutorials/adoption/api-tokens) and that [Refresh Tokens should be used only at the token endpoint](/api-auth/tutorials/adoption/refresh-tokens), this endpoint is now considered deprecated.

Applications marked as [OIDC-conformant](/api-auth/tutorials/adoption/oidc-conformant) cannot be the source or target of Auth0-to-Auth0 delegation requests.

## Third-party APIs (such as Firebase or AWS)

At the moment there is no OIDC-compliant mechanism to obtain third-party API tokens.
In order to facilitate a gradual migration to the new authentication pipeline, delegation can still be used to obtain third-party API tokens.
This will be deprecated in future releases.

## Keep reading

<%= include('./_index.md') %>
