---
title: OIDC-conformant Implicit grant
topics:
  - api-authentication
  - oidc
  - implicit
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Implicit grant

<%= include('./_about.md') %>

The [Implicit grant](/api-auth/grant/implicit) is used by applications that are incapable of securely storing secrets, such as single-page JavaScript applications.
This document describes the differences of this flow between the legacy and OIDC-conformant authentication pipelines.

## Authentication request

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  GET /authorize?
    response_type=token
    &scope=openid email favorite_color offline_access
    &client_id=123
    &state=af0ifjsldkj
    &redirect_uri=https://app.example.com
    &device=my-device-name
  ```

  - The `device` parameter is only needed if [requesting a Refresh Token](/tokens/refresh-token) by passing the `offline_access` scope.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
  GET /authorize?
    response_type=token id_token
    &scope=openid email
    &client_id=123
    &state=af0ifjsldkj
    &nonce=jxdlsjfi0fa
    &redirect_uri=https://app.example.com
    &audience=https://api.example.com
  ```

  - This `response_type` parameter indicates that we want to receive both an Access Token and ID Token.
  - Refresh Tokens are not allowed in the implicit grant. [Use `prompt=none` instead](/api-auth/tutorials/silent-authentication).
  - `favorite_color` is no longer a valid scope.
  - The `audience` parameter is optional.
  - The `nonce` parameter must be a [cryptographically secure random string](/api-auth/tutorials/nonce).

  </code-block-tab>
</code-block>

## Authentication response

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  HTTP/1.1 302 Found
  Location: https://app.example.com/#
      access_token=SlAV32hkKG
      &expires_in=86400
      &state=af0ifjsldk
      &id_token=eyJ...
      &refresh_token=8xLOxBtZp8
      &token_type=Bearer
  ```

  - The returned Access Token is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info).
  - A Refresh Token will be returned only if a `device` parameter was passed and the `offline_access` scope was requested.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
  HTTP/1.1 302 Found
  Location: https://app.example.com/#
      access_token=eyJ...
      &expires_in=86400
      &state=af0ifjsldk
      &id_token=eyJ...
      &token_type=Bearer
  ```

  - The returned Access Token is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses `RS256` as signing algorithm) and optionally the resource server specified by the `audience` parameter.
  - If using `response_type=id_token`, Auth0 will only return an ID Token.
  - Refresh Tokens are not allowed in the implicit grant. [Use `prompt=none` instead](/api-auth/tutorials/silent-authentication).

  </code-block-tab>
</code-block>

## ID Token structure

<code-block>
  <code-block-tab data-title="Legacy">

  ```json
  {
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "favorite_color": "blue"
  }
  ```

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```json
  {
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": "123",
    "exp": 1482809609,
    "iat": 1482773609,
    "email": "alice@example.com",
    "email_verified": true,
    "https://app.example.com/favorite_color": "blue",
    "nonce": "jxdlsjfi0fa"
  }
  ```

  - The `favorite_color` claim must be namespaced and added through a rule.
  - After validating the ID Token, the application must [validate the nonce to mitigate replay attacks](/api-auth/tutorials/nonce).

  </code-block-tab>
</code-block>

## Access Token structure (optional)

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  SlAV32hkKG
  ```

  - The returned Access Token is opaque and only valid for calling the [/userinfo endpoint](/api/authentication#get-user-info).

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```json
  {
    "sub": "auth0|alice",
    "iss": "https://${account.namespace}/",
    "aud": [
        "https://api.example.com",
        "https://${account.namespace}/userinfo"
    ],
    "azp": "123",
    "exp": 1482816809,
    "iat": 1482809609,
    "scope": "openid email"
  }
  ```

  - The returned Access Token is a JWT valid for calling the [/userinfo endpoint](/api/authentication#get-user-info)(provided that the API specified by the `audience` param uses `RS256` as signing algorithm) as well as the resource server specified by the `audience` parameter.
  - Note that an opaque Access Token could still be returned if /userinfo is the only specified audience.

  </code-block-tab>
</code-block>

## Further reading

<%= include('./_index.md') %>
