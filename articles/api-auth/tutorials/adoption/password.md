---
title: OIDC-conformant Resource Owner Password Credentials exchange
topics:
  - api-authentication
  - oidc
  - resource-owner-password
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Resource Owner Password Credentials exchange

<%= include('./_about.md') %>

The [Resource Owner Password Credentials exchange](/api-auth/grant/password) is used by highly-trusted applications to provide active authentication. Unlike the authorization code and implicit grants, this authentication mechanism does not redirect users to Auth0. It authenticates users with a single request, exchanging their password credentials for a token.

This document describes the differences of this flow between the legacy and OIDC-conformant authentication pipelines.

## Authentication request

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  POST /oauth/ro HTTP 1.1
  Content-Type: application/json
  {
    "grant_type": "password",
    "client_id": "123",
    "username": "alice",
    "password": "A3ddj3w",
    "connection": "my-database-connection",
    "scope": "openid email favorite_color offline_access",
    "device": "my-device-name"
  }
  ```

  - The `device` parameter is only needed if [requesting a Refresh Token](/tokens/refresh-token) by passing the `offline_access` scope.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
  POST /oauth/token HTTP 1.1
  Content-Type: application/json
  {
    "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
    "client_id": "123",
    "username": "alice",
    "password": "A3ddj3w",
    "realm": "my-database-connection",
    "scope": "openid email offline_access",
    "audience": "https://api.example.com"
  }
  ```

  - The endpoint to execute token exchanges is `/oauth/token`.
  - [Auth0's own grant type](/api-auth/tutorials/password-grant#realm-support) is used to authenticate users from a specific connection (`realm`). The [standard OIDC password grant](/api-auth/tutorials/password-grant) is also supported, but it does not accept Auth0-specific parameters such as `realm`.
  - `favorite_color` is no longer a valid scope.
  - The `device` parameter is removed.
  - The `audience` parameter is optional.

  </code-block-tab>
</code-block>

## Authentication response

<code-block>
  <code-block-tab data-title="Legacy">

  ```text
  HTTP/1.1 200 OK
  Content-Type: application/json
  Cache-Control: no-store
  Pragma: no-cache
  {
      "access_token": "SlAV32hkKG",
      "token_type": "Bearer",
      "refresh_token": "8xLOxBtZp8",
      "expires_in": 3600,
      "id_token": "eyJ..."
  }
  ```

  - The returned Access Token is only valid for calling the [/userinfo endpoint](/api/authentication#get-user-info).
  - A Refresh Token will be returned only if a `device` parameter was passed and the `offline_access` scope was requested.

  </code-block-tab>
  <code-block-tab data-title="OIDC-conformant">

  ```text
  HTTP/1.1 200 OK
  Content-Type: application/json
  Cache-Control: no-store
  Pragma: no-cache
  {
      "access_token": "eyJ...",
      "token_type": "Bearer",
      "refresh_token": "8xLOxBtZp8",
      "expires_in": 3600,
      "id_token": "eyJ..."
  }
  ```

  - The returned Access Token is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses `RS256` as signing algorithm) and optionally the resource server specified by the `audience` parameter.
  - The ID Token will be forcibly signed using RS256 if requested by a [public application](/applications/application-types#public-applications).
  - A Refresh Token will be returned only if the `offline_access` scope was granted.

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
    "https://app.example.com/favorite_color": "blue"
  }
  ```

  - The ID Token will be forcibly signed using RS256 if requested by a [public application](/api-auth/application-types).
  - The `favorite_color` claim must be namespaced and added through a rule.

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

  - The returned Access Token is a JWT valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses `RS256` as signing algorithm) as well as the resource server specified by the `audience` parameter.
  - Note that an opaque Access Token could still be returned if /userinfo is the only specified audience.

  </code-block-tab>
</code-block>

## Standard password grant requests

The Auth0 password realm grant is not defined by standard OIDC, but it is suggested as an alternative to the legacy resource owner endpoint because it supports the Auth0-specific `realm` parameter. The [standard OIDC grant is also supported](/api-auth/tutorials/password-grant) when using OIDC authentication.

## Further reading

<%= include('./_index.md') %>
