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

You have already received a [Refresh Token](/tokens/refresh-token/current) if you've been following this tutorial and completed the following:

* configured your API to allow offline access
* included the `offline_access` scope when you initiated the authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint

You can use the Refresh Token to get a new Access Token. Usually, a user will need a new Access Token only after the previous one expires or when gaining access to a new resource for the first time. It's bad practice to call the endpoint to get a new Access Token every time you call an API, and Auth0 maintains rate limits that will throttle the amount of requests to the endpoint that can be executed using the same token from the same IP.

To refresh your token, make a `POST` request to the `/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

An example POST to token URL:

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/json" }
    ],
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"grant_type\": \"refresh_token\", \"client_id\": \"${account.clientId}\", \"refresh_token\": \"YOUR_REFRESH_TOKEN\" }"
    }
}
```

### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "refresh_token". |
| `client_id`     | Your application's Client ID. |
| `code_verifier` | The cryptographically-random key that was generated in the first step of this tutorial. |
| `code`          | The `authorization_code` retrieved in the previous step of this tutorial. |
| `redirect_uri`  | The valid callback URL set in your Application settings. This must exactly match the `redirect_uri` passed to the authorization URL in the previous step of this tutorial. |
| `refresh_token` | The Refresh Token to use. |



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


If all goes well, you'll receive an HTTP 200 response with a payload containing a new `access_token`, its lifetime in seconds (`expires_in`), `token_type`, and granted `scope` values. If the scope of the initial token included `openid`, then the response will also include a new `id_token`:

```json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

::: panel-warning
You should validate your tokens before saving them.
:::

## Next steps

::: next-steps
[Explore Sample Use Cases](/flows/guides/mobile-login-flow/sample-use-cases) 
:::
