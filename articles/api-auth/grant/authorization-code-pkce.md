---
description: Learn how the mobile login flow works and why you should use it for mobile apps.
topics:
  - authorization-code
  - pkce
  - api-authorization
  - grants
  - authentication
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Mobile Login Flow

<%= include('../../_includes/_pipeline2') %>

When you are building a [mobile app](/quickstart/native), the mobile login flow is the best way to control access to your app. Each login flow builds off of an [OAuth 2.0](/protocols/oauth2) grant; in this case, we use the Authorization Code Grant with Proof Key for Code Exchange (PKCE, pronounced "pixie") enhancement (as defined in [RFC 7636](https://tools.ietf.org/html/rfc7636)).

## What is the mobile login flow?

The Authorization Code Grant with PKCE is similar to the standard Authorization Code Grant, but contains a few extra steps.

![Authorization Code Grant using PKCE](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. Your app generates a cryptographically-random key called a `code_verifier` and creates a `code_challenge` from the verifier. Then it initiates the flow and redirects the user to Auth0 ([/authorize endpoint](/api/authentication#authorization-code-grant-pkce-)), sending the `code_challenge` and `code_challenge_method` parameters. The user authenticates.

 2. Auth0 redirects the user to your app with an `authorization_code` in the querystring.

 3. Your app sends the `authorization_code` and `code_verifier` together with the `redirect_uri` and the `client_id` to Auth0 ([/oauth/token endpoint](/api/authentication?http#authorization-code-pkce-)).

 4. Auth0 validates this info and returns an Access Token and an ID Token (and optionally, a Refresh Token).

 5. Your app can use the Access Token to call an API on behalf of the user. For example, you may want to call Auth0's /userinfo API and retrieve the user's profile.

::: note
In OAuth 2.0 terms, your mobile app is the Client, the user is the Resource Owner, the API is the Resource Server, the browser is the User Agent, and Auth0 is the Authorization Server.

If you need a refresher on the OAuth 2.0 protocol, visit [OAuth 2.0](/protocols/oauth2).
:::

## Why should I use the mobile login flow?

This flow provides an extra level of security, which is necessary because:

* mobile apps cannot securely store a client secret
* mobile redirects use app:// protocols, which allow malicious attackers to intercept the `authorization_code` as it is being passed through the mobile operating system

With PKCE, the code verifier acts like a secret. And since your code verifier and code challenge are both sent over HTTPS, malicious attackers can only intercept the authorization code.

## How do I implement the mobile login flow?

Learn how to implement this flow at [Implement the Mobile Login Flow](/api-auth/tutorials/authorization-code-grant-pkce).

## Will rules run for the mobile login flow?

Yes, [rules](/rules) will run for the mobile login flow. If you want to execute special logic for this flow, check that the `context.protocol` property in your rule contains a value of `oidc-basic-profile`. If it does, then the rule is running during the mobile login flow.

Learn how to implement this at [Implement the Mobile Login Flow: Customize the Tokens](/api-auth/tutorials/authorization-code-grant-pkce#optional-customize-the-tokens).

## Keep reading

::: next-steps
- [Implement the Mobile Login Flow](/api-auth/tutorials/mobile-login-flow)
- [How to configure an API in Auth0](/api-auth/guides/configure-api)
- [Why you should always use Access Tokens to secure APIs](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application Authentication for Mobile & Desktop Apps](/application-auth/mobile-desktop)
- [Tokens used by Auth0](/tokens)
:::
