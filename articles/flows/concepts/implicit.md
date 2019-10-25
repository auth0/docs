---
title: Implicit Flow
description: Learn how the Implicit flow works and why you should use it for single-page apps (SPAs).
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
# Implicit Flow

During authentication, single-page applications (SPAs) have some special requirements. Since the SPA is a public client, it is unable to securely store information such as a Client Secret. As such, a special authentication flow exists called the OAuth 2.0 Implicit Flow (defined in [OAuth 2.0 RFC 6749, section 4.2](https://tools.ietf.org/html/rfc6749#section-4.2)). Using the Implicit Flow streamlines authentication by returning tokens without introducing any unnecessary additional steps.

## How it works

For SPAs, you should use the Implicit Flow in which issued tokens are short-lived. <dfn data-key="refresh-token">Refresh Tokens</dfn> are not available in this flow. 

![Implicit Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-implicit.png)

1. The user clicks **Login** within the SPA.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint) passing along a `response_type` parameter that indicates the type of requested credential.
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the SPA.
5. Your Auth0 Authorization Server redirects the user back to the SPA with any of the following, depending on the provided `response_type` parameter (step 2):
* An ID Token;
* An Access Token;
* An ID Token and an Access Token.
6. Your SPA can use the Access Token to call an API.
7. The API responds with requested data.

## How to implement it

The easiest way to implement the Implicit Flow is to follow our [Single-Page App Quickstarts](/quickstart/spa).

You can also use our [SDKs](/libraries).

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Implicit Flow](/flows/guides/implicit/add-login-implicit) or [Call Your API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit).

## SPAs and refresh tokens

::: warning
The Access Token is exposed on the client side. The implicit flow does not return a Refresh Token because the browser cannot keep it private.  
:::

While SPAs using the Implicit Grant cannot use [Refresh Tokens](/tokens/refresh-token), there are other ways to provide similar functionality. 

- Use `prompt=none` when invoking the [/authorize](/api/authentication#implicit-grant) endpoint. This won't display the login dialog or the consent dialog. For more information, see [Silent Authentication](/api-auth/tutorials/silent-authentication). 
- Call `/authorize` from a hidden iframe and extract the new [Access Token](/tokens/access-tokens) from the parent frame, the user will not see the redirects happening.

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)
- [Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use)
