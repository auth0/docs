---
description: Learn how to request tokens while implementing the mobile login flow.
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
# Request Tokens

Now that you have an Authorization Code, you must exchange it for tokens. Using the Authorization Code (`code`) from the previous step, you will need to `POST` to the [token URL](/api/authentication#authorization-code-pkce-) sending also the `code_verifier`.

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


[ID Tokens](/tokens/id-token) contain user information that must be [decoded and extracted](/tokens/id-token#id-token-payload). 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/api-auth/tutorials/verify-access-token).

[Refresh Tokens](/tokens/refresh-token) are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

## Next steps

::: next-steps
[Explore sample use cases](/api-auth/tutorials/mobile-login-flow/sample-use-cases) 
:::
