---
title: JSON Web Token Claims
description: Learn about JSON Web Token (JWT) claims and how they are used in Auth0.
toc: false
topics:
  - tokens
  - jwt
  - claims
contentType:
  - concept
useCase:
  - development
  - add-login
  - invoke-api
  - secure-api
---
# JSON Web Token Claims

::: note
This page describes the standard types of claims available when using the JSON Web Token (JWT) standard. To learn about OpenID Connect (OIDC) standard claims, see [OpenID Connect Scopes: Standard Claims](/scopes/current/oidc-scopes#standard-claims) and [OpenID Connect Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).
:::

[JSON Web Token (JWT)](/tokens/concepts/jwts) claims are pieces of information asserted about a subject. For example, an [ID Token](/tokens/concepts/id-tokens) (which is always a JWT) may contain a claim called `name` that asserts that the name of the user authenticating is "John Doe".

In a JWT, a claim appears as a name/value pair where the name is always a string and the value can be any JSON value. Generally, when we talk about a claim in the context of a JWT, we are referring to the name (or *key*). For example, the following JSON object contains three claims (`sub`, `name`, `admin`):

```
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
```

## JWT claim types

There are two types of <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> claims:

* **[Reserved](#reserved-claims)**: Claims defined by the [JWT specification](https://tools.ietf.org/html/rfc7519) to ensure interoperability with third-party, or external, applications. [OpenID Connect (OIDC) standard claims](/scopes/current/oidc-scopes#standard-claims) are reserved claims.
* **[Custom](#custom-claims)**: Claims that you define yourself. Name these claims carefully, such as through [namespacing](/tokens/guides/create-namespaced-custom-claims) (which Auth0 requires), to avoid collision with reserved claims or other custom claims. It can be challenging to deal with two claims of the same name that contain differing information.

### Reserved claims

The JWT specification defines seven reserved claims that are not required, but are recommended to allow interoperability with [third-party applications](/applications/guides/enable-third-party-apps). These are:

* iss (issuer): Issuer of the JWT
* sub (subject): Subject of the JWT (the user)
* aud (audience): Recipient for which the JWT is intended
* exp (expiration time): Time after which the JWT expires
* nbf (not before time): Time before which the JWT must not be accepted for processing
* iat (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT
* jti (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)

You can see a full list of reserved claims at the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims). 

Note that [OpenID Connect (OIDC) standard claims](/scopes/current/oidc-scopes#standard-claims) returned in [ID Tokens](/tokens/concepts/id-tokens) are reserved claims. For an example showing how to add OIDC standard claims to a token, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#authenticate-a-user-and-request-standard-claims).

### Custom claims

For your specific use case, you can define your own custom claims, which you control and can add to a token using a [rule](/rules). For example, you may want to add a user's email address to an Access Token and use that to uniquely identify the user, or you may want to add custom information stored in an Auth0 user profile to an ID Token. As long as your rule is in place, the custom claims it adds will appear in new tokens issued when using a <dfn data-key="refresh-token">[Refresh Token](/tokens/concepts/refresh-tokens)</dfn>.

You can name a custom claim anything that is not already listed in the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims), and you should use collision-resistant names, such as through [namespacing](/tokens/guides/create-namespaced-custom-claims) (which Auth0 requires).

For an example showing how to add custom claims to a token, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token).

#### Public claims

You can create custom claims for public consumption, which might contain generic information like "name" and "email". If you create public claims, you *must* either register them or use collision-resistant names through [namespacing](/tokens/guides/create-namespaced-custom-claims) (which Auth0 requires) and take reasonable precautions to make sure you are in control of the namespace you use.

In the [IANA JSON Web Token Claims Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims), you can see some examples of public claims registered by <dfn data-key="openid">OpenID Connect (OIDC)</dfn>: 

* auth_time
* acr
* <dfn data-key="nonce">nonce</dfn>

#### Private claims

You can create private custom claims to share information specific to your application. For example, while a public claim might contain generic information like "name" and "email", private claims would be more specific, such as "employee ID" and "department name".

According to the JWT standard, you *should* name private claims cautiously to avoid collision, such as through [namespacing](/tokens/guides/create-namespaced-custom-claims) (which Auth0 still requires). Private claims should not share names with reserved or public claims.

## Keep reading

* [JSON Web Tokens](/tokens/concepts/jwts)
* [JSON Web Token Structure](/tokens/references/jwt-structure)
* [Validate JSON Web Tokens](/tokens/guides/validate-jwts)
* [Token Best Practices](/best-practices/token-best-practices)
* [OpenID Connect Scopes: Standard Claims](/scopes/current/oidc-scopes#standard-claims)
* [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#add-custom-claims-to-a-token)
