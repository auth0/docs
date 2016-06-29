---
description: How to obtain Identity Provider access tokens.
---

# Identity Provider Access Tokens

## Overview

Third-party access tokens are issued by social identity providers (such as Facebook or LinkedIn) when a user authenticates with that provider. These access tokens can be used to call the API of the third-party provider that issued them.

## How to obtain Identity Provider access tokens

Identity Provider (IdP) access tokens can be obtained by making an HTTP GET call to the `/api/v2/user/{user-id}` endpoint containing an API token with  `read:user_idp_tokens` scope after the user has authenticated with the IdP. 

sample call?

For examples of profiles as returned by various social providers, see: [Normalized User Profile](/user-profile/normalized) 

## How to control contents of IdP access tokens

The contents of third-party access tokens will vary by the issuing IdP.

## Validity

The validity period for third-party access tokens will vary by the issuing IdP.

## Renewing the token

There is no standard way to renew IdP access tokens through Auth0. If available, the mechanism for renewing IdP access tokens will vary for each provider.

## Termination of tokens

The ability to terminate IdP access tokens is up to each provider.

## Uses

The IdP access token is used to call the API offered by the provider that issued the token. For example, an access token issued after authentication to Facebook could be used to call the Facebook Graph API.

For more information see:

* [Calling an external IDP API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api)

* [Adding Scopes for external IDP](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp)

## Best practices

### Validation

In general, IdP access tokens are passed to the issuing provider, and the issuing provider is responsible for validation of the token.
