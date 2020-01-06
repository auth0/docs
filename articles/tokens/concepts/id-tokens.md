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

## ID Token security

As with any other [JWTs](/tokens/jwt#security), you should follow [token best practices](/tokens/concepts/token-best-practices) when using ID Tokens and [validate an ID Token](/tokens/guides/id-token/validate-id-token) before assuming that its contents can be trusted.

## ID Token lifetime

By default, an ID Token is valid for 36000 seconds (10 hours). If there are security concerns, you can shorten the time period before the token expires, but remember that one of the purposes of this token is to improve performance by caching user information. 

To learn how to change the ID Token expiration time, see [Update ID Token Lifetime](/dashboard/guides/applications/update-token-lifetime).

## Keep reading

* [Get ID Tokens](/tokens/guides/get-id-tokens)
* [Validate ID Tokens](/tokens/guides/validate-id-tokens)
* [JSON Web Tokens](/tokens/concepts/jwts)
* [ID Token Structure](/tokens/references/id-token-structure)
* [Scopes](/scopes)
* [Get Tokens Using Lock](/libraries/lock#implementing-lock)
