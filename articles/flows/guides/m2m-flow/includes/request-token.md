## Request Token

 To access your API, you must request an Access Token for it. To do so, you will need to `POST` to the [token URL](https://auth0.com/docs/api/authentication#client-credentials).
 
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
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"audience\": \"YOUR_API_IDENTIFIER\"}"
  }
}
```

 #### Parameters
 
| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "client_credentials". |
| `client_id`     | Your application's Client ID. You can find this value on the [application's settings tab](${manage_url}/#/applications). |
| `client_secret` | Your application's Client Secret. You can find this value on the [application's settings tab](${manage_url}/#/applications). |
| `audience`      | The audience for the token, which is your API. You can find this in the **Identifier** field on your [API's settings tab](${manage_url}/#/apis). |


### Response

 If all goes well, you'll receive an HTTP 200 response with a payload containing `access_token`, `token_type`, and `expires_in` values:
 
 ```json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```


::: warning
You should validate your token before saving it. To learn how, see [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
:::

