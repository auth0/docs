---
description: Describes how to call APIs from applications using the Hybrid Flow
topics:
  - authorization-code
  - api-authorization
  - implicit
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs Using the Hybrid Flow

The Hybrid Flow is an OIDC flow that draws from the following OAuth 2.0 grants:

1. Authorization Code Grant
2. Implicit Grant

## Background

With the Authorization Code Grant, Auth0 sends you an authorization code (authorization not required), which your app then sends in to retrieve tokens (authorization required). Your application authorizes itself with a Client ID and Client Secret stored securely on your server.

On the other hand, the Implicit Grant allows you to request Access Tokens without needing to authenticate your application. Auth0 verifies your app's identity based on the provided redirect URI. Because of this, you shouldn't utilize long-lived Access Tokens, and you cannot use Refresh Tokens.

## The Hybrid Flow

The Hybrid Flow allows you to take advantage of aspects of both the Authorization Code and Implicit Grants. You can request any combination of Access Tokens, ID Tokens, and authorization codes from either a server-side web application or a single page application (SPA).

For each interaction with Auth0, you will receive two (sometimes three) items in response:

1. An authorization code and an Access Token
1. An authorization code and an ID Token
1. An authorization code, an Access Token, and an ID Token

In this article, we will take a closer look at how this flow works.

## Benefits of the Hybrid Flow

The benefits of using the Hybrid Flow include the following:

* Can get tokens from the authorization *and* token endpoints
* Can send tokens via the user
* Can authorize the application
* Can use refresh tokens

## Overview of the flow

1. The web application initiates the authorization flow and redirects the browser to Auth0 (specifically, the [Authorization Endpoint](/api/authentication#authorization-code-grant)) so that the user can authenticate.

1. Auth0 authenticates the user via the browser. If this is the first time the user does this, they will see a consent page listing the permissions that Auth0 will give to the application.

1. Auth0 redirects the user to the app's **redirect URI** (as specified in the [request to the Authorization endpoint](/api/authentication#authorization-code-grant)) with an Authorization Code included in the querystring (the specific parameter is **code**). Depending on the **response type** indicated in the authorization request, one or more additional parameters may accompany the Authorization Code.

1. The application parses out the Authorization Code, sends it to Auth0's [token endpoint](/api/authentication?http#authorization-code), and requests that Auth0 return (in exchange) the Access Token. The application identifies itself during this request using its assigned Client ID and Client Secret.

1. If the request sent to the token endpoint is valid, Auth0 responds to the application's request with an ID Token, as well as an Access Token (and possibly a Refresh Token).

1. The application can now validate the ID Token and retrieve the end user's information. The application can also use the Access Token to call desired APIs.

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute the Hybrid Flow](/api-auth/tutorials/hybrid-flow).

## Keep reading

::: next-steps
- [Execute the Hybrid Flow](/api-auth/tutorials/hybrid-flow)
- [How to configure an API in Auth0](/apis)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application authentication for server-side web apps](/application-auth/server-side-web)
- [Application authentication for client-side web apps](client-side-web)
- [Tokens used by Auth0](/tokens)
:::