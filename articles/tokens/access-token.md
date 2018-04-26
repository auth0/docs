---
title: Access Token
description: Learn what Access Tokens are and how you can use them with Auth0.
toc: true
---
# Access Token

## Overview

The Access Token is a credential that can be used by a application to access an API. 

It can be any type of token (such as an opaque string or a JWT) and is meant for an API. Its purpose is to inform the API that the bearer of this token has been authorized to access the API and perform specific actions (as specified by the **scope** that has been granted). 

The Access Token should be used as a **Bearer** credential and transmitted in an HTTP **Authorization** header to the API. 

## Access Token format

Auth0 currently generates Access Tokens in two formats: as opaque strings or as [JSON Web Tokens (JWTs)](/jwt).

This depends on the value that the **audience** parameter has in the [authorization request](/api/authentication#authorize-client).

::: panel What is the audience?
The **audience** is a parameter set during [authorization](/api/authentication#authorize-client), and it contains the unique identifier of the target API. This is how you tell Auth0 for which API to issue an Access Token (in other words, which is the intended *audience* of this token). If you do not want to access a custom API, then by setting the audience to `${account.namespace}/userinfo`, you can use the opaque Access Token to [retrieve the user's profile](/api/authentication#get-user-info).
:::

* If the **audience** is set to `${account.namespace}/userinfo`, then the Access Token will be an opaque string.
* If the **audience** is set to the unique identifier of a custom API, then the Access Token will be a [JSON Web Token (JWT)](/jwt).

When the **audience** is set to a custom API and the **scope** parameter includes the `openid` value, then the generated Access Token will be a JWT valid for both [retrieving the user's profile](/api/authentication#get-user-info) and for accessing the custom API. The **audience** parameter of this JWT will include two values: `${account.namespace}/userinfo` and your custom API's unique identifier.

:::panel Use RS256 for multiple audiences
If you set a custom API audience and also use `scope=openid` in your request, then your custom API must use **RS256** (read [how to change an API's settings](/apis#api-settings)). For security reasons, tokens signed with HS256 can hold only one audience. This also applies if you have set a **Default Audience** at your [API Authorization settings](${manage_url}/#/tenant).
:::

::: warning
Remember always that the application should not depend on the Access Token to be any specific format, but instead treat the Access Token as opaque. It is meant **only** for the API.
:::

## How to get an Access Token

Access Tokens are issued via Auth0's OAuth 2.0 endpoints: [/authorize](/api/authentication#authorize-client) and [/oauth/token](/api/authentication#get-token). You can use any OAuth 2.0-compatible library to obtain Access Tokens. If you do not already have a preferred OAuth 2.0 library, Auth0 provides libraries for many languages and frameworks that work seamlessly with our endpoints.

### Using the Authentication API

* To retrieve an Access Token when using a:
  * **Server-side web app**, please see the docs for the [Authorization Code Grant](/api-auth/grant/authorization-code)
  * **Mobile app**, please see the docs for the [Authorization Code using Proof Key for Code Exchange (PKCE) Grant](/api-auth/grant/authorization-code-pkce)
  * **Client-side app**, please see the docs for the [Implicit Grant](/api-auth/grant/implicit)
  * **Command line interface**, please see the docs for the [Client Credentials Grant](/api-auth/grant/client-credentials)
  * **Trusted application**, please see the docs for the [Resource Owner Password Grant](/api-auth/grant/password)
* For a list of widgets and SDKs that can help you implement Auth0, see our [Libraries](/libraries).
* Calls to the Lock widget will return an Access Token as shown in the [Lock documentation](/libraries/lock).
* If you need only a client-side library for authorization and authentication, use [auth0.js](/libraries/auth0js).

## How to use an Access Token

Access Tokens are typically obtained in order to access user-owned resources. For example, a Calendar application needs access to a Calendar API in the cloud in order to read the user's scheduled events and create new events.

Such access is requested by the application and granted by the user, using the [Authorize endpoint](/api/authentication#authorize-client).

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

In this case the user will be prompted to permit read and write access (`scope=read write`). If allowed, an Access Token will be issued to the application, which the application can then use when making requests to the Calendar API. If consent has already been granted by the user, no consent dialog will be displayed and the Access Token will be issued without additional prompts.

Also, the consent dialog might be displayed again if the access level changes. For example, if the user has granted read access but the functionality changes so write access is required as well, the user will have to use the consent dialog to grant the additional access.

In some cases, consent can also be pre-configured administratively. This typically occurs when the user is an employee, and there are a set of company-specific applications that are always allowed access to employee data.

### Server-to-server interactions

Access Tokens can also be issued directly to applications. Such scenarios involve server-to-server interactions. In this case the user does not need to authenticate.

For example, a reverse geocoding API that accepts latitude/longitude coordinates and returns a readable place name does not access user-owned data. In such cases, a backend server needs to call the geocoding API in order to perform the translation.

Server-to-server Access Tokens can be obtained using the [Client Credentials flow](/api-auth/grant/client-credentials). In order to get a token using this flow, the application has to provide its credentials (`client_id`, `client_secret`).

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"audience\": \"https://api.example.com/geocoding/v1/\"}"
  }
}
```

The result will be an Access Token that can be used to make requests to the geocoding API.

```text
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

In order to obtain this Access Token, the application must first have permission to access the geocoding API. This is typically done by requesting access from the administrator of the geocoding API.

For details on how to set up a Client Credentials Grant in Auth0, refer to [Setting up a Client Credentials Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard).

## Add custom claims

You can add custom claims to your Access Token (or [ID Token](/tokens/id-token)) using [Rules](/rules).

The claim name must conform to a namespaced format, which basically means adding any non-Auth0 HTTP or HTTPS URL as a prefix. The Auth0 namespaces you cannot use are `auth0.com`, `webtask.io` and `webtask.run`. The format you should follow is this:  `http://my-namespace/claim-name`.

For more information on the namespaced format of custom claims, refer to [User Profile Claims and Scope](/api-auth/tutorials/adoption/scope-custom-claims).

For an example of how to add a custom claim, refer to [Add Custom Claims](/scopes/current#example-add-custom-claims).

## Lifetime

The token lifetime can be controlled on a per-API basis. The validity period can be increased or decreased based on the security requirements of each API.

To configure the amount of time a token lives, use the **Token Expiration (Seconds)** field for your API at the [Dashboard](${manage_url}/#/apis) APIs section. The default value is `24` hours (`86400` seconds).

![Token Expiration - API](/media/articles/tokens/tokens-expiration-api.png)

Once expired, an Access Token can no longer be used to access an API. To regain access, a new Access Token needs to be obtained. This can be done by repeating the OAuth flow used to obtain the initial Access Token.

In some situations, it is desirable to have permanent, ongoing access to an API without having to repeat an OAuth flow. This is often referred to as `offline_access`, and is possible with the use of a [Refresh Token](/tokens/refresh-token).

A Refresh Token is issued from the OAuth 2.0 endpoints along with the Access Token. When the Access Token expires, the Refresh Token can be used to obtain a fresh Access Token with the same permissions, without further involvement from a user. 

Note that offline access is enabled as a policy of the API to which the Access Token grants access. This is a setting that can be altered in the [Dashboard](${manage_url}/#/apis) under the APIs section.

![Offline Access - API](/media/articles/tokens/tokens-offlineaccess-api.png)

If the API does not permit offline access, a Refresh Token will not be issued. In such circumstances, the OAuth flow must be repeated in order to obtain a new Access Token.

::: note
For more information on Refresh Tokens and how to use them, refer to: [Refresh Token](/tokens/refresh-token).
:::

## Revoke Access Token

Revoking Access Tokens is not supported at the moment. The best way to control this is to set the validity period of the token according to the security requirements of the API. For example, an Access Token that accesses a banking API should probably expire much more quickly than one that accesses a ToDo API.

## Using Access Tokens with custom APIs

### JSON Web Tokens

Auth0 creates Access Tokens in JWT format for custom APIs. JWTs contain three parts: a header, a set of claims, and a signature:

* The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
* The set of claims contains verifiable security statements such as the identity of the user and the permissions they are allowed.
* The signature is used to validate that the token is trustworthy and has not been tampered with.

### Authorize Access Tokens

Once a application has obtained an Access Token, it will include that token as a credential when making API requests.

```text
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

Before permitting access to the API using this token, the API must verify the token using the following steps:

1. Check that the JWT is well formed.
1. Check the signature.
1. Validate the standard claims (specifically the `exp`, `iss` and `aud` claims)
1. Check the Application permissions (scopes)

::: note
For a more detailed description of the process of verifying Access Tokens, please refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
:::

If any of these checks fail, the token is invalid and the request should be rejected.

Once these checks have been performed successfully, the API can be assured that:

* The token was issued by Auth0.
* The token was issued to an application being operated by the user with an identifier of `usr_123`.
* The user granted the application access to read from and write to his or her calendar.

The API can now process the request, allowing the application to read from and write to user `usr_123`'s calendar.
