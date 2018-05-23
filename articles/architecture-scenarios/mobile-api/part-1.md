---
description: Solutions Overview for the Mobile + API architecture scenario
toc: true
---

# Mobile + API: Solutions Overview

<%= include('../../_includes/_api-overview-of-solution.md') %>

<%= include('../../_includes/_api-authentication-and-authorization.md') %>

## Proof Key for Code Exchange (PKCE)

OAuth 2 provides several grant types for different use cases. In this particular use case, we want to access the API from a mobile application, which will use the OAuth 2.0 [Proof Key for Code Exchange](/api-auth/grant/authorization-code-pkce) to do so.

The [Authorization Code Grant](/api-auth/grant/authorization-code) has some security issues, when implemented on native applications. For instance, a malicious attacker can intercept the `authorization_code` returned by Auth0 and exchange it for an [Access Token](/tokens/access-token) (and possibly a [Refresh Token](/tokens/refresh-token)).

The Proof Key for Code Exchange (PKCE) (defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)) is a technique used to mitigate this authorization code interception attack.

With PKCE, the Application creates, for every authorization request, a cryptographically random key called `code_verifier` and its transformed value called `code_challenge`, which is sent to Auth0 to get the `authorization_code`. When the Application receives the `authorization_code`, it will send the code and the `code_verifier` to Auth0's token endpoint to exchange them for the requested tokens.

![PKCE](/media/articles/architecture-scenarios/mobile-api/authorization-code-grant-pkce.png)

1. The native app initiates the flow and redirects the user to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters.
2. Auth0 redirects the user to the native app with an `authorization_code` in the querystring.
3. The native app sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0. This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-).
4. Auth0 validates this information and returns an `access_token` (and optionally a `refresh_token`).
5. The native app can use the `access_token` to call the API on behalf of the user.

## Authorization Extension

The [Auth0 Authorization Extension](/extensions/authorization-extension) allows you to provide authorization support in your application, by assigning Roles, Groups and Permissions to Users. 

The Authorization Extension creates a [Rule](/rules) which will augment the [User profile](/rules/current#rule-syntax) during the authentication flow with the Roles, Groups and Permissions assigned to the user. You can then use this information to ensure that the `access_token` issued to a user only contains scopes which are allowed according to the permissions defined in the Authorization Extension.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/mobile-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/application/mobile-api/part-2"]
}) %>