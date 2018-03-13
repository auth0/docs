---
title: Migrating From /oauth/ro to /oauth/token
description: Learn how to migrate your API calls and responses from /oauth/ro to /oauth/token
toc: true
---
# Migration Guide for Resource Owner Password Credentials Exchange

The Resource Owner Password Credentials exchange is used by highly-trusted clients to provide active authentication. Unlike the authorization code and implicit grants, this authentication mechanism does not redirect users to Auth0. It authenticates users with a single request, exchanging their password credentials for a token. This document describes the differences of this flow between the legacy and OIDC-conformant authentication pipelines.

Note that this guide is for users who use the resource owner password credentials exchange, and call /oauth/ro directly, without the use of any Auth0 libraries or SDKs. The major Auth0 libraries such as [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) have already been updated to stop using /oauth/ro. If you use the `lock-passwordless` library, you can now use [Passwordless Mode](/libraries/lock/v11#passwordless) in Lock v11 instead.

## Alter Your Requests

Previously, requests to /oauth/ro looked similar to this:

```json
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

### Changes to Requests

* The endpoint to execute token exchanges is now /oauth/token
* [Auth0's own grant type](/api-auth/tutorials/password-grant#realm-support) is used to authenticate users from a specific connection `realm`. The [standard OIDC password grant](/api-auth/tutorials/password-grant) is also supported, but it does not accept Auth0-specific parameters such as `realm`.
* `favorite_color` is no longer a valid scope.
* The `device` parameter is removed.
* The `audience` parameter is optional.

Here is an example of a request to /oauth/token:

```json
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

Note that the grant type is specified here as `http://auth0.com/oauth/grant-type/password-realm`, rather than `http://auth0.com/oauth/grant-type/password-grant`. The parameters `client_id`, `username`, and `password` are unchanged. The `realm` is included because we are using Password Realm grant type, and replaces the `connection` parameter from previous calls. The `scope` parameter is mostly the same, but does not accept non-OIDC values. Finally, the `audience` parameter can be added, indicating the API audience the token will be intended for.

## Alter Your Response Handling

Responses from `oauth/ro` were similar in format to the following:

```json
{
  "access_token": "SlAV32hkKG",
  "token_type": "Bearer",
  "refresh_token": "8xLOxBtZp8",
  "expires_in": 3600,
  "id_token": "eyJ..."
}
```

### Changes to Responses

* The returned Access Token is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses RS256 as signing algorithm) and optionally the resource server if one was specified.
* The ID Token will be forcibly signed using RS256 if requested by a [public client](/clients/client-types#public-clients).
* A Refresh Token will be returned only if the `offline_access` scope was granted.

Here is an example of the OIDC conformant response from `oauth/token`:

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "refresh_token": "8xLOxBtZp8",
  "expires_in": 3600,
  "id_token": "eyJ..."
}
```
