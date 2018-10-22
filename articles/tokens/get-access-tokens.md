---
description: How to get Access Tokens
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# Get Access Tokens

Access Tokens are issued through Auth0's OAuth 2.0 endpoints: 
* [/authorize](/api/authentication#authorize-application)
* [/oauth/token](/api/authentication#get-token)

You can get Access Tokens from the following Auth0 endpoints:
  * **Server-side web app**, please see the docs for the [Authorization Code Grant](/api-auth/grant/authorization-code)
  * **Mobile app**, please see the docs for the [Authorization Code using Proof Key for Code Exchange (PKCE) Grant](/api-auth/grant/authorization-code-pkce)
  * **Client-side app**, please see the docs for the [Implicit Grant](/api-auth/grant/implicit)
  * **Command line interface**, please see the docs for the [Client Credentials Grant](/api-auth/grant/client-credentials)
  * **Trusted application**, please see the docs for the [Resource Owner Password Grant](/api-auth/grant/password)

For a list of widgets and SDKs that can help you implement Auth0, see our [Libraries](/libraries).

Calls to the Lock widget will return an Access Token as shown in the [Lock documentation](/libraries/lock).

If you need only a client-side library for authorization and authentication, use [auth0.js](/libraries/auth0js).
