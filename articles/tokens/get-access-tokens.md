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
  * **Server-side web app**: See [Authorization Code Flow](/flows/concepts/auth-code)
  * **Mobile app**: See [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
  * **Client-side app**: See [Implicit Flow](/flows/concepts/implicit)
  * **Command line interface**: See [Client Credentials Flow](/flows/concepts/client-credentials)
  * **Trusted application**: See [Resource Owner Password Grant](/api-auth/grant/password)

For a list of widgets and SDKs that can help you implement Auth0, see our [Libraries](/libraries).

Calls to the Lock widget will return an Access Token as shown in the [Lock documentation](/libraries/lock).

If you need only a client-side library for authorization and authentication, use [auth0.js](/libraries/auth0js).
