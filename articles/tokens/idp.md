---
description: How to obtain Identity Provider access tokens.
---
# Identity Provider Access Tokens

## Overview

Third-party access tokens are issued by Identity Providers (including Social providers like Facebook and Google) when a user authenticates with that provider. These access tokens can be used to call the API of the third-party provider that issued them.

## How to obtain Identity Provider access tokens

Identity Provider (IdP) access tokens can be obtained after the user has authenticated with the IdP by making an HTTP GET call to the `/api/v2/user/{user-id}` endpoint containing an Auth0 API token generated with  `read:user_idp_tokens` scope.  The `access_token` for the IdP will be available in the `identities` array, under the element for the particular connection.

For a step-by-step guide on obtaining IdP access tokens, see: [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api).

## How to control contents of IdP access tokens

The contents of third-party access tokens will vary by the issuing IdP.

## Validity

Since these tokens are created and managed by a third-party (such as Facebook, GitHub, etc) **the validity period for third-party tokens will vary by the issuing IdP**. If you believe these tokens have been compromised, you will need to revoke or reset them with the third-party that issued them. 

## Renewing the token

There is no standard way to renew IdP access tokens through Auth0. If available, the mechanism for renewing IdP access tokens will vary for each provider.

For certain Identity Providers, Auth0 will store a `refresh_token` which you can use to obtain a new `access_token` for the IdP. Currently this is supported for the following Identity Providers:

* BitBucket
* Google OAuth 2.0 (For Google you need to pass the parameter `access_type=offline` when calling the Auth0 `/authorize` endpoint)
* OAuth 2.0
* SharePoint
* Azure AD

As for access tokens, the Identity Provider (IdP) `refresh_token` can be obtained by making an HTTP GET call to the `/api/v2/user/{user-id}` endpoint containing an Auth0 API token generated with  `read:user_idp_tokens` scope. The `refresh_token` will be available in the `identities` array, under the element for the particular connection.

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
