---
description: How to request tokens for your applications.
---

# How to implement the Client Credentials Grant

<%= include('../../_includes/_pipeline2') %>

## Prerequisites

To start using the Client Credentials Grant, the following must apply:
- You have configured a Non Interactive Client at the Dashboard, for your application.
- You have configured an API at the Dashboard, for your API.
- You have authorized the Non Interactive Client to access your API.

You can do this either [using the Dashboard](/api-auth/config/using-the-auth0-dashboard) or [using the Management API](/api-auth/config/using-the-management-api).

## Ask for a Token

To ask Auth0 for tokens for any of your authorized client applications, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"YOUR_API_IDENTIFIER\"}"
  }
}
```

Where:

* `grant_type`: This must be `client_credentials`.
* `client_id`: Your application's Client ID. You can find this value at the [Settings tab of the Non Interactive Client](${manage_url}/#/clients).
* `client_secret`: Your application's Client Secret. You can find this value at the [Settings tab of the Non Interactive Client](${manage_url}/#/clients).
* `audience`: The value of the **Identifier** field on the [Settings tab of the API](${manage_url}/#/apis).

The response contains a [signed JSON Web Token](/jwt), the token's type (which is `Bearer`), and in how much time it expires in [Unix time](https://en.wikipedia.org/wiki/Unix_time) (86400 seconds, which means 24 hours).

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

If you [decode the `access_token`](https://jwt.io/#debugger-io) you will see that it contains the following claims:

```json
{
  "iss": "https://${account.namespace}/",
  "sub": "YOUR_NON_INTERACTIVE_CLIENT_ID@clients",
  "aud": "YOUR_API_IDENTIFIER",
  "exp": 1489715431, // unix timestamp of the token's expiration date,
  "iat": 1489679431, // unix timestamp of the token's creation date,
  "scope": ""
}
```

## Modify Scopes and Claims

You can change the scopes and add custom claims to the `access_token` you got, using [Hooks](/hooks).

Hooks allow you to customize the behavior of Auth0 using Node.js code. They are actually Webtasks, associated with specific extensibility points of the Auth0 platform (like the Client Credentials grant). Auth0 invokes the Hooks at runtime to execute your custom logic.

For more information and details on how to do that refer to [Using Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks).


## Verify the Token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).

## Keep reading

- [Calling APIs from a Service](/api-auth/grant/client-credentials)
- [How to configure an API in Auth0](/apis)
- [Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [How to set up a Client Credentials Grant using the Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [How to set up a Client Credentials Grant using the Management API](/api-auth/config/using-the-management-api)
- [How to change the scopes and add custom claims to the tokens using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks).
- [Backend Quickstarts](/quickstart/backend)
- [Authentication API: POST /oauth/token](/api/authentication#client-credentials)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
- [RFC 6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
