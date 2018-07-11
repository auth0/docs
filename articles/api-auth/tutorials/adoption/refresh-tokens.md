---
title: OIDC-conformant Refresh Token use
topics:
  - api-authentication
  - oidc
  - tokens
  - refresh tokens
contentType: concept
useCase:
  - secure-api
  - call-api
---

# OIDC-conformant Refresh Tokens

<%= include('./_about.md') %>

There are some changes to how Refresh Tokens are used in the OIDC-conformant authentication pipeline:

* Using the [implicit grant](/api-auth/tutorials/adoption/implicit) for authentication will no longer return Refresh Tokens.
  Use [silent authentication](/api-auth/tutorials/silent-authentication) (such as `prompt=none`) instead.
* Refresh Tokens should only be used by [confidential applications](/applications/application-types#confidential-applications). However, they can also be used by Native (public) applications to obtain Refresh Tokens for mobile apps. 
* The `/delegation` endpoint is considered deprecated. To obtain new tokens from a Refresh Token, the `/oauth/token` endpoint should be used instead:

<code-block>
  <code-block-tab data-title="Legacy (delegation)">

  ```text
  POST /delegation
  Content-Type: 'application/json'
  {
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "client_id": "...",
    "refresh_token": "...",
    "scope": "openid profile"
  }
  ```

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant (token endpoint)">

  ```text
  POST /oauth/token
  Content-Type: application/json
  {
    "grant_type": "refresh_token",
    "refresh_token": "...",
    "client_id": "...",
    "client_secret": "...",
    "scope": "openid profile",
    "audience": "https://api.example.com"
  }
  ```

  - The `audience` and `client_secret` parameters are optional. The `client_secret` is not needed when requesting a `refresh_token` for a mobile app.

  </code-block-tab>
</code-block>

Please note that Refresh Tokens must be kept confidential in transit and storage, and they should be shared only among the authorization server and the client to whom the Refresh Tokens were issued.

## Further reading

<%= include('./_index.md') %>
