---
title: Access Token
description: This page explains an overview about Auth0 access tokens.
---

# Access Token

## Overview

The Access Token, commonly referred to as `access_token` in code samples, is a credential that can be used by a client to access an API. The `access_token` should be used as a `Bearer` credential and transmitted in an HTTP `Authorization` header to the API. Auth0 uses access tokens to protect access to the Auth0 Management API.

Auth0 generates access tokens in [JSON Web Token (JWT)](/jwt) format, an industry standard. JWTs contain three parts: a header, a set of claims, and a signature:
- The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
- The set of claims contains verifiable security statements such as the identity of the user and the permissions they are allowed.
- The signature is used to validate that the token is trustworthy and has not been tampered with.

::: panel-info Opaque token format
The [Auth0 Management API v1](/api/management/v1) (which has been deprecated) uses an opaque token format in which claims are referenced in a separate database, rather than directly in the token.
:::

## How to get an access token

Access tokens are issued via Auth0's OAuth 2.0 endpoints: [/authorize](/api/authentication#authorize-client) and [/oauth/token](/api/authentication#get-token). You can use any OAuth 2.0-compatible library to obtain access tokens. If you do not already have a preferred OAuth 2.0 library, Auth0 provides libraries for many languages and frameworks that work seamlessly with our endpoints.

* Calls to the Lock widget will return an `access_token` as shown in the [Lock documentation](/libraries/lock).
* [Examples using auth0.js](https://github.com/auth0/auth0.js).
* Check the [List of tutorials](/tutorials) to see how to make calls to libraries for other languages/SDKs.

## How to use an access token

Access tokens are typically obtained in order to access user-owned resources. For example, a Calendar client needs access to a Calendar API in the cloud in order to read the user's scheduled events and create new events.

Such access is requested by the client and granted by the user, using the [Authorize endpoint](/api/authentication#authorize-client).

```text
https://${account.namespace}/authorize?
  audience=api.calendar&
  scope=read write&
  response_type=token&
  client_id={account.clientId}&
  redirect_uri=${account.callback}&
  nonce={CRYPTOGRAPHIC_NONCE}
  state={OPAQUE_VALUE}
```

In this case the user will be prompted to permit read and write access (`scope=read write`). If allowed, an access token will be issued to the client, which the client can then use when making requests to the Calendar API. If consent has already been granted by the user, no consent dialog will be displayed and the access token will be issued without additional prompts.

Also, the consent dialog might be displayed again if the access level changes. For example, if the user has granted read access but the functionality changes so write access is required as well, the user will have to use the consent dialog to grant the additional access.

In some cases, consent can also be pre-configured administratively. This typically occurs when the user is an employee, and there are a set of company-specific applications that are always allowed access to employee data.

### Server-to-server interactions

Access tokens can also be issued directly to clients. Such scenarios involve server-to-server interactions. In this case the user does not need to authenticate.

For example, a reverse geocoding API that accepts latitude/longitude coordinates and returns a readable place name does not access user-owned data. In such cases a backend server needs to call the geocoding API in order to perform the translation.

Server-to-server access tokens can be obtained using the [Client Credentials flow](/api-auth/grant/client-credentials). In order to get a token using this flow, the client has to provide its credentials (`client_id`, `client_secret`).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"https://api.example.com/geocoding/v1/\"}"
  }
}
```

The result will be an access token that can be used to make requests to the geocoding API.

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

In order to obtain this access token, the client must first have permission to access the geocoding API. This is typically done by requesting access from the administrator of the geocoding API.

For details on how to set up a Client Credentials Grant in Auth0 refer to [Setting up a Client Credentials Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard).


## Authorize access tokens

Once a client has obtained an access token, it will include that token as a credential when making API requests.

```
GET /calandar/v1/events
Host​: api.example.com

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
```

The token in this example decodes to the following claims:

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
.
{
  "iss": "https://example.auth0.com/",
  "aud": "https://api.example.com/calandar/v1/",
  "sub": "usr_123",
  "scope": "read write",
  "iat": 1458785796,
  "exp": 1458872196
}
```

Before permitting access to the API using this token, the API must do the following:

1. Ensure that the token is intended to be used at the API by checking that the value of `aud` is identical to the API's identifier.
1. Ensure that the token has not expired by comparing the value of `exp` to the current time.
1. Ensure that the token was issued by a trusted authorization server. In this case, Auth0 is the trusted authorization server and a secret, `keyboardcat`, is known only to Auth0 and the API. The signature of the token is validated using this secret.
1. Ensure that the token has the correct scopes to perform the requested operation.

If any of these check fail, the token is invalid and the request should be rejected.

Once these checks have been performed successfully, the API can be assured that:

- The token was issued by Auth0.
- The token was issued to an application being operated by the user with an identifier of `usr_123`.
- The user granted the application access to read and write his or her calendar.

The API can now process the request, allowing the application to read and write to user `usr_123`'s calendar.

## Lifetime

The token lifetime can be controlled on a per-API basis. The validity period can be increased or decreased based on the security requirements of each API.

To configure the amount of time a token lives, use the **Token Expiration (Seconds)** field for your API at the [APIs dashboard](${manage_url}/#/apis). The default value is `24` hours (`86400` seconds).

Once expired, an access token can no longer be used to access an API. In order to obtain access again, a new access token needs to be obtained. This can be done by repeating the OAuth flow used to obtain the initial access token.

In some situations, it is desirable to have permanent, ongoing access to an API without having to repeat an OAuth flow. This is often referred to as `offline access`, and is possible with the use of a [refresh token](/tokens/refresh-token).

A refresh token is issued from the OAuth 2.0 endpoints along with the access token. When the access token expires, the refresh token can be used to obtain a fresh access token with the same permissions, without further involvement from a user. Note that offline access is enabled as a policy of the API the access token grants access to. If the API does not permit offline access, a refresh token will not be issued. In such circumstances, the OAuth flow must be repeated in order to obtain a new access token.

For more information on refresh tokens and how to use them refer to: [Refresh Token](/tokens/refresh-token).

## Revoke access token

Revoking access tokens is not supported at the moment. The best way to control this is to set the validity period of the token, according to the security requirements of the API. For example, an access token that accesses a banking API should probably expire much faster than one that accesses a ToDo API.
