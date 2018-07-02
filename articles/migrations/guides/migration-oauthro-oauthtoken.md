---
title: Migration Guide for Resource Owner Password Credentials Exchange
description: Learn how to migrate your API calls and responses from /oauth/ro to /oauth/token
toc: true
contentType:
  - concept
useCase:
  - secure-an-api
  - migrate
---
# Migration Guide for Resource Owner Password Credentials Exchange

Support for Resource Owner Password was added to [oauth/token](/api/authentication#authorization-code) and usage of the [oauth/ro](/api/authentication#resource-owner) endpoint will be deprecated at some point in the future.

## Does this affect me ?

This guide is for users who use the resource owner password credentials exchange, and call /oauth/ro directly, without the use of any Auth0 libraries or SDKs. The major Auth0 libraries such as [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js) have already been updated to stop using /oauth/ro internally. If you use the `lock-passwordless` library, you can now use [Passwordless Mode](/libraries/lock/v11#passwordless) in Lock v11 instead.

## Changes to requests

Previously, the payload of a request to /oauth/ro looked similar to this:

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

* The endpoint to execute token exchanges is now /oauth/token
* [Auth0's own grant type](/api-auth/tutorials/password-grant#realm-support) is used to authenticate users from a specific connection (or `realm`). 
* Auth0 supports the [standard OIDC scopes](/scopes/current#openid-connect-scopes), along with the scopes which you have defined in your [custom API](/api-auth/apis).
* A scope that doesn't fit in one of these categories, such as the above `favorite_color`, is no longer a valid scope.
* The `device` parameter is removed.
* The `audience` parameter is optional.

Here is an example of the payload of a request to /oauth/token:

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

* The grant type is specified here as `password-realm`, rather than the standard `password`. 
* The parameters `client_id`, `username`, and `password` are unchanged. 
* The `realm` is included because we are using Password Realm grant type, and replaces the `connection` parameter from previous calls. 
* The `scope` parameter is mostly the same, but does not accept non-OIDC values. 
* The `audience` parameter can be added, indicating the API audience the token will be intended for.

## Changes to responses

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

* The returned Access Token is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses RS256 as signing algorithm) and optionally the [custom API](/api-auth/apis) if one was specified.
* The ID Token will be forcibly signed using RS256 if requested by a [public client](/clients/client-types#public-clients).
* A Refresh Token will be returned only if the `offline_access` scope was granted and the API has **Allow offline access** set.

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

### Verifying your migration

Once you have migrated your codebase, if you would like to be sure that your applications are no longer calling the legacy endpoint, you can go to the [Dashboard](${manage_url}/#/tenant/advanced) under **Tenant Settings > Advanced** then scroll down to **Migrations** and toggle off the Legacy /oauth/ro Endpoint switch. Turning off this switch will disable the deprecated endpoint for your tenant, preventing it from being used at all.

![Legacy Migration Toggles](/media/articles/libraries/lock/migration-toggles.png)

If turning this switch off results in failed logins, this is a sign that you have yet to completely remove all instances of legacy code from your applications.

Once migrations have been successfully performed in production environments, the switch can be toggled off and left off, to ensure that the deprecated features can no longer be used.