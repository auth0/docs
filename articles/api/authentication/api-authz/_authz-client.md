# Authorize Application

To begin an OAuth 2.0 Authorization flow, your application should first send the user to the authorization URL.

## Authorize endpoint
The purpose of this call is to obtain consent from the user to invoke the API (specified in <dfn data-key="audience">`audience`</dfn>) and do certain things (specified in <dfn data-key="scope">`scope`</dfn>) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given. If you alter the value in `scope`, Auth0 will require consent to be given again.

The OAuth 2.0 flows that require user authorization are:
- [Authorization Code Flow](/flows/concepts/auth-code)
- [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
- [Implicit Flow](/flows/concepts/implicit)

The [Resource Owner Password Grant](/api-auth/grant/password) and [Client Credentials Flow](/flows/concepts/client-credentials) do not use this endpoint since there is no user authorization involved. Instead, they directly invoke the `POST /oauth/token` endpoint to retrieve an <dfn data-key="access-token">Access Token</dfn>.

Based on the OAuth 2.0 flow you are implementing, the parameters slightly change. To determine which flow is best suited for your case, refer to: [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use).

## Get Token
For token-based authentication, use the `oauth/token` endpoint to get an access token for your application to make authenticated calls to a secure API. Optionally, you can also retrieve an ID Token and a <dfn data-key="refresh-token">Refresh Token</dfn>. ID Tokens contains user information in the form of scopes you application can extract to provide a better user experience. Refresh Tokens allow your application to request a new access token once the current token expires without interruping the user experience.  To learn more, read [ID Tokens](https://auth0.com/docs/secure/tokens/id-tokens) and [Refresh Tokens](https://auth0.com/docs/secure/tokens/refresh-tokens).

Note that the only OAuth 2.0 flows that can retrieve a Refresh Token are:
- [Authorization Code Flow (Authorization Code)](/flows/concepts/auth-code)
- [Authorization Code Flow with PKCE (Authorization Code with PKCE)](/flows/concepts/auth-code-pkce)
- [Resource Owner Password](/api-auth/grant/password)
- [Device Authorization Flow](/flows/concepts/device-auth)
- Token Exchange\*