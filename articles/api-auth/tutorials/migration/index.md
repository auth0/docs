---
url: /api-auth/tutorials/migration
description: API Authentication and Authorization migration guide
---

OIDC-conformant authentication migration guide
==============================================

Auth0 is a [certified OpenID Connect (OIDC)
provider](http://openid.net/certification/), but not all Auth0
documentation and features conform to the [OIDC
specification](http://openid.net/specs/openid-connect-core-1_0.html).
As part of our efforts to improve security and standards-based
interoperability, we are rolling out new features exclusively on
authentication flows that strictly conform to specifications. The first
of these features is [API Authentication and
Authorization](/api-auth), which is available
today.

This guide details all the upcoming changes, **some of which will be
breaking**, and provides suggestions on how to migrate your existing
applications.

## Who is this guide for?

This guide is meant for developers and IT admins who manage Auth0
integrations in their applications. If you are not familiar with how
OAuth works at a basic level, [we suggest reading our protocol
overview](/protocols/oauth2).

If you are integrating Auth0 as a [SAML or WS-Federation **identity
provider**](https://auth0.com/docs/saml-idp-generic) to your
application (i.e. not through OIDC/OAuth), then you do not need to make
any changes.

To make this guide accessible to everyone, any authentication flows will
be described only through HTTP requests instead of in the context of any
particular language or library’s implementation. This is the similar to
the descriptions and examples provided by the [official OIDC
specification](https://openid.net/specs/openid-connect-core-1_0.html).

## Terminology

All of the changes described in this guide apply to the **OIDC-conformant
authentication pipeline**. This pipeline will be used if any
of the following are true:

-   An [authentication request](/api/authentication#social) was initiated with an `audience` parameter

-   The client being used to authenticate has [*`oidc_conformant` set to `true`*](/api/management/v2#!/Clients/get_clients)

If none of these conditions are met, the **legacy authentication
pipeline** will be used, and everything will keep working as usual.

## Is there a deadline?

We understand that making changes to the core authentication logic of
your application is not something that you want to do every day, and
that any changes need to be thoroughly tested. Because of this, we are
not setting a deadline to make changes at this time. Instead, both
authentication pipelines (OIDC-conformant and legacy) will be usable
until further notice.

All Auth0 documentation, SDKs, libraries and samples will eventually
apply only to the OIDC-conformant pipeline. Because of this, we strongly
recommend migrating even if you do not need to leverage any new features
or functionality in the near future.

## My application works just fine, why should I update?

Complying with the OIDC specification means that your application will
be more secure. The OIDC-conformant authentication pipeline includes
security fixes for refresh tokens, state isolation and fine-grained
authorization.

Any new Auth0 features, examples and documentation moving forward will
target only the OIDC-conformant pipeline. All Auth0 SDK versions that
depend on the legacy pipeline are deprecated and will not receive
updates for new features or non-critical security issues, and will
eventually be discontinued.

## Compare differences between the two pipelines

<%= include('./_index.md') %>

Initiating authentication flows
===============================

In the vast majority of cases, authentication flows are initiated
through the [/authorize endpoint of your Auth0 domain](/api/authentication#social). The different
query parameters passed to this endpoint will determine the behavior and
the results of the authentication flow.

There are three main kinds of authentication flows present in the
**legacy pipeline**, each for different kinds of applications:

-   [*Authorization Code grant*](/protocols#oauth-server-side),
    initiated through response_type=code. This is meant for
    server-side clients that are capable of securely storing secrets
    or native clients using PKCE.

-   [*Implicit grant*](/protocols#oauth2-implicit-flow),
    initiated through response_type=token. This is meant for
    JavaScript client-side applications that are not capable of
    securely storing secrets, such as single-page applications.

-   [*Resource Owner Password Credentials*](https://auth0.com/docs/protocols#oauth-resource-owner-password-credentials-grant)
    grant. This is used by highly trusted first party
    clients that are capable of processing user credentials directly.

The OIDC conformant pipeline extends these flows, but changes how they
are initiated and used. It also adds a fourth flow, [*Client Credentials grant*](/api-auth/grant/client-credentials), which
can be used for non-interactive or machine to machine authentication.

Authorization Code grant
------------------------

[*This flow can be invoked and used as usual*](/api-auth/grant/authorization-code). If
you are depending on the ID token returned by Auth0 to make API calls,
[*please check the relevant section of this guide*](#calling-apis-with-auth0-tokens).

Implicit grant
--------------

The semantics of the response_type parameter have changed to be
standards compliant. [*The OIDC specification lists all the different possible combinations and the corresponding results.*](https://openid.net/specs/openid-connect-core-1_0.html#AuthorizationExamples)
For simplicity, we will describe a few common combinations for
`response_type` values:

-   `token`: Will return only an access token for the specified API

-   `id_token`: Will only return an ID token for the client

-   `token id_token`: Returns both an access token for the specified API and an ID token for the client

The OIDC-conformant implicit grant flow also has an additional security
requirement, which is to [*use a nonce parameter to avoid token replay attacks*](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitAuthRequest).
Read more on [how to securely generate and validate a nonce for your JavaScript-based web application](/api-auth/tutorials/nonce).

[*Learn more about the format and purpose of each token*](/tokens).

[*Learn more about the OIDC-conformant implicit grant flow*](/api-auth/grant/implicit).

### Refresh tokens

OIDC explicitly forbids returning refresh tokens to clients when using
the implicit grant, because clients using this grant are not able to
securely keep long-lived secrets. [*The new authentication pipeline provides more secure mechanisms to refresh user’s tokens and to retrieve updated user claims.*](/api-auth/tutorials/silent-authentication)

Refresh tokens can still be used by applications using the Authorization
Code flow.

User profile claims and scope
=============================

[*The behavior of the scope claim has also been changed to conform to the OIDC specification*](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).
Instead of requesting arbitrary application-specific claims, clients can
request any of the standard claims as well as any scopes that API access tokens should allow.

Custom claims
-------------

In order to improve compatibility for client applications, Auth0 will
now return profile information in a [*structured claim format as defined by the OIDC specification*](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).
This means that it is no longer possible to add arbitrary claims to ID
tokens or access tokens. Custom claims may still be added, but must
conform to a namespaced format to avoid possible collisions with
standard OIDC claims.

For example, suppose an identity provider returns a `favorite_color`
claim as part of the user’s profile, and that we’ve used the Auth0
management API to set application-specific information for this user.
This would be the profile stored by Auth0:

```json
{
  "email": "jane@example.com",
  "email_verified": true,
  "user_id": "custom|123",
  "favorite_color": "blue",
  "app_metadata": {
    "preferred_contact": "email"
  }
}
```

This is a [*normalized user profile*](/user-profile/normalized), which is a
protocol-agnostic representation of this user as defined by Auth0. When
performing an OIDC conformant login, Auth0 would return the following ID
token claims to the client:

```json
{
  "iss": "https://my-domain.auth0.com/",
  "sub": "custom|123",
  "aud": "my_client_id",
  "exp": 1311281970,
  "iat": 1311280970,
  "email": "jane@example.com",
  "email_verified": true
}
```

Note that the `user_id` property is sent as `sub` in the ID token, and that `favorite_color` and
`app_metadata` are not present in the OIDC response from Auth0. This is
because OIDC does not define standard claims to represent all the
information in this user’s profile. We can, however, define a
non-standard claim by namespacing it through a rule:

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.app_metadata.preferred_contact;
  callback(null, user, context);
}
```

Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier,
and any number of namespaces can be used. The namespace URL does not
have to point to an actual resource, it’s only used as an identifier and
will not be called by Auth0. This follows a [*recommendation from the OIDC specification*](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims)
stating that custom claim identifiers should be collision-resistant.
While this is not mandatory according to the specification, Auth0 will
always enforce namespacing when performing OIDC-conformant login flows,
meaning that any non-namespaced claims will be silently excluded from
tokens.

If you need to add custom claims to the access token, the same applies
but using `context.accessToken` instead.

Keeping users logged in and updating their claims
=================================================

Applications using the authorization code grant can use refresh tokens
to get updated user information and new access tokens or ID tokens at
will.

Applications using the implicit grant must not use refresh tokens. Any
OIDC conformant implicit grant authentication flows will not return
refresh tokens, even if they were explicitly requested. Instead,
[single-page apps should use silent authentication](/api-auth/tutorials/silent-authentication) to keep users logged in.

Multi-factor Authentication (MFA)
=================================

Multi-factor authentication will still work exactly as it does today, but the contents of ID tokens will change depending on what additional factors a user authenticated with.
These factors will be listed in the [`amr` (Authentication Methods Reference) claim](https://openid.net/specs/openid-connect-core-1_0.html#IDToken).
For example, if a user authenticated through a Google connection and used Guardian as a second authentication factor, the ID token would contain an `"amr": [ "mfa" ]` claim.

This claim can be used by clients to [implement step-up authentication](https://auth0.com/docs/tutorials/step-up-authentication).

End-to-end example
==================

We are building a suite of applications that can be used as an example for a non-trivial end-to-end use case that leverages new API authentication and authorization features.
[You can find the code for these applications here](https://github.com/auth0/basebuk).
