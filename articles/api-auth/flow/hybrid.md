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

In this article, we will take a closer look at how this flow works.

## Overview of the flow

1. The web application initiates the authorization flow and redirects the browser to Auth0 so that the user can authenticate.

1. Auth0 authenticates the user via the browser. If this is the first time the user does this, they will see a consent page listing the permissions that Auth0 will give to the application

## How to implement the flow

## Keep reading