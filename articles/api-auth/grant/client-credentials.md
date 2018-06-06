---
description: Describes how to call APIs from server processes using the Client Credentials Grant.
---
# Calling APIs from a Service

<%= include('../../_includes/_pipeline2') %>

The OAuth 2.0 grant that machine-to-machine interfaces utilize in order to access an API, is the **Client Credentials Grant**. In this document we will see how this flow works.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## Overview of the flow

With **Client Credentials Grant** (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) a Machine-to-Machine Client (a CLI, a daemon, or a Service running on your backend), can directly ask Auth0 for an `access_token`, by using its Client Credentials (__Client Id__ and __Client Secret__) to authenticate. In this case the token represents the Non Interactive Client itself, instead of an end user.

![Client Credentials Grant Flow](/media/articles/api-auth/client-credentials-grant.png)

1. The application authenticates with Auth0 using its __Client Id__ and __Client Secret__.

1. Auth0 validates this information and returns an `access_token`.

1. The application can use the `access_token` to call the API on behalf of itself.

::: note
In OAuth 2.0 terms, the non interactive app is the Client, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute a Client Credentials Grant](/api-auth/tutorials/client-credentials). Before you do so, you have to set up the Grant first either [using the Dashboard](/api-auth/config/using-the-auth0-dashboard) or [using the Management API](/api-auth/config/using-the-management-api).

## Keep reading

::: next-steps
- [How to implement a Client Credentials flow](/api-auth/tutorials/client-credentials)
- [How to configure an API in Auth0](/apis)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [How to change the scopes and add custom claims to the tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
- [Tokens used by Auth0](/tokens)
:::
