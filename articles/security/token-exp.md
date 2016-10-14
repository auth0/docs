---
decription: Lists the expiration of different types of tokens that are referenced in Auth0 documentation. 
---

# Token Expiration 

This document states the expiration of different types of tokens that are referenced in Auth0 documentation. [Click here to learn more about the types of tokens.](/tokens)

## The Management APIv1 Access Token

 The default token expiration for APIv1 access tokens is 24 hours. For tokens issued for user defined APIs the expiration can be changed in the [Auth0 Management API Settings](${manage_url}/#/apis/management/settings) section in the dashboard.

[Learn more about Auth0 access tokens](tokens/access_token)

## Auth0 Management APIv2 Token

 The default token expiration for APIv2 access tokens is 24 hours. For tokens issued for user defined APIs the expiration can be changed in the [Auth0 Management API Settings](${manage_url}/#/apis/management/settings) section in the dashboard.

[Learn more about the Auth0 Management APIv2 Token](/api/management/v2/tokens)

## Identity Provider Access Tokens

Since these tokens are created and managed by a third-party (such as Facebook, GitHub, etc) **the validity period for third-party tokens will vary by the issuing IdP**. If you believe these tokens have been compromised, you will need to revoke or reset them with the third-party that issued them. 

[Learn more about IdP tokens](tokens/idp)

## Id Tokens Issued by Auth0

An `id_token` issued by Auth0 is valid for **10 hours (36000 seconds) by default**. The expiration of this token can be set in the Apps/APIs -> Settings screen using the JWT expiration field.

[Learn more about id_tokens issued by Auth0](id_token)

## Auth0 Refresh Tokens 

An Auth0 `refresh_token` **never expires** it is used to obtain a new `id_token` which do expire. Refresh tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever. If you think a refresh token may have been compromised, you can [revoke or obtain a new token.](/refresh-token#obtain-a-refresh-token).

[Learn more about Auth0 refresh tokens](refresh-token)

## Delegation Tokens

For customer application APIs registered in Auth0, the validity of a delegation token issued for that target is governed by the JWT Expiration (seconds) value. This is set for each application in Applications > Settings.

For APIs registered as Addons in Auth0, the validity period of the token will vary by individual Addon. The documentation available from the provider of any Addon API should be consulted for further information on tokens and expirations.

[Learn more about Delegation Tokens](/tokens/delegation)
