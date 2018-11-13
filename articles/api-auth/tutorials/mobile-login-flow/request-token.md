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

Now that you have an Authorization Code, you must exchange it for tokens. Using the Authorization Code (`code`) from the previous step, you will need to `POST` to the [Token URL](/api/authentication#authorization-code-pkce-) sending also the `code_verifier`.




# Request tokens when adding login to your app

When adding login to your app, you'll want to make sure you obtain an ID Token.

An example POST to Token URL:

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






For details on the request parameters, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce#4-exchange-the-authorization-code-for-an-access-token).

If all goes well, you'll receive an HTTP 200 response with the following payload:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

::: note
You can use the Access Token to call the [Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info).
:::

## The ID Token

Once you've decoded the ID Token, you can extract user information from it. The JSON payload contains the user claims (attributes), as well as metadata, and it will look something like this:

```json
{
  "name": "John Smith",
  "email": "jsmith@example.com",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
```

For additional details, please see our docs [on the ID Token and its claims](/tokens/id-token#id-token-payload).

::: note
For a list of libraries you can use to verify and decode tokens refer to [JWT.io](https://jwt.io/#libraries-io).
:::

----

# Request tokens when calling an API from your app

When calling an API from your app, you'll want to make sure you obtain an Access Token.


An example POST to Token URL:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"com.myclientapp://myclientapp.com/callback\", }"
  }
}
```

Where:

* `grant_type`: This must be `authorization_code`.
* `client_id`: Your application's Client ID.
* `code_verifier`: Cryptographically random key that was used to generate the `code_challenge` passed to `/authorize`.
* `code`: The Authorization Code received from the initial `authorize` call.
* `redirect_uri`: The URL must match exactly the `redirect_uri` passed to `/authorize`.

The response contains `access_token`, `refresh_token`, `id_token`, and `token_type` values, for example:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

Note that `refresh_token` will only be present in the response if you included the `offline_access` scope AND enabled __Allow Offline Access__ for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see [our documentation](/tokens/refresh-token).

::: warning
The Authorization Code flow with PKCE can only be used for Applications whose type is `Native` in the Dashboard.
:::
