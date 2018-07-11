---
title: Identity Provider Access Tokens
description: How to obtain Identity Provider Access Tokens
topics:
  - tokens
  - idp
  - access-tokens
contentType:
  - how-to
  - concept
useCase:
  - invoke-api
---
# Identity Provider Access Tokens

Third-party [Access Tokens](/tokens/access-token) are issued by [Identity Providers (IdP)](/identityproviders) when a user authenticates with that provider. These Access Tokens can be used to call the API of the third-party provider that issued them. For example, an Access Token issued after authentication to Facebook could be used to call the Facebook Graph API.

## Get an Identity Provider Access Token

IdP Access Tokens can be obtained after the user has authenticated with the IdP by making an HTTP `GET` call to [the /api/v2/user/{user-id} endpoint](/api/management/v2#!/Users/get_users_by_id). To call this endpoint you will need a [Management API Access Token](/api/management/v2/tokens) that will include the `read:user_idp_tokens` [scope](/scopes). The Access Token for the IdP will be available in the `identities` array, under the element for the particular connection.

For a step-by-step guide on obtaining IdP Access Tokens, see [Call an Identity Provider API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api).

## Control the contents of IdP Access Tokens

The contents of third-party Access Tokens will vary by the issuing IdP.

## Validity period

Since these tokens are created and managed by a third-party (such as Facebook, GitHub, and so on) **the validity period for third-party tokens will vary by the issuing IdP**. If you believe these tokens have been compromised, you will need to revoke or reset them with the third-party that issued them.

## Renew the token

There is no standard way to renew IdP Access Tokens through Auth0. If available, the mechanism for renewing IdP Access Tokens will vary for each provider.

For certain Identity Providers, Auth0 will store a [Refresh Token](/tokens/refresh-token) which you can use to obtain a new Access Token for the IdP. Currently this is supported for the following Identity Providers:

* BitBucket
* Google OAuth 2.0 (you need to pass the parameter `access_type=offline` when calling the Auth0 `/authorize` endpoint)
* Any other OAuth 2.0 IdP
* SharePoint
* Azure AD

IdP Refresh Tokens can be obtained the same way as Access Tokens, using [the /api/v2/user/{user-id} endpoint](/api/management/v2#!/Users/get_users_by_id). The Refresh Token will be available in the `identities` array, under the element for the particular connection.

## Terminate the token

The ability to terminate IdP Access Tokens is up to each provider.

## Validate the token

In general, IdP Access Tokens are passed to the issuing provider, and the issuing provider is responsible for validation of the token.

## Keep reading

:::next-steps
* [Calling an external IDP API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api)
* [Adding Scopes for external IDP](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp)
:::
