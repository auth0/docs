---
description: Learn how to call APIs from server processes using the Client Credentials Grant.
topics:
  - client-credentials
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Client Credentials Grant

The **Client Credentials Grant** (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) allows an application to request an Access Token using its __Client Id__ and __Client Secret__. It is used for Machine-to-Machine Applications (any CLI, daemon, or Service running on your backend) where the token is issued to the application itself rather than to an end user.

To be capable of performing the Client Credentials Grant, the Application must first have the [Client Credentials grant type](/applications/application-grant-types) enabled. By default, it is enabled for Machine-to-Machine Applications and Regular Web Applications.

## What is the Client Credentials Grant flow?

![Client Credentials Grant Flow](/media/articles/api-auth/client-credentials-grant.png)

1. The application authenticates with Auth0 using its __Client Id__ and __Client Secret__.

1. Auth0 validates this information and returns an Access Token.

1. The application uses the Access Token to call the API on its own behalf.

::: note
In OAuth 2.0 terms, the application is the Client, the end user is the Resource Owner, the API is the Resource Server, the browser is the User Agent, and Auth0 is the Authorization Server.
:::

## How do I implement the Client Credentials Grant flow?

Learn how to implement this grant flow using Auth0 at [Execute a Client Credentials Grant](/api-auth/tutorials/client-credentials).

## Keep reading

::: next-steps
- [How to implement a Client Credentials flow](/api-auth/tutorials/client-credentials)
- [How to configure an API in Auth0](/api-auth/guides/configure-api)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [How to change the scopes and add custom claims to the tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
- [Tokens used by Auth0](/tokens)
:::
