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

<dfn data-key="access-token">Access Tokens</dfn> are issued through Auth0's OAuth 2.0 endpoints:

* [/authorize](/api/authentication#authorize-application)
* [/oauth/token](/api/authentication#get-token)

You can get Access Tokens from the following Auth0 endpoints:
  * **Server-side web app**: See [Authorization Code Flow](/flows/concepts/auth-code)
  * **Mobile app**: See [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
  * **Client-side app**: See [Implicit Flow](/flows/concepts/implicit)
  * **Command line interface**: See [Client Credentials Flow](/flows/concepts/client-credentials)
  * **Trusted application**: See [Resource Owner Password Grant](/api-auth/grant/password)

For a list of widgets and SDKs that can help you implement Auth0, see our [Libraries](/libraries).

Calls to the <dfn data-key="lock">Lock widget</dfn> will return an Access Token as shown in the [Lock documentation](/libraries/lock).

If you need only a client-side library for authorization and authentication, use [auth0.js](/libraries/auth0js).




::: panel Token issuance
Auth0 issues tokens with the **iss** claim of whichever domain you used with the request. Custom domain users might use either, their custom domain, or their Auth0 domain. For example, if you used **https://northwind.auth0.com/authorize...** to obtain an Access Token, the **iss** claim of the token you receive will be **https://northwind.auth0.com/**. If you used your custom domain **https://login.northwind.com/authorize...**, the **iss** claim value will be **https://login.northwind.com/**. 

If you get an Access Token for the [Management API](/api/management/v2) using an authorization flow with your custom domain, you **must** call the Management API using the custom domain (your token will be considered invalid otherwise).
:::