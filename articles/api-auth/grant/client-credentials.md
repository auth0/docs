---
description: Describes how to call APIs from server processes using the Client Credentials Grant.
---

# Calling APIs from a Service

The OAuth 2.0 grant that machine-to-machine interfaces utilize in order to access an API, is the **Client Credentials Grant**. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview of the flow

With **Client Credentials Grant** (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) a Non Interactive Client (a CLI, a daemon, or a Service running on your backend), can directly ask Auth0 for an `access_token`, by using its Client Credentials (__Client Id__ and __Client Secret__) to authenticate. In this case the token represents the Non Interactive Client itself, instead of an end user.

![Client Credentials Grant Flow](/media/articles/api-auth/client-credentials-grant.png)

1. The application authenticates with Auth0 using its __Client Id__ and __Client Secret__.

1. Auth0 validates this information and returns an `access_token`.
 
1. The application can use the `access_token` to call the API on behalf of itself.

  __NOTE__: In OAuth 2.0 terms, the non interactive app is the _Client_, the end user the _Resource Owner_, the API the _Resource Server_, the browser the _User Agent_, and Auth0 the _Authorization Server_.

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute a Client Credentials Grant](/api-auth/tutorials/client-credentials). Before you do so, you have to set up the Grant first either [using the Dashboard](/api-auth/config/using-the-auth0-dashboard) or [using the Management API](/api-auth/config/using-the-management-api).

## Keep reading

- [How to implement a Client Credentials flow](/api-auth/tutorials/client-credentials)
- [How to configure an API in Auth0](/apis)
- [How to set up a Client Credentials Grant using the Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [How to set up a Client Credentials Grant using the Management API](/api-auth/config/using-the-management-api)
- [How to change the scopes and add custom claims to the tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks).
- [Backend Quickstarts](/quickstart/backend)
- [Authentication API: POST /oauth/token](/api/authentication#client-credentials)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
- [RFC 6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
