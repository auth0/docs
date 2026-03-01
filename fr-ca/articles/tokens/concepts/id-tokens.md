---
title: ID Tokens
description: Understand how ID Tokens are used in token-based authentication to cache user profile information and provide it to a client application.  
topics:
  - tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - concept
useCase:
  - add-login
  - authentication
---
# ID Tokens

ID Tokens are used in token-based authentication to cache user profile information and provide it to a client application, thereby providing better performance and experience. The application receives an ID Token after a user successfully authenticates, then consumes the ID Token and extracts user information from it, which it can then use to personalize the user's experience.

For example, let's say you have built a [regular web application](/applications), [registered it with Auth0](/dashboard/guides/applications/register-app-regular-web), and have [configured it to allow a user to log in using Google](/connections/social/google). Once a user logs in to your app, you can use the ID Token to gather information, such as name and email address, which you can then use to auto-generate and send a personalized welcome email.

## ID Token security

As with any other [JWTs](/tokens/concepts/jwts#security), you should follow [token best practices](/best-practices/token-best-practices) when using ID Tokens.

<%= include('../_includes/_validate-id-token') %>

## ID Token lifetime

By default, an ID Token is valid for 36000 seconds (10 hours). If there are security concerns, you can shorten the time period before the token expires, keeping in mind that one of the purposes of the token is to improve user experience by caching user information. 

To learn how to change the ID Token expiration time, see [Update ID Token Lifetime](/dashboard/guides/applications/update-token-lifetime).

## Keep reading

* [Get ID Tokens](/tokens/guides/get-id-tokens)
* [Validate ID Tokens](/tokens/guides/validate-id-tokens)
* [Invalid Token Errors](/troubleshoot/references/invalid-token)
* [JSON Web Tokens](/tokens/concepts/jwts)
* [ID Token Structure](/tokens/references/id-token-structure)
* [Scopes](/scopes)
* [Get Tokens Using Lock](/libraries/lock#implementing-lock)
