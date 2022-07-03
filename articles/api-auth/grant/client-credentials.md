---
description: Describes how to call APIs from server processes using the Client Credentials Grant.
topics:
  - client-credentials
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Client Credentials Grant

The **Client Credentials Grant** (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) allows an application to request an Access Token using its __Client Id__ and __Client Secret__. It is used for non interactive applications (a CLI, a daemon, or a Service running on your backend) where the token is issued to the application itself, instead of an end user.

In order to be able to perform the Client Credentials Grant, the Application needs to have the [Client Credentials grant type](/applications/concepts/application-grant-types) enabled. Machine to Machine Applications and Regular Web Applications have it enabled by default. 

## Client Credentials Grant Flow

![Client Credentials Grant Flow](/media/articles/api-auth/client-credentials-grant.png)

1. The application authenticates with Auth0 using its __Client Id__ and __Client Secret__.

1. Auth0 validates this information and returns an Access Token.

1. The application can use the Access Token to call the API on behalf of itself.

::: note
In OAuth 2.0 terms, the application is the Client, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute a Client Credentials Grant](/api-auth/tutorials/client-credentials).

## Keep reading

::: next-steps
- [How to implement a Client Credentials flow](/api-auth/tutorials/client-credentials)
- [How to configure an API in Auth0](/apis)
- [Tokens](/tokens)
- [How to change the scopes and add custom claims to the tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
:::
