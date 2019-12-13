---
title: ID Tokens
description: ID Tokens are JSON Web Tokens (JWT) that contain user profile information and are received after a user successfully authenticates. They are primarily used by the client appliation. Learn how to get, use, validate, and renew ID Tokens.
toc: false
topics:
  - tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - concept
useCase:
  - add-login
  - development
---
# ID Tokens

ID Tokens are used in token-based authentication to cache user profile information and provide it to a client application, thereby providing better performance and experience. The application receives an ID Token after a user successfully authenticates, then consumes the ID Token and extracts user information from it, which it can then use to personalize the user's experience.

For example, let's say you have built a [regular web application](/applications), [registered it with Auth0](/dashboard/guides/applications/register-app-regular-web), and have [configured it to allow a user to log in using Google](/connections/social/google). Once a user logs in to your app, you can use the ID Token to gather information, such as name and email address, which you can then use to auto-generate and send a personalized welcome email.

## ID Token Structure

ID Tokens follow the <dfn data-key="json-web-token">[JSON Web Token (JWT)](/jwt)</dfn> standard, which means that their basic structure conforms to the typical [JWT Structure](/tokens/reference/jwt/jwt-structure), and they contain standard [JWT Claims](/tokens/jwt-claims) asserted about the token itself.

However, beyond what is required for JWT, ID Tokens also contain claims asserted about the authenticated user, which are pre-defined by the [OpenID Connect (OIDC)](/protocols/oidc) protocol, and are thus known as standard OIDC claims. Some standard OIDC claims include:

* `name`
* `nickname`
* `picture`
* `email`
* `email_verified`

For a full list of standard OIDC claims, see [OIDC specification: Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

You control which OIDC claims are included in the ID Token consumed by your application by including specific [OpenID Connect Scopes](/scopes/oidc-scopes) in a parameter when you request tokens while authenticating users. To learn how to request an ID Token, see [Get an ID Token](/tokens/guides/id-token/get-id-tokens).

::: note 
You can also create [custom claims](/tokens/jwt-claims#custom-claims), which are claims that you define, control, and add to a token using a rule. 
:::

## ID Token Security

As with any other [JWTs](/tokens/jwt#security), you should follow [token best practices](/tokens/concepts/token-best-practices) when using ID Tokens and [validate an ID Token](/tokens/guides/id-token/validate-id-token) before assuming that its contents can be trusted.

## ID Token Lifetime

By default, an ID Token is valid for 36000 seconds (10 hours). If there are security concerns, you can shorten the time period before the token expires, but remember that one of the purposes of this token is to improve performance by caching user information. 

To learn how to change the ID Token expiration time, see [Update ID Token Lifetime](/dashboard/guides/applications/update-token-lifetime).

## Next Steps

::: next-steps
* [Get an ID Token](/tokens/guides/id-token/get-id-tokens)
* [Validate an ID Token](/tokens/guides/id-token/validate-id-token)
* [JSON Web Token](/jwt)
:::
