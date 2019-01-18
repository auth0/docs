---
description: How to use Access Tokens
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# How to Use Access Tokens

Access Tokens are typically obtained in order to access user-owned resources. For example, a Calendar application needs access to a Calendar API in the cloud in order to read the user's scheduled events and create new events.

Such access is requested by the application and granted by the user, using the [Authorize endpoint](/api/authentication#authorize-application).

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

## Server-to-server Access Token interactions

Access Tokens can also be issued directly to applications. Such scenarios involve server-to-server interactions. In this case the user does not need to authenticate.

For example, a reverse geocoding API that accepts latitude/longitude coordinates and returns a readable place name does not access user-owned data. In such cases, a backend server needs to call the geocoding API in order to perform the translation.

Server-to-server Access Tokens can be obtained using the [Machine-to-Machine (M2M) Flow](/flows/guides/m2m-flow/call-api-using-m2m-flow). In order to get a token using this flow, the application has to provide its credentials (`client_id`, `client_secret`).

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

For details on how to set up a Client Grant in Auth0, refer to [Setting up a Client Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard).

## Custom API Access Token interactions

Once an application has obtained an Access Token in correct [format](/set-access-token-format) (header, claims, and signature), it will include that token as a credential when making API requests.

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
