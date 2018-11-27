## Request Token

 To access your API, you must request an Access Token for it. To do so, you will need to `POST` to the [token URL](`https://${account.namespace}/oauth/token`).
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
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"YOUR_CLIENT_SECRET\",\"audience\": \"YOUR_API_IDENTIFIER\"}"
  }
}
```
 ### Parameters
 | Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "client_credentials`". |
| `client_id`     | Your application's Client ID. You can find this value on the [application's settings tab](${manage_url}/#/applications). |
| `client_secret` | Your application's Client Secret. You can find this value on the [application's settings tab](${manage_url}/#/applications). |
| `audience`      | The audience for the token, which is your API. You can find this in the **Identifier** field on your [API's settings tab](${manage_url}/#/apis). |
 If all goes well, you'll receive an HTTP 200 response with a payload containing `access_token`, `token_type`, and `expires_in` values:
 ```json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```
 If you [decode the `access_token` value](https://jwt.io/#debugger-io), you will see that it contains the following claims:
 ```json
{
  "iss": "https://${account.namespace}/",
  "sub": "YOUR_MACHINE_TO_MACHINE_APPLICATION_CLIENT_ID@clients",
  "aud": "YOUR_API_IDENTIFIER",
  "exp": 1489715431, //Unix timestamp of the token's expiration date
  "iat": 1489679431, //Unix timestamp of the token's creation date
  "scope": ""
}
```
