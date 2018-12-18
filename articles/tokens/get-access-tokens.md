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
  * **Server-side web app**: See [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow)
  * **Mobile app**: See [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow)
  * **Client-side app**: See [Single-Page Login Flow](/flows/concepts/single-page-login-flow)
  * **Command line interface**: See [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow)
  * **Trusted application**: See [Resource Owner Password Grant](/api-auth/grant/password)

For a list of widgets and SDKs that can help you implement Auth0, see our [Libraries](/libraries).

Calls to the Lock widget will return an Access Token as shown in the [Lock documentation](/libraries/lock).

If you need only a client-side library for authorization and authentication, use [auth0.js](/libraries/auth0js).
