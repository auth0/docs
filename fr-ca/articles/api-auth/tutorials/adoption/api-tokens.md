---
title: Call APIs with Auth0 Tokens
description: The OIDC-conformant pipeline and how this affects your use of Auth0 tokens with external APIs
topics:
  - tokens
  - access-tokens
  - id-tokens
  - scopes
  - api-authentication
  - oidc
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs with Auth0 Tokens

<%= include('./_about.md') %>

With the OIDC-conformant pipeline, all APIs should be secured with Access Tokens, not ID Tokens. In this article, we discuss what this means and what you need to do if you're using Auth0 tokens with your APIs.

## OIDC-conformant pipeline and tokens

In the OIDC-conformant pipeline, **ID Tokens should never be used as API tokens**.

Instead, applications and APIs (resource services) should be defined as separate Auth0 entities. This allows you to obtain <dfn data-key="access-token">Access Tokens</dfn> for your APIs.

You get simpler API integration since your APIs are no longer tied to the applications that make calls to it. You're also enabling [machine-to-machine integration scenarios](/flows/concepts/client-credentials), since applications
can authenticate as themselves (that is, they are not acting on behalf of any user) to programmatically and securely obtain an API token.

For example, [the Auth0 Management API is already defined as a resource server on your
Auth0 domain](${manage_url}/#/apis/management/settings). You can then authorize applications seeking access to obtain API tokens with specific <dfn data-key="scope">scopes</dfn> in a secure way.

### Access vs. ID Tokens

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

The sample above shows the contents of an ID Token. ID Tokens are meant only for **authenticating** the users to the **application**.

Note that the <dfn data-key="audience">audience</dfn> value (located in the **aud** claim) of the token is set to the application's identifier. This means that only this specific application should consume the token.

You can think of the ID Token as a performance optimization that allows applications to obtain user profile information without making additional requests after the completion of the authentication process. ID Tokens should never be used to obtain direct access to resources or to make authorization decisions.

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

The Access Token is meant to **authorize** the user to the **API (resource server)**. As such, the token is **Completely opaque to applications** -- applications should not care about the contents of the token.

The token does not contain any information about the user except for the user ID (located in the **sub** claim). The token only contains authorization information about the actions that application is allowed to perform at the API (such permissions are referred to as **scopes**).

In many cases, you may find it useful to retrieve additional user information. You can do this by calling the [/userinfo API endpoint](/api/authentication#get-user-info) with the Access Token. Be sure that the API for which the Access Token is issued uses the **RS256** [signing algorithm](/tokens/concepts/signing-algorithms).

## Scopes

With the OIDC-conformant pipeline, the **scope** parameter [behaves differently](/api-auth/tutorials/adoption/scope-custom-claims) from the **scope** parameter associated with the legacy pipeline.

The scope parameter in the OIDC-conformant pipeline determines:

* The permissions that an authorized application should have for a given resource server
* Which standard profile claims should be included in the ID Token (if the user consents to provide this information to the application)

If you have multiple apps calling an API under a single client ID, you should represent each application with a single Auth0 application, each of which can interact with the resource server representing the API on which these apps depend.

Similarly, if you use delegation to exchange tokens obtained by one application for tokens for a different application, you should also be using a multi-application solution, each authenticating to the same resource server.

If your applications do not depend on external APIs and you just need to authenticate users, you do not need to define a resource server/API as long as the ID Tokens are:

* Processed only by the application
* Not sent to any external services

::: note
For more information on API authentication and authorization refer to <a href="/api-auth">API Authorization</a>.
:::

## Keep reading

<%= include('./_index.md') %>
