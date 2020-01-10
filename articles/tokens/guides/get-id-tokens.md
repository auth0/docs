---
title: Get ID Tokens
description: Learn how to request an ID Token when authenticating users that includes claims about the user by including OIDC scopes.
topics:
  - tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - how-to
useCase:
  - add-login
  - development
---
# Get ID Tokens

To get an [ID Token](/tokens/concepts/id-tokens), you need to request one when [authenticating](/application-auth) a user. Auth0 makes it easy for your app to authenticate users using:

* [Quickstarts](/quickstarts): The easiest way to implement authentication, which can show you how to use dfn data-key="universal-login">[Universal Login](/universal-login)</dfn>, the <dfn data-key="lock">[Lock widget](/lock)</dfn>, and Auth0's language and framework-specific [SDKs](/libraries#sdks). Our [Lock documentation](/libraries/lock) and [Auth0.js documentation](/libraries/auth0js) both provide specifics about retrieving an ID Token after authentication.
* [Authentication API](/api/authentication): If you prefer to roll your own, you can call our API directly. First, you need to know [which flow to use](/api-auth/which-oauth-flow-to-use) before following the appropriate [flow tutorial](/flows).

## Control ID Token contents

You control which claims about the authenticated user are included in the ID Token consumed by your application by including specific [OpenID Connect Scopes](/scopes/current/oidc-scopes) in the `scope` parameter when you request tokens while authenticating users.

::: note 
You can also create [custom claims](/tokens/concepts/jwt-claims#custom-claims), which are claims that you define, control, and add to a token using a rule. 
:::

As with any other [JWTs](/tokens/concepts/jwts#security), you should follow [token best practices](/best-practices/token-best-practices) when using ID Tokens and [validate an ID Token](/tokens/guides/validate-id-tokens) before assuming that its contents can be trusted.

## Renew ID Tokens

By default, an ID Token is valid for 36000 seconds (10 hours). If there are security concerns, you can [shorten the time period before the token expires](/dashboard/guides/applications/update-token-lifetime), but remember that one of the purposes of this token is to improve performance by caching user information. 

After an ID Token has expired, you may want to renew your ID Token. To renew the ID Token, you can either reauthenticate the user using Auth0, or use a <dfn data-key="refresh-token">[Refresh Token](/tokens/concepts/refresh-tokens)</dfn>.

## Keep reading

* [ID Tokens](/tokens/concepts/id-tokens)
* [Validate ID Tokens](/tokens/guides/validate-id-tokens)
* [JSON Web Tokens](/tokens/concepts/jwts)
* [JSON Web Token Claims](/tokens/concepts/jwt-claims)
* [OpenID Connect Scopes](/scopes/oidc-scopes)
* [Token Best Practices](/best-practices/token-best-practices)
* [Quickstarts](/quickstarts)
* [Authentication and Authorization Flows](/flows)