---
title: Identity Provider Access Tokens
description: Overview of Identity Provider Access Tokens
topics:
  - tokens
  - idp
  - access-tokens
contentType:
  - concept
useCase:
  - invoke-api
---

# Identity Provider Access Tokens

Third-party [Access Tokens](/tokens/overview-access-tokens) are issued by [Identity Providers](/identityproviders) after a user authenticates with that provider. Use the Access Tokens to call the API of the third-party provider that issued them. For example, an Access Token issued after authentication to Facebook could be used to call the Facebook Graph API.

The user authenticates with the IdP by making an HTTP `GET` call to [the /api/v2/user/{user-id} endpoint](/api/management/v2#!/Users/get_users_by_id). To call this endpoint you need a [Access Tokens for the Management API](/api/management/v2/tokens) that includes the `read:user_idp_tokens` [scope](/scopes). The Access Token for the IdP will be available in the `identities` array, under the element for the particular connection. For information on how to call an IdP API, see [Call an Identity Provider API](/connections/calling-an-external-idp-api).

::: warning
The contents of third-party Access Tokens will vary depending on the issuing identity provider. Because tokens are created and managed by a third-party (such as Facebook, GitHub, etc.), **the validity period for third-party tokens will vary by the issuing IdP**. If you believe these tokens have been compromised, you will need to revoke or reset them with the third-party that issued them.
:::

## Renew tokens

There is no standard way to renew IdP Access Tokens through Auth0. The mechanism for renewing IdP Access Tokens varies for each provider.

For certain identity providers, Auth0 can store a [Refresh Token](/tokens/refresh-token) which you can use to obtain a new Access Token for the IdP. Currently this is supported for the following identity providers:

* BitBucket
* Google OAuth 2.0 (you need to pass the parameter `access_type=offline` when calling the Auth0 `/authorize` endpoint)
* Any other OAuth 2.0 IdP
* SharePoint
* Azure AD

Get the IdP Refresh Tokens in the same way as Access Tokens, using [the /api/v2/user/{user-id} endpoint](/api/management/v2#!/Users/get_users_by_id). The Refresh Tokens will be available in the `identities` array, under the element for the particular connection.

## Validate tokens

In general, IdP Access Tokens are passed to the issuing provider and the issuing provider is responsible for validation of the token.

## Keep reading

* [Access Tokens](/tokens/overview-access-tokens)
* [Identity Providers Supported by Auth0](/identityproviders)
* [Access Tokens for the Management API](/api/management/v2/tokens)
* [Scopes](/scopes)
* [Call an Identity Provider API](/connections/calling-an-external-idp-api)
* [Add Scopes/Permissions to Call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp)

