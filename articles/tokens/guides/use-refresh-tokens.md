---
title: Use Refresh Tokens
description: Learn how to use a Refresh Token you received during authorization.
topics:
  - access-tokens
  - api-authentication
  - oidc
  - id-tokens
contentType:
  - how-to
useCase:
  - add-login
  - development
---
# Use Refresh Tokens

To exchange the Refresh Token you received during authorization for a new Access Token, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData" : {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "refresh_token"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "client_secret",
          "value": "YOUR_CLIENT_SECRET"
        },
        {
          "name": "refresh_token",
          "value": "YOUR_REFRESH_TOKEN"
        }
      ]
    }
}
```

| Parameter | Description |
| - | - |
| `grant_type` | The type of grant to execute (the `/token` endpoint is used for various grants, for more information refer to the [Authentication API](/api/authentication#get-token)). To refresh a token, use `refresh_token` |
| `client_id` | Your application's Client ID |
| client_secret | Optional. Your application's Client Secret. Only required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications) |
| `refresh_token` | The Refresh Token to use |

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
You should only ask for a new token if the Access Token has expired or you want to refresh the claims contained in the ID Token. For example, it's a bad practice to call the endpoint to get a new Access Token every time you call an API. There are rate limits in Auth0 that will throttle the number of requests to this endpoint that can be executed using the same token from the same IP.
:::

## Keep reading

* [Tokens](/tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [ID Tokens](/tokens/concepts/id-tokens)
* [Get Refresh Tokens](/tokens/guides/get-refresh-tokens)