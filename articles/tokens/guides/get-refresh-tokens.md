---
title: Get Refresh Tokens
description: Learn how to get a Refresh Token when you initiate a request using the Authorize endpoint.
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
# Get Refresh Tokens

To get a Refresh Token, you must include the `offline_access` [scope](/scopes) when you initiate an authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint.

For example, if you are using the [Authorization Code Flow](/flows/concepts/auth-code), the authentication request would look like the following:

```text
https://${account.namespace}/authorize?
    audience={API_AUDIENCE}&
    scope=offline_access&
    response_type=code&
    client_id=${account.clientId}&
    redirect_uri=${account.callback}&
    state={OPAQUE_VALUE}
```

The Refresh Token is stored in session. Then, when a session needs to be refreshed (for example, a preconfigured timeframe has passed or the user tries to perform a sensitive operation), the app uses the Refresh Token on the backend to obtain a new ID Token, using the `/oauth/token` endpoint with `grant_type=refresh_token`.

Once the user authenticates successfully, the application will be redirected to the `redirect_uri`, with a `code` as part of the URL: `${account.callback}?code=BPPLN3Z4qCTvSNOy`. You can exchange this code with an Access Token using the `/oauth/token` endpoint.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "authorization_code"
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
        "name": "code",
        "value": "YOUR_AUTHORIZATION_CODE"
      },
      {
        "name": "redirect_uri",
        "value": "${account.callback}"
      }
    ]
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

If you are requesting a Refresh Token for a mobile app using the corresponding Native Client (which is public), then you don't need to send the `client_secret` in the request since it's only required for [confidential applications](/applications/concepts/app-types-confidential-public#confidential-applications).

::: warning
Refresh Tokens must be stored securely by an application since they allow a user to remain authenticated essentially forever.
:::

For more information on how to implement this using the Authorization Code Flow, refer to our tutorial, [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code). For other grants, see [API Authorization](/api-auth).

::: note
If the response did not include a Refresh Token, check that you comply with the [Restrictions](#restrictions-on-refresh-token-usage) listed in this document.
:::

## Keep reading

* [Tokens](/tokens)
* [Refresh Tokens](/tokens/concepts/refresh-tokens)
* [Access Tokens](/tokens/concepts/access-tokens)
* [ID Tokens](/tokens/concepts/id-tokens)
* [Use Refresh Tokens](/tokens/guides/use-refresh-tokens)
* [Revoke Refresh Tokens](tokens/guides/revoke-refresh-tokens)
