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

The Hybrid Flow is an implementation that draws from the Authorization Code Grant and Implicit Grant. This means that you can return tokens from the Authorization Endpoint *and* the Token Endpoint using the Hybrid Flow.

For each interaction with Auth0, you will receive two (sometimes three) items in response:

1. An authorization code and an Access Token
1. An authorization code and an ID Token
1. An authorization code, an Access Token, and an ID Token

In this article, we will take a closer look at how this flow works.

## Overview of the flow

1. The web application initiates the authorization flow and [redirects the browser to Auth0](/api/authentication#authorization-code-grant) so that the user can authenticate.

1. Auth0 authenticates the user via the browser. If this is the first time the user does this, they will see a consent page listing the permissions that Auth0 will give to the application

1. Auth0 redirects the user to the app's **redirect URI** (as specified in the [request to the Authorization endpoint](/api/authentication#authorization-code-grant)) with an Authorization Code included in the querystring (the specific parameter is **code**).

1. The application parses out the Authorization Code, sends it to Auth0's [token endpoint](/api/authentication?http#authorization-code), and requests that Auth0 return (in exchange) the Access Token. The application identifies itself during this request using its assigned Client ID and Client Secret.

## How to implement the flow

### Requesting an authorization code and an Access Token from the authorization endpoint

### Requesting an authorization code and an ID Token from the authorization endpoint

### Requesting an authorization code, an Access Token, and an ID Token from the authorization endpoint

## Keep reading