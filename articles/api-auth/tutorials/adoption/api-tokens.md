---
title: Calling your APIs with Auth0 tokens
---

Calling your APIs with Auth0 tokens
===================================

<%= include('./_about.md') %>

A fundamental change happening on the OIDC conformant pipeline is that
**ID tokens should never be used as API tokens**. Instead, client
applications and APIs (resource servers) should be defined as separate
Auth0 entities, which allows you to obtain access tokens for your own APIs.
This enables simpler integrations of APIs, since each
API is no longer tied to the client applications that make calls to it.
It also enables machine to machine integration scenarios, since [clients
can authenticate as themselves](/api-auth/grant/client-credentials) (that is, not on behalf on any user) to
programmatically and securely obtain an API token. For example, [the
Auth0 Management API is already defined as a resource server on your
Auth0 domain](${manage_url}/#/apis/management/settings). You
can authorize clients to obtain API tokens with specific scopes in a
secure way.

One way to understand the reason for this is by looking at the contents
of example tokens which conform to the OIDC specification:

```json
{
  "iss": "http://my-domain.auth0.com",
  "sub": "auth0|123456",
  "aud": "my_client_id",
  "exp": 1311281970,
  "iat": 1311280970,
  "name": "Jane Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "gender": "female",
  "birthdate": "0000-10-31",
  "email": "janedoe@example.com",
  "picture": "http://example.com/janedoe/me.jpg"
}
```

The above is an ID token, which is meant for **authenticating** the user
to the **client**. Note that the audience (aud claim) of the token is
set to the client's identifier, which means that only this specific
client should consume this token.

The ID token can be thought of as no more than a performance
optimization that allows clients to obtain user profile information
without making additional network requests after authentication has
completed. It should not be used to obtain access to any resources or
make authorization decisions.

For comparison, let's look at the contents of an access token that could
be returned in the same authentication flow:

```json
{
  "iss": "https://my-domain.auth0.com/",
  "sub": "auth0|123456",
  "aud": [
    "https://example.com/health-api",
    "https://my-domain.auth0.com/userinfo"
  ],
  "azp": "my_client_id",
  "exp": 1311281970,
  "iat": 1311280970,
  "scope": "openid profile read:patients read:admin"
}
```

This token is meant for **authorizing** the user to the **resource
server** (API). As such, it is **completely opaque to clients**, meaning
that clients should not care about the contents of this token. Note that
the token does not contain any information about the user itself besides
their ID (`sub` claim), it only contains authorization information about
which actions the client is allowed to perform at the API (scope). Since
in many cases it's desirable to retrieve additional user information, this token is also valid for calling the [/userinfo API](/api/authentication#get-user-info) (provided that the API for which the `access_token` is issued, uses `RS256` as signing algorithm), which will return the user's profile information.

[Note that the `scope` parameter has a different behavior than in the legacy pipeline](/api-auth/tutorials/adoption/scope-custom-claims).
It determines the permissions that an authorized client should have for
a given resource server (OAuth authorization), as well as which standard
profile claims should be included in the ID token (OIDC authentication),
given that the user consents to providing that information to the
client.

If you have multiple client applications calling one API under a single
client ID, these should be broken up into individual clients and a
resource server to represent the API that these applications depend on.

If you use [delegation to exchange tokens obtained by one client into
tokens for a different client](/tokens/delegation), this should be
replaced by multiple clients authenticating to the same resource server.

If your applications do not depend on external APIs and just need to
authenticate users, it is not necessary to define any resource server as
long as ID tokens are only processed by clients and not sent to external
services.

::: note
  For more information on API authentication and authorization refer to <a href="/api-auth">API Authorization</a>.
:::

## Further reading

<%= include('./_index.md') %>
