---
title: Use an Access Token
description: Learn how to use Access Tokens to call an API.
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# Use an Access Token

<dfn data-key="access-token">Access Tokens</dfn> are used in token-based authentication to allow an application to access an API. For example, a Calendar application needs access to a Calendar API in the cloud so that it can read the user's scheduled events and create new events.

Once an application has received an Access Token, it will include that token as a credential when making API requests. To do so, it should transmit the Access Token tothe API as a **Bearer** credential in an HTTP **Authorization** header.

For example:

```text
GET /calendar/v1/events
Host​: api.example.com

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ
```

In this example, the Access Token is a [JSON Web Token (JWT)](/jwt) that decodes to the following [claims](/tokens/jwt-claims):

```json
{
  "alg": "RS256",
  "typ": "JWT"
}
.
{
  "iss": "https://example.auth0.com/",
  "aud": "https://api.example.com/calendar/v1/",
  "sub": "usr_123",
  "scope": "read write",
  "iat": 1458785796,
  "exp": 1458872196
}
```

Before permitting access to the API using this token, the API must [validate the Access Token](/tokens/guides/access-token/validate-access-token).

Once the Access Token has been successfully validated, the API can be sure that:

* The token was issued by Auth0.
* The token was issued to an application being used by a user with an identifier of `usr_123`.
* The user granted the application access to read from and write to their calendar.

The API can now process the request, allowing the application to read from and write to user `usr_123`'s calendar.

## Read more

* [Access Tokens](/tokens/access-token)
* [Get an Access Token](/tokens/guides/access-token/get-access-tokens)
* [Validate an Access Token](/tokens/guides/access-token/validate-access-token)
* [JSON Web Token](/jwt)
* [JSON Web Token Claims](/tokens/jwt-claims)
* [Token Best Practices](/tokens/concepts/token-best-practices)
* [Quickstarts](/quickstarts)
* [Authentication and Authorization Flows](/flows)
