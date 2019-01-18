## Request Tokens

Now that you have an Authorization Code, you must exchange it for tokens. Using the extracted Authorization Code (`code`) from the previous step, you will need to `POST` to the [token URL](/api/authentication#authorization-code).

### Example POST to token URL

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"redirect_uri\": \"${account.callback}\"}"
  }
}
```


#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "authorization_code". |
| `code`          | The `authorization_code` retrieved in the previous step of this tutorial. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `client_secret` | Your application's Client Secret. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `redirect_uri`  | The valid callback URL set in your Application settings. This must exactly match the `redirect_uri` passed to the authorization URL in the previous step of this tutorial. |


### Response

If all goes well, you'll receive an HTTP 200 response with a payload containing `access_token`, `refresh_token`, `id_token`, and `token_type` values:

```js
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

::: warning
You should validate your tokens before saving them. To learn how, see [Validate an ID Token](/tokens/id-token#validate-an-id-token) and [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
:::

[ID Tokens](/tokens/id-token) contain user information that must be [decoded and extracted](/tokens/id-token#id-token-payload). 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/api-auth/tutorials/verify-access-token).

[Refresh Tokens](/tokens/refresh-token) are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

::: warning
Refresh Tokens must be stored securely since they allow a user to remain authenticated essentially forever.
:::
