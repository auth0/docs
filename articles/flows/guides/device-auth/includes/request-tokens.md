## Request Tokens

Begin polling the token URL to request an Access Token. Using the extracted polling interval (`interval`) from the previous step, you will need to `POST` to the [token URL](/api/authentication#device-auth) sending along the `device_code`.

### Example POST to token URL

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
  "postData": {
    "text": "{\"grant_type\":\"urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code\",\"device_code\": \"YOUR_GENERATED_DEVICE_CODE\", \"client_id\": \"${account.clientId}\" }"
  }
}
```

#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "urn:ietf:params:oauth:grant-type:device_code". This is an extension grant type (as defined by Section 4.5 of [RFC6749]). |
| `device_code`          | The `device_code` retrieved in the previous step of this tutorial. |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |

### Response

While you are waiting for the user to authorize the device, you'll receive an `authorization_pending` error message:

```json
{
  "error": "authorization_pending",
  "error_description": "User has yet to authorize device code."
}
```

Once the user has authorized the device, you'll receive an HTTP 200 response with a payload containing `access_token`, `refresh_token`, and `token_type` values:

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
