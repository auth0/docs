---
title: Access Tokens
description: Learn what Access Tokens are and how you can use them with Auth0.
topics:
  - tokens
  - access-tokens
contentType:
  - concept
useCase:
  - invoke-api
---
# Access Tokens

<dfn data-key="access-token">Access Tokens</dfn> are used in token-based authentication to allow an application to access an API. The application receives an Access Token after a user successfully authenticates and authorizes access, then passes the Access Token as a credential when it calls the target API. The passed token informs the API that the bearer of the token has been authorized to access the API and perform specific actions specified by the <dfn data-key="scope">[**scope**](/scopes)</dfn> that was granted during authorization.

## Access Token Structure

Auth0 issues Access Tokens in two formats: opaque and <dfn data-key="json-web-token">[JSON Web Token (JWT)](/jwt)</dfn>.

In addition, if you have chosen to allow users to log in through an [Identity Provider (IdP)](/identityproviders), such as Facebook, the IdP will issue its own Access Token to allow your application to call the IDP's API. For example, if your user authenticates using Facebook, the Access Token issued by Facebook can be used to call the Facebook Graph API. These tokens are controlled by the IdP and can be issued in any format. To learn more, see [Identity Provider (IdP) Access Tokens](/tokens/overview-idp-access-tokens). 

### Opaque Access Tokens

Opaque Access Tokens are tokens whose format you cannot access. Opaque Access Tokens issued by Auth0 can be used with the [`/userinfo` endpoint](/api/authentication#get-user-info) to return a user's profile. 

To learn more about getting an opaque Access Token for the `userinfo` endpoint, see [Get Access Tokens](/tokens/guides/access-token/get-access-tokens).

### JSON Web Token Access Tokens

Access Tokens issued for the [Auth0 Management API](/api/info) and Access Tokens issued for any custom API that you have registered with Auth0 will follow the <dfn data-key="json-web-token">[JSON Web Token (JWT)](/jwt)</dfn> standard, which means that their basic structure conforms to the typical [JWT Structure](/tokens/reference/jwt/jwt-structure), and they contain standard [JWT Claims](/tokens/jwt-claims) asserted about the token itself.

To learn more about getting a JWT Access Token for the Management API or your own custom API, see [Get Access Tokens](/tokens/guides/access-token/get-access-tokens).

## Access Token Security

You should follow [token best practices](/best-practices/token-best-practices) when using Access Tokens, and for [JWTs](/jwt#security), make sure that you [validate an Access Token](/tokens/guides/access-token/validate-access-token) before assuming that its contents can be trusted.

## Access Token Lifetime

### Custom APIs

By default, an Access Token for a custom API is valid for 86400 seconds (24 hours). We recommend that you set the validity period of your token based on the security requirements of your API. For example, an Access Token that accesses a banking API should expire more quickly than one that accesses a to-do API.  

To learn how to change the Access Token expiration time, see [Update Access Token Lifetime](/dashboard/guides/apis/update-token-lifetime).

### /userinfo endpoint

Access Tokens issued strictly for the purpose of accessing the <dfn data-key="openid">OpenID Connect (OIDC)</dfn> [/userinfo endpoint](/api/authentication#get-user-info) have a default lifetime and can't be changed. The length of lifetime depends on the flow used to obtain the token:

| Flow | Lifetime |
| ---- | -------- |
| Implicit | 7200 seconds (2 hours) |
| Authorization Code/Hybrid | 86400 seconds (24 hours) |


## Next Steps

::: next-steps
* [Get an Access Token](/tokens/guides/access-token/get-access-tokens)
* [Add Custom Claims to a Token](/scopes/current/sample-use-cases#add-custom-claims-to-a-token)
* [Use an Access Token](/tokens/guides/access-token/use-access-tokens)
* [Validate an Access Token](/tokens/guides/access-token/validate-access-token)
* [JSON Web Token](/jwt)
:::
