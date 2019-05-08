
## Receive Tokens

While the user has been authenticating and authorizing the device, the device app has continued to poll the token URL to request an Access Token. 

Once the user has suucessfully authorized the device, you'll receive an `HTTP 200` response with a payload containing `access_token`, `refresh_token`, and `token_type` values:

```json
{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "token_type":"Bearer",
  "expires_in":86400
}
```
::: warning
You should validate your tokens before saving them. To learn how, see [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
::: 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/api-auth/tutorials/verify-access-token).

[Refresh Tokens](/tokens/refresh-token) are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

::: warning
Refresh Tokens must be stored securely since they allow a user to remain authenticated essentially forever.
:::
