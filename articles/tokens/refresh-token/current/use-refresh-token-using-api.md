---
description: How to use a Refresh Token to get a new Access and/or ID Token using the Authentication API
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# How to use a Refresh Token using the Authentication API

If you have a Refresh Token, you can use it to ask for a new Access and/or ID Token, when the ones you have expire.

You can do that either using [one of our SDKS](/tokens/refresh-token#sdk-support) or by making a `POST` request to [the /oauth/token endpoint of Auth0's Authentication API](/api/authentication?http#refresh-token).

In the HTTP request, use `grant_type=refresh_token`, in order to tell Auth0 what you want to do (in this case, refresh your tokens).

## Sample request and response

A sample HTTP request is the following:

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
- `grant_type`: The type of grant to execute (the `/token` endpoint is used for various flows). To refresh a token, use `refresh_token`
- `client_id`: Your application's Client ID
- `client_secret` (optional): Your application's Client Secret. Only required for [confidential applications](/applications/application-types#confidential-applications)
- `refresh_token`: The Refresh Token to use

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

## Rate limits
You should only ask for a new token if the Access Token has expired or you want to refresh the claims contained in the ID Token. It's a bad practice to call the endpoint to get a new Access Token every time you call an API. There are rate limits in Auth0 that will throttle the amount of requests to this endpoint that can be executed using the same token from the same IP.
