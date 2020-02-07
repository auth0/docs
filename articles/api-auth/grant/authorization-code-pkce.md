---
description: Describes the call APIs from mobile apps using the Authentication Code Grant (PKCE).
topics:
  - authorization-code
  - pkce
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs from Mobile Apps

To access an API from a [mobile app](/quickstart/native), you need to implement the **Authorization Code using Proof Key for Code Exchange (PKCE)** OAuth 2.0 grant. In this document, we will see how this flow works.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## Overview of the flow

The [Authorization Code Grant](/api-auth/grant/authorization-code) has some security issues when implemented on native applications. For instance, a malicious attacker can intercept the `authorization_code` returned by Auth0 and exchange it for an <dfn data-key="access-token">Access Token</dfn> (and possibly a <dfn data-key="refresh-token">Refresh Token</dfn>).

The **Proof Key for Code Exchange (PKCE)** (defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)) is a technique used to mitigate this authorization code interception attack.

With PKCE, the application creates, for every authorization request, a cryptographically random key called `code_verifier` and its transformed value called `code_challenge`, which is sent to Auth0 to get the `authorization_code`. When the application receives the `authorization_code`, it will send the code and the `code_verifier` to Auth0's token endpoint to exchange them for the requested tokens.

![Authorization Code Grant using PKCE](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. The native application initiates the flow and redirects the user to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters.

 2. Auth0 redirects the user to the native application with an `authorization_code` in the querystring.

 3. The native application sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0. This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-).

 4. Auth0 validates this information and returns an Access Token (and optionally a Refresh Token).

 5. The native application can use the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the native application is the Client, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

## Rules

[Rules](/rules) will run for the Authorization Code (PKCE) grant. If you wish to execute special logic unique to the Authorization Code grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code grant.

For details on how to implement this, refer to [Execute an Authorization Code Grant Flow with PKCE: Customize the Tokens](/api-auth/tutorials/authorization-code-grant-pkce#optional-customize-the-tokens).

## Keep reading

::: next-steps
- [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)
- [How to configure an API in Auth0](/apis)
- [Tokens](/tokens)
- [Application Authentication for Mobile & Desktop Apps](/application-auth/mobile-desktop)
:::
