---
description: How to get a Refresh Token using the Authentication API
toc: true
topics:
  - tokens
  - refresh-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# How to get a Refresh Token using the Authentication API

To get a Refresh Token, you must include the `offline_access` [scope](/scopes) when you initiate an authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint.

For example, if you are using [Authorization Code Grant](/api-auth/grant/authorization-code), the authentication request would look like the following:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope=offline_access&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state={OPAQUE_VALUE}
```

Once the user authenticates successfully, the application will be redirected to the `redirect_uri`, with a `code` as part of the URL: `${account.callback}?code=BPPLN3Z4qCTvSNOy`. You can exchange this code with an Access Token using the `/oauth/token` endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```

The response should contain an Access Token and a Refresh Token.

```text
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "token_type": "Bearer"
}
```

If you are requesting a Refresh Token for a mobile app using the corresponding Native Client (which is public) then you don't need to send the `client_secret` in the request since it's only needed for [confidential applications](/applications/application-types#confidential-applications).

::: warning
Refresh Tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

For more information on how to implement this using Authorization Code Grant, refer to [Execute an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant). For other grants, refer to [API Authorization](/api-auth).

::: note
If the response did not include a Refresh Token, check that you comply with the [Restrictions](/tokens/refresh-token#restrictions-of-refresh-tokens).
:::
