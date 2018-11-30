## Exchange the Authorization Code for an Access Token

Now that you have an authorization code, you can exchange it for an Access Token that will allow you to call the API specified when you authorized the user. Using the extracted Authorization Code (`code`) from the first step, you will need to `POST` to the [Token URL](/api/authentication?http#authorization-code):

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/callback\"}"
  }
}
```

| Parameter | Description |
| --------- | ----------- |
| `grant_type`    | Set this to "authorization_code". |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `client_secret` | Your application's Client Secret. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `code`          | The `authorization_code` retrieved in the previous step of this tutorial. |
| `redirect_uri`  | The valid callback URL set in your Application settings. This must exactly match the `redirect_uri` passed to the authorization URL in the previous step of this tutorial. |

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
