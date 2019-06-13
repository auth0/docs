---
title: Access Tokens
description: Learn what Access Tokens are and how you can use them with Auth0.
topics:
  - tokens
  - access-tokens
contentType:
  - concept
useCase:
  - invoke-api
---
# Access Tokens

An Access Token is a credential that can be used by an application to access an API. Access Tokens can be either an opaque string or a JSON web token. They inform the API that the bearer of the token has been authorized to access the API and perform specific actions specified by the **scope** that has been granted. 

<dfn data-key="access-token">Access Token</dfn> should be used as a **Bearer** credential and transmitted in an HTTP **Authorization** header to the API. 

Depending on how your application needs to use the <dfn id="access-token">Access Token</dfn>, you can:

* [Get Access Tokens](/tokens/guides/access-token/get-access-tokens) using any OAuth 2.0-compatible library or you can use one of Auth0's libraries that work with Auth0 endpoints.
* [Use Access Tokens](/tokens/guides/access-token/use-access-tokens) either in server-to-server or custom API interactions.
* [Add Custom Claims](/tokens/add-custom-claims) using [Rules](/rules).
* [Set Access Token lifetime](/tokens/guides/access-token/set-access-token-lifetime).

<dfn id="access-token">Access Token</dfn> come in [two formats](/tokens/reference/access-token/access-token-formats): opaque strings and JSON Web Tokens (JWTs).
