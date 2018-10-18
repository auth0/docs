---
description: Learn how to call APIs from mobile apps using the Authorization Code Grant with PKCE.
topics:
  - authorization-code
  - pkce
  - api-authorization
  - grants
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Authorization Code Grant Using PKCE

<%= include('../../_includes/_pipeline2') %>

The Authorization Code Grant Using PKCE allows an application to request an Access Token, and optionally, an ID Token and a Refresh Token, in exchange for an Authorization Code and code verifier. It is used for [mobile apps](/quickstart/native).

The [Authorization Code Grant](/api-auth/grant/authorization-code) has some security issues when implemented on [mobile apps](/quickstart/native). Specifically, a malicious attacker can intercept the `authorization_code` returned by Auth0. To mitigate this attack, use the **Proof Key for Code Exchange (PKCE)** (defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)) enhancement to the [Authorization Code Grant](/api-auth/grant/authorization-code).

With PKCE-enhanced security, for every authorization request, the application creates a cryptographically-random key called the `code_verifier` and its transformed value called the `code_challenge`, and uses these to get the requested tokens.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::


## What is the Authentication Code Grant Using PKCE flow?

![Authorization Code Grant using PKCE](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. The native app initiates the flow and redirects the user to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters.

 2. Auth0 redirects the user to the native app with an `authorization_code` in the querystring.

 3. The native app sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0. This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-).

 4. Auth0 validates this information and returns an Access Token (and optionally, a Refresh Token).

 5. The native app uses the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the native app is the Client, the end user is the Resource Owner, the API is the Resource Server, the browser is the User Agent, and Auth0 is the Authorization Server.
:::

## How do I implement the Authorization Code Grant Using PKCE flow?

Learn how to implement this grant flow using Auth0 at [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).

## Will rules run for the Authorization Code Grant Using PKCE flow?

[Rules](/rules) will run for the Authorization Code Grant Using PKCE. If you wish to execute special logic unique to the Authorization Code Grant Using PKCE, check that the `context.protocol` property in your rule contains a value of `oidc-basic-profile`. If it does, then the rule is running during the Authorization Code Grant Using PKCE.

For implementation details, refer to [Execute an Authorization Code Grant Flow with PKCE: Customize the Tokens](/api-auth/tutorials/authorization-code-grant-pkce#optional-customize-the-tokens).

## Keep reading

::: next-steps
- [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)
- [How to configure an API in Auth0](/api-auth/guides/configure-api)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application Authentication for Mobile & Desktop Apps](/application-auth/mobile-desktop)
- [Tokens used by Auth0](/tokens)
:::
