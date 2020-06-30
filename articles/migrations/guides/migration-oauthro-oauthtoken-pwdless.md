---
title: Migration Guide for Resource Owner Passwordless Authentication
description: Learn how to migrate your Passwordless API calls and responses from /oauth/ro to /oauth/token
toc: true
contentType:
  - concept
useCase:
  - secure-an-api
  - migrate
---
# Migration Guide for Resource Owner Passwordless Credentials Exchange

Support for Resource Owner Password was added to [/oauth/token](/api/authentication#authorization-code). Usage of the [/oauth/ro](/api/authentication#resource-owner) endpoint was deprecated on July 08, 2017. This endpoint was used to exchange an OTP received by the end-user by email or SMS with for an `id_token` and an `access_token`. 

We have implemented a new API that replaces `oauth/ro` for this use case, and we recommend customers to migrate to the new implementation.

## Does this affect me ?

This change affects you if you use the resource owner passwordless credentials exchange and call `/oauth/ro` directly without the use of any Auth0 libraries or SDKs. 

<%= include('./_forced-logouts.md') %>

## Changes to requests

Previously, the payload of a request to `/oauth/ro` looked similar to this:

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

These are the changes for the new implementation:

* The endpoint to execute token exchanges is now `/oauth/token`
* [Auth0's own grant type](/api-auth/tutorials/password-grant#realm-support) is used to authenticate users from a specific connection (or `realm`). 
* Auth0 supports the [standard OIDC scopes](/scopes/current/oidc-scopes), along with the <dfn data-key="scope">scopes</dfn> which you have defined in your [custom API](/api-auth/apis).
* A scope that does not fit in one of these categories, such as the above `favorite_color`, is no longer a valid scope.
* The `device` parameter is removed.
* The <dfn data-key="audience">`audience`</dfn> parameter is optional.

Here is an example of the payload of a request to `/oauth/token`:

```json
{
  "grant_type" : "http://auth0.com/oauth/grant-type/passwordless/otp",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET", // only for web apps, native apps don’t have a client secret
  "username": "<email address>", // or "<phone number>"
  "otp": "CODE",
  "realm": "email", // or "sms" 
  "audience" : "your-api-audience", // in case you need an access token for a specific API
  "scopes": "openid profile email" // whatever scopes you need
}
```

* The grant type is specified here as `http://auth0.com/oauth/grant-type/passwordless/otp`
* The parameters `client_id` and `username` are unchanged.
* The `client_secret` needs to be specified for confidential clients (e.g. regular web apps).
* The one-time password needs to be sent in the `otp` parameter instead of the `password` parameter.
* The `realm` is used to identify the connection, and replaces the `connection` parameter from previous calls.
* The `scope` parameter is mostly the same, but does not accept non-OIDC values.
* The `audience` parameter can be added, indicating the API audience the token will be intended for.

## Changes to responses

Responses from `/oauth/ro` were similar in format to the following:

```json
{
  "access_token": "SlAV32hkKG",
  "token_type": "Bearer",
  "refresh_token": "8xLOxBtZp8",
  "expires_in": 3600,
  "id_token": "eyJ..."
}
```

* The returned <dfn data-key="access-token">Access Token</dfn> is valid for calling the [/userinfo endpoint](/api/authentication#get-user-info) (provided that the API specified by the `audience` param uses RS256 as [signing algorithm](/tokens/concepts/signing-algorithms)) and optionally the [custom API](/api-auth/apis) if one was specified.
* The ID Token will be forcibly signed using RS256 if requested by a [public client](/clients/client-types#public-clients).
* A <dfn data-key="refresh-token">Refresh Token</dfn> will be returned only if the `offline_access` scope was granted and the API has **Allow offline access** set.

Here is an example of the response from `/oauth/token`:

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "refresh_token": "8xLOxBtZp8",
  "expires_in": 3600,
  "id_token": "eyJ..."
}
```

## Code changes when using the SDKs

If your application uses the Auth0 native libraries for Android or iOS, be sure that the version of the library you are including is at least the minimum listed below (or higher). Also, be sure to set the 'OIDC Conformant' flag to `true` when configuring the libraries.

|Library|Minimum Version|
|---|---|
|[Android SDK](/libraries/auth0-android/passwordless)|1.2| 
|[Lock Android](/libraries/lock-android/passwordless)|2.17|
|[Swift SDK](/libraries/auth0-swift/passwordless)|1.20.0|
|[Lock iOS](/libraries/lock-ios/passwordless)|2.14.0|

## Verifying your migration

Once you have migrated your codebase, if you would like to be sure that your applications are no longer calling the legacy endpoint.

You can verify whether you are still using the deprecated endpoint by checking the [tenant logs](${manage_url}/#/logs), filtering by "Deprecation Notice" and check for logs saying "oauth/ro passwordless: This feature is being deprecated". You can also perform this search directly with the following query: `type:depnote AND description:*passwordless*`.

Once you made sure your applications are not calling the endpoint, you can go to the [Dashboard](${manage_url}/#/tenant/advanced) under **Tenant Settings > Advanced** then scroll down to **Migrations** and toggle off the Legacy `/oauth/ro` Endpoint switch. Turning off this switch will disable the deprecated endpoint for your tenant, preventing it from being used at all.

![Legacy Migration Toggles](/media/articles/libraries/lock/migration-toggles.png)

