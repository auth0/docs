---
title: Get Access Tokens
description: Learn how to request Access Tokens using the Authorize endpoint when authenticating users and include the target audience and scope of access requested by the app and granted by the user.
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---
# Get Access Tokens

To get an [Access Token](/tokens/concepts/access-tokens), you need to request one when [authenticating](/application-auth) a user.

Auth0 makes it easy for your app to authenticate users using:

* [Quickstarts](/quickstarts): The easiest way to implement authentication, which can show you how to use <dfn data-key="universal-login">[Universal Login](/universal-login)</dfn>, the <dfn data-key="lock">[Lock widget](/lock)</dfn>, and Auth0's language and framework-specific [SDKs](/libraries#sdks). Our [Lock documentation](/libraries/lock) and [Auth0.js documentation](/libraries/auth0js) both provide specifics about retrieving an Access Token after authentication.
* [Authentication API](/api/authentication): If you prefer to roll your own, you can call our API directly. First, you need to know [which flow to use](/api-auth/which-oauth-flow-to-use) before following the appropriate [flow tutorial](/flows).

## Control Access Token audience 

When a user authenticates, you request an Access Token and include the target audience and scope of access in your request. This access is both requested by the application and granted by the user during authentication using the [Authorize endpoint](/api/authentication#authorize-application).

You may configure your tenant to always include a [default audience](/dashboard/reference/settings-tenant#api-authorization-settings).

| Token Use | Format | Requested Audience | Requested Scope |
|-----------|--------|--------------------|-------|
| [/userinfo endpoint](/api/authentication#get-user-info) | [Opaque](/tokens/concepts/access-tokens#opaque-access-tokens) | tenant name (`${account.namespace}`), no value for `audience` parameter, no `audience` parameter passed | `openid` |
| Auth0 Management API | [JWT](/tokens/concepts/jwts) | Management API v2 identifier (`https://{tenant}.auth0.com/api/v2/`) |  |
| Your own custom API | [JWT](/tokens/concepts/jwts) | The API Identifier for your custom API registered in the Auth0 Dashboard |  |

::: panel Multiple Audiences
Access Tokens can have multiple target audiences as long as your custom API's [signing algorithm](/tokens/concepts/signing-algorithms) is set to **RS256**. 

For example, if you specify an `audience` of your custom API identifier and a `scope` of `openid`, then the resulting Access Token's `aud` claim will be an array rather than a string, and the Access Token will be valid for both your custom API and for the `/userinfo` endpoint.
:::

::: panel Custom Domains and the Management API
Auth0 issues tokens with an issuer (`iss` claim) of whichever domain you used when requesting the token. [Custom domain](/custom-domains) users may use either their custom domain or their Auth0 domain. For example, say you have a custom domain of **https://login.northwind.com**. If you request an Access Token from **https://login.northwind.com/authorize**, your token's `iss` claim will be **https://login.northwind.com/**. However, if you request an Access Token from **https://northwind.auth0.com/authorize**, your token's `iss` claim will be **https://northwind.auth0.com/**. 

For an Access Token with the target audience of the [Auth0 Management API](/api/management/v2), if you have requested an Access Token from your custom domain, then you **must** call the Management API from your custom domain or else your Access Token will be considered invalid.
:::

## Renew Access Tokens

By default, an Access Token for a Custom API is valid for 86400 seconds (24 hours). If there are security concerns, you can [shorten the time period before the token expires](/dashboard/guides/apis/update-token-lifetime). 

After an Access Token has expired, you may want to renew your Access Token. To renew the Access Token, you can either reauthenticate the user using Auth0, or use a <dfn data-key="refresh-token">[Refresh Tokens](/tokens/concepts/refresh-tokens)</dfn>.

## Keep reading

* [Access Tokens](/tokens/concepts/access-tokens)
* [Use Access Tokens](/tokens/guides/use-access-tokens)
* [Validate Access Tokens](/tokens/guides/validate-access-tokens)
* [JSON Web Token](/tokens/concepts/jwts)
* [JSON Web Token Claims](/tokens/concepts/jwt-claims)
* [Token Best Practices](/best-practices/token-best-practices)
* [Quickstarts](/quickstarts)
* [Authentication and Authorization Flows](/flows)