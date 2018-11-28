## Exchange the Authorization Code for an Access Token

You can exchange the Authorization Code for an Access Token that will allow you to call the API specified in your initial authorization call. 

Using the Authorization Code (`code`) from the first step, you will need to `POST` to the [Token URL](/api/authentication?http#authorization-code):

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

| Parameter | Description |
| - | - |
| `grant_type` | This must be `authorization_code`. |
| `client_id` | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. |
| `code` | The Authorization Code received from the initial `authorize` call. |
| `redirect_uri` | The URL must match exactly the `redirect_uri` passed to `/authorize`. |

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
You should validate your tokens before saving them.
:::