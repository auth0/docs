---
title: Access Tokens
description: Understand how Access Tokens are used in token-based authentication to allow an application to access an API after a user successfully authenticates and authorizes access.
topics:
  - tokens
  - access-tokens
contentType:
  - concept
useCase:
  - invoke-api
---
# Access Tokens

Access Tokens are used in token-based authentication to allow an application to access an API. The application receives an Access Token after a user successfully authenticates and authorizes access, then passes the Access Token as a credential when it calls the target API. The passed token informs the API that the bearer of the token has been authorized to access the API and perform specific actions specified by the <dfn data-key="scope">[**scope**](/scopes)</dfn> that was granted during authorization.

In addition, if you have chosen to allow users to log in through an [Identity Provider (IdP)](/identityproviders), such as Facebook, the IdP will issue its own Access Token to allow your application to call the IDP's API. For example, if your user authenticates using Facebook, the Access Token issued by Facebook can be used to call the Facebook Graph API. These tokens are controlled by the IdP and can be issued in any format. To learn more, see [Identity Provider Access Tokens](/tokens/concepts/idp-access-tokens). 

## Opaque Access Tokens

Opaque Access Tokens are tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage. To validate an opaque token, the recipient of the token needs to call the server that issued the token.

Opaque Access Tokens are tokens whose format you cannot access. Opaque Access Tokens issued by Auth0 can be used with the [`/userinfo` endpoint](/api/authentication#get-user-info) to return a user's profile. 

## JSON Web Token Access Tokens

JSON Web Token (JWT) Access Tokens conform to the [JSON Web Token standard](https://tools.ietf.org/html/rfc7519) and contain information about an entity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token.

Access Tokens issued for the [Auth0 Management API](/api/info) and Access Tokens issued for any custom API that you have registered with Auth0 will follow the <dfn data-key="json-web-token">[JSON Web Token (JWT)](/tokens/concepts/jwts)</dfn> standard, which means that their basic structure conforms to the typical [JWT Structure](/tokens/references/jwt-structure), and they contain standard [JWT Claims](/tokens/concepts/jwt-claims) asserted about the token itself.

## Access Token security

You should follow [token best practices](/best-practices/token-best-practices) when using Access Tokens, and for [JWTs](/tokens/concepts/jwts#security), make sure that you [validate an Access Token](/tokens/guides/validate-access-tokens) before assuming that its contents can be trusted.

## Access Token lifetime

### Custom APIs

By default, an Access Token for a custom API is valid for 86400 seconds (24 hours). We recommend that you set the validity period of your token based on the security requirements of your API. For example, an Access Token that accesses a banking API should expire more quickly than one that accesses a to-do API.  

To learn how to change the Access Token expiration time, see [Update Access Token Lifetime](/dashboard/guides/apis/update-token-lifetime).

### /userinfo endpoint

Access Tokens issued strictly for the purpose of accessing the <dfn data-key="openid">OpenID Connect (OIDC)</dfn> [`/userinfo` endpoint](/api/authentication#get-user-info) have a default lifetime and can't be changed. The length of lifetime depends on the flow used to obtain the token:

| Flow | Lifetime |
| ---- | -------- |
| Implicit | 7200 seconds (2 hours) |
| Authorization Code/Hybrid | 86400 seconds (24 hours) |

## Keep reading

* [Get Access Tokens](/tokens/guides/get-access-tokens)
* [Use Access Tokens](/tokens/guides/use-access-tokens)
* [Validate Access Tokens](/tokens/guides/validate-access-tokens)
* [JSON Web Token Claims](/tokens/concepts/jwt-claims)
