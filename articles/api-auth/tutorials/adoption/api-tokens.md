---
title: Calling your APIs with Auth0 tokens
description:
---
# Calling your APIs with Auth0 tokens

<%= include('./_about.md') %>

One fundamental change that we're implementing in the OIDC-conformant pipeline is that **ID Tokens should never be used as API tokens**.

Instead, client applications and APIs (resource services) should be defined as separate Auth0 entites. This allows you to obtain Access Tokens for your own APIs.

You get simpler API integration, since your APIs are no longer tied to the client applications that make calls to it. You're also enabling [machine-to-machine integration scenarios]((/api-auth/grant/client-credentials)), since clients
can authenticate as themselves](/api-auth/grant/client-credentials (that is, they are not acting on behalf on any user) to programmatically and securely obtain an API token.

For example, [the Auth0 Management API is already defined as a resource server on your
Auth0 domain](${manage_url}/#/apis/management/settings). You can then authorize clients seeking access to obtain API tokens with specific scopes in a secure way.

## Access vs. ID Tokens

One way to understand how Access and ID Tokens differ in their behavior is to look at the contents of the tokens themselves.

**The ID Token**

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

The sample above shows the contents of an ID Token. ID Tokens are meant only for **authenticating** the users to the **client**.

Note that the audience value (located in the **aud** claim) of the token is set to the client's identifier. This means that only this specific client should consume the token.

You can think of the ID Token as a performance optimization that allows clients to obtain user profile information without making additional requests after the completion fo the authentication process. ID Tokens should never be used to obtain direct access to resources or to make authorization decisions.

**The Access Token**

Let's now take a look at the contents of an Access Token:

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

The Access Token is meant to **authorize** the user to the **API (resource server)**. As such, the token is **Completely opaque to clients** -- clients should not care about the contents of the token.

The token does not contain any information about the user except for the user ID (located in the **sub** claim). The token only contains authorization information about the actions that client is allowed to perform at the API (such permissions are referred to as **scopes**).

In many cases, you may find it useful to retrieve additional user information. You can do this by calling the [/userinfo API endpoint](/api/authentication#get-user-info) with the Access Token. Be sure that the API for which the Access Token is issued uses the **RS256** signing algorithm.



[Note that the `scope` parameter has a different behavior than in the legacy pipeline](/api-auth/tutorials/adoption/scope-custom-claims).
It determines the permissions that an authorized client should have for
a given resource server (OAuth authorization), as well as which standard
profile claims should be included in the ID Token (OIDC authentication),
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
long as ID Tokens are only processed by clients and not sent to external
services.

::: note
  For more information on API authentication and authorization refer to <a href="/api-auth">API Authorization</a>.
:::

## Further reading

<%= include('./_index.md') %>
