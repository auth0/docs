---
title: Implicit Flow with Form Post
description: Learn how the Implicit flow with Form Post works and why you should use it for single-page apps (SPAs) that need only an ID Token to perform user authentication.
topics:
  - authorization-code
  - implicit
  - hybrid
  - api-authorization
  - grants
  - authentication
  - SPA
  - single-page apps
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Implicit Flow with Form Post

::: warning
The [OAuth 2.0 BCP](https://tools.ietf.org/html/draft-ietf-oauth-security-topics-09#section-2.1.2) states that you **should not** use the Implicit Flow to request [Access Tokens](/tokens/access-tokens) from the Authorization Server. For this reason, we recommend that you use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce) if your single-page app (SPA) requires Access Tokens for [Cross-Origin Resource Sharing (CORS)](/cross-origin-authentication#what-is-cross-origin-authentication) requests. For a more detailed explanation, see our blog post: [OAuth2 Implicit Grant and SPA: Everything you always wanted to know (but were afraid to ask)](https://auth0.com/blog/oauth2-implicit-grant-and-spa/).
:::

As an alternative to the [Authorization Code Flow](/flows/concepts/auth-code), the OAuth 2.0 spec includes the Implicit Flow intended for <dfn data-key="public-client">Public Clients</dfn>, or applications which are unable to securely store <dfn data-key="client-secret">Client Secrets</dfn>. As part of the authorization response, the Implicit Flow returns an <dfn data-key="access-token">Access Token</dfn> rather than an <dfn data-key="authorization-code">Authorization Code</dfn> that must be exchanged at the <dfn data-key="token-endpoint">token endpoint</dfn>.

While this is no longer considered a best practice for requesting Access Tokens, it does offer a streamlined workflow if the application needs only an <dfn data-key="id-token">ID Token</dfn> to perform user authentication.

## How it works

In the Implicit Flow, issued tokens are short-lived, and <dfn data-key="refresh-token">Refresh Tokens</dfn> are not available.

::: warning
You should use this flow for login-only use cases; if you need to request Access Tokens while logging the user in so you can call your API, use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce).
:::

![Implicit Flow with Form Post Authentication Sequence](/media/articles/flows/concepts/auth-sequence-implicit-form-post.png)

1. The user clicks **Login** in the app.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint) passing along a `response_type` parameter of `id_token` that indicates the type of requested credential. It also passes along a `response_mode` parameter of `form_post` to ensure security.
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the app.
5. Your Auth0 Authorization Server redirects the user back to the app with an ID Token.

## How to implement it

You can use our [Express OpenID Connect SDK](https://www.npmjs.com/package/express-openid-connect) to securely implement the Implicit Flow. If you use our [Javascript SDKs](/libraries), please ensure you are implementing mitigations that are appropriate for your architecture.

::: note
The [Auth0 Single-Page App SDK](/libraries/auth0-spa-js) and [Single-Page Quickstarts](/quickstart/spa) adhere to the new recommendations and use the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce).
:::

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Implicit Flow with Form Post](/flows/guides/implicit/add-login-implicit).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens](/tokens)
- [Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use)
