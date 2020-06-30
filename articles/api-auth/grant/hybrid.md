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

The Hybrid Flow is an <dfn data-key="openid">OpenID Connect (OIDC)</dfn> flow that draws from the following:

1. [Authorization Code Flow](/flows/concepts/auth-code)
2. [Implicit Flow](/flows/concepts/implicit)

The Hybrid Flow enables use cases where your application can immediately use an ID token to access information about the user while obtaining an authorization code that can be exchanged for an Access Token (therefore gaining access to protected resources for an extended period of time).

## Background

With the [Authorization Code Flow](/flows/concepts/auth-code), Auth0 sends you an authorization code, which your app then sends in to retrieve tokens. Your application authenticates itself with a Client ID and Client Secret stored securely on your server.

On the other hand, the [Implicit Flow](/flows/concepts/implicit) allows you to request Access Tokens without needing to authenticate your application. Auth0 verifies your app's identity based on the provided redirect URI. Because of this, you shouldn't utilize long-lived Access Tokens, and you cannot use <dfn data-key="refresh-token">Refresh Tokens</dfn>.

## The Hybrid Flow

The Hybrid Flow allows you to take advantage of aspects of both the Authorization Code and Implicit Grants. For each interaction with Auth0, you will receive two (sometimes three) items in response:

1. An authorization code and an Access Token
1. An authorization code and an ID Token
1. An authorization code, an Access Token, and an ID Token

In this article, we will take a closer look at how this flow works.

## Overview of the flow

1. The web application initiates the authorization flow and redirects the browser to Auth0 (specifically, the [Authorization Endpoint](/api/authentication#authorization-code-grant)) so that the user can authenticate.

1. Auth0 authenticates the user via the browser. If this is the first time the user does this, they will see a consent page listing the permissions that Auth0 will give to the application.

1. Auth0 redirects the user to the app with an [Access Token](/tokens/access-token) and (optionally) an [ID Token](/tokens/concepts/id-tokens) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment.

1. The application parses out the Authorization Code, sends it to Auth0's [token endpoint](/api/authentication?http#authorization-code), and requests that Auth0 return (in exchange) the Access Token. The application identifies itself during this request using its assigned Client ID and Client Secret.

1. If the request sent to the token endpoint is valid, Auth0 responds to the application's request with an ID Token, as well as an Access Token (and possibly a Refresh Token).

1. The application can now validate the ID Token and retrieve the end user's information. The application can also use the Access Token to call desired APIs.

  If the application received an ID Token from the Authorization endpoint already, it should have validated the token's signature, `c_hash`, and any other claims as defined. You must validate such tokens [the way you would for an Implicit Flow](https://openid.net/specs/openid-connect-core-1_0.html#ImplicitIDTValidation).

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute the Hybrid Flow](/api-auth/tutorials/hybrid-flow).

## Keep reading

::: next-steps
- [Execute the Hybrid Flow](/api-auth/tutorials/hybrid-flow)
- [How to configure an API in Auth0](/apis)
- [Tokens](/tokens)
- [Application authentication for regular web apps](/flows/concepts/auth-code)
- [Application authentication for single-page apps](/flows/concepts/implicit)
:::