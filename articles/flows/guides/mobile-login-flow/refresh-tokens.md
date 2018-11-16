---
description: Learn how to refresh tokens while implementing the mobile login flow.
toc: false
topics:
  - api-authentication
  - oidc
  - authorization-code
  - pkce
  - mobile-login-flow
contentType: tutorial
useCase:
  - secure-api
  - call-api
  - add-login
---
# Refresh Tokens

A [Refresh Token](/tokens/refresh-token/current) is a special kind of token that contains the information required to obtain a new [Access Token](/tokens/overview-access-tokens), which is used to call an API. Usually, a user will need a new Access Token only after the previous one expires or when gaining access to a new resource for the first time.

You have already received a Refresh Token if you've been following this tutorial and completed the following:

* configured your API to allow offline access
* included the `offline_access` scope when you initiated the authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint






If you are requesting a Refresh Token for a mobile app using the corresponding Native Client (which is public) then you don't need to send the `client_secret` in the request since it's only needed for [confidential applications](/applications/application-types#confidential-applications).






## Use a Refresh Token

To refresh your token, using the Refresh Token you already got during authorization, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "queryString" : [],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"grant_type\": \"refresh_token\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"refresh_token\": \"YOUR_REFRESH_TOKEN\" }"
    },
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

Where:
- `grant_type`: The type of grant to execute (the `/token` endpoint is used for various grants, for more information refer to the [Authentication API](/api/authentication#get-token)). To refresh a token, use `refresh_token`.
- `client_id`: Your application's Client ID.
- `client_secret` (optional): Your application's Client Secret. Only required for [confidential applications](/applications/application-types#confidential-applications).
- `refresh_token`: The Refresh Token to use.

The response will include a new Access Token, its type, its lifetime (in seconds), and the granted scopes. If the scope of the initial token included `openid`, then a new ID Token will be in the response as well.

```json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

::: panel Rate limits
You should only ask for a new token if the Access Token has expired or you want to refresh the claims contained in the ID Token. For example, it's a bad practice to call the endpoint to get a new Access Token every time you call an API. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
:::










An example POST to token URL:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"https://${account.namespace}/mobile\" }"
  }
}
```

### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "authorization_code". |
| `client_id`     | Your application's Client ID. |
| `code_verifier` | The cryptographically-random key that was generated in the first step of this tutorial. |
| `code`          | The `authorization_code` retrieved in the previous step of this tutorial. |
| `redirect_uri`  | The valid callback URL set in your Application settings. This must exactly match the `redirect_uri` passed to the authorization URL in the previous step of this tutorial. |



If all goes well, you'll receive an HTTP 200 response with a payload containing `access_token`, `refresh_token`, `id_token`, and `token_type` values:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```
::: panel-warning
You should validate your [ID Token](/tokens/id-token#validate-an-id-token) and [Access Token](/api-auth/tutorials/verify-access-token) before saving them.
:::

[ID Tokens](/tokens/id-token) contain user information that must be [decoded and extracted](/tokens/id-token#id-token-payload). 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/api-auth/tutorials/verify-access-token).

[Refresh Tokens](/tokens/refresh-token) are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

## Next steps

::: next-steps
[Explore Sample Use Cases](/flows/guides/mobile-login-flow/sample-use-cases) 
:::
