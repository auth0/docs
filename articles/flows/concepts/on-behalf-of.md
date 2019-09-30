---
title: On Behalf Of Flow
description: Learn how the On Behalf Of Flow works and why you should use it.
topics:
  - on-behalf-of
  - token-exchange
  - api-authorization
  - grants
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# On Behalf Of Flow

With applications that access APIs via a middle-tier API, it can be useful to allow an API to get Access Tokens for other APIs using only the Access Token already issued for itself&mdash;and without additional user interaction. To do this, a source API uses a version of the Token Exchange flow (drafted in [OAuth 2.0, Draft 19](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-19)) to initiate a second authorization process and get an Access Token for another, target API. Auth0 supports the impersonation path the Token Exchange flow.

## How it works

![On Behalf Of Flow](/media/articles/flows/concepts/on-behalf-of.png)

1. The user clicks **Login** within the application.
2. Your application requests tokens using whichever authentication flow is appropriate:
    * [Add Login to Your Native/Mobile App](/microsites/add-login/add-login-native-mobile-app)
    * [Add Login to Your Regular Web App](/microsites/add-login/add-login-regular-web-app)
    * [Add Login to Your Single-Page App](/microsites/add-login/add-login-single-page-app)
3. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>).
4. Your application uses the Access Token to call the Source API.
5. The Source API authenticates with the Auth0 Authorization Server ([**/oauth/token** endpoint](/api/authentication#token-exchange)) to request an Access Token that will allow it to access the Target API.
6. Your Auth0 Authorization Server responds with a second Access Token.
7. The Source API uses the second Access Token to call the Target API.
8. The Target API responds with requested data.

## How to implement it

The easiest way to implement the On Behalf Of Flow is to follow our tutorial: [Call API Using On Behalf Of Flow](/flows/guides/on-behalf-of/call-api-on-behalf-of).

## Keep reading

- Auth0 offers many ways to customize your tokens using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)