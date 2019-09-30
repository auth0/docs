## Exchange Token

Now that you have an Access Token for your Source API, you must exchange it for tokens for your Target API. To do so, you will need to `POST` to the [token URL](/api/authentication#on-behalf-of-flow).

### Example POST to token URL

```har
{
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData" : {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "urn:ietf:params:oauth:grant-type:token-exchange"
        },
        {
          "name": "subject_token",
          "value": "SOURCE_API_ACCESS_TOKEN"
        },
        {
          "name": "subject_token_type",
          "value": "urn:ietf:params:oauth:token-type:access_token"
        },
        {
          "name": "client_id",
          "value": "SOURCE_API_CLIENT_ID"
        },
        {
          "name": "client_secret",
          "value": "SOURCE_API_CLIENT_SECRET"
        },
        {
          "name": "audience",
          "value": "TARGET_API_IDENTIFIER"
        },
        {
          "name": "scope",
          "value": "REQUESTED_SCOPES"
        }
      ]
    }
}
```

#### Parameters

| Parameter Name       | Description |
|----------------------|-------------|
| `grant_type`         | Set this to "urn:ietf:params:oauth:grant-type:token-exchange". Note that this must be URL encoded. |
| `subject_token`      | The Access Token issued to the application by the Source API. |
| `subject_token_type` | Set this to "urn:ietf:params:oauth:token-type:access_token". Note that this must be URL encoded. |
| `client_id`          | Your Source API's Client ID. You can find this in the **Client ID** field under **Token Exchange Settings** on your [API's Settings tab](${manage_url}/#/apis). |
| `client_secret`      | Your Source API's Client Secret. You can find this in the **Client Secret** field under **Token Exchange Settings** on your [API's Settings tab](${manage_url}/#/apis). |
| `audience`           | The audience for the token, which is your Target API. You can find this in the **Identifier** field on your [API's settings tab](${manage_url}/#/apis). |
| `scope`              | The [scopes](/scopes) for which you want to request authorization. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, [custom claims](/tokens/jwt-claims#custom-claims) conforming to a [namespaced format](/tokens/concepts/claims-namespacing), or any [scopes supported by the target API](/scopes/current/api-scopes) (e.g., `read:contacts`). Include `openid` to get an ID Token or to be able to use the [/userinfo endpoint](/api/authentication#user-profile) to retrieve profile information for the user. Include `offline_access` to get a Refresh Token (make sure that the __Allow Offline Access__ field is enabled in the [API Settings](${manage_url}/#/apis)). Note that this must be URL encoded. Requested scopes for the token are limited to those selected when adding the Source API/Target API pairing; requesting additional scopes will cause the request to fail. |

### Response

If all goes well, you'll receive an HTTP 200 response with a payload containing `access_token`, `refresh_token`, `id_token`, and `token_type` values:

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
The Access Token’s expiration date will take its value from the **Token Expiration (Seconds)** field for the Target API. The ID Token’s expiration date is fixed to 36,000 seconds (10 hours) and cannot be modified.
:::

::: warning
You should validate your tokens before saving them. To learn how, see [Validate an ID Token](/tokens/guides/id-token/validate-id-token) and [Validate an Access Token](/tokens/guides/access-token/validate-access-token).
:::

[ID Tokens](/tokens/id-tokens) contain user information that must be [decoded and extracted](/tokens/id-tokens#id-token-payload). 

[Access Tokens](/tokens/access-token) are used to call the [Auth0 Authentication API's `/userinfo` endpoint](/api/authentication#get-user-info) or another API. If you are calling your own API, the first thing your API will need to do is [verify the Access Token](/tokens/guides/access-token/validate-access-token).

<dfn data-key="refresh-token">[Refresh Tokens](/tokens/refresh-token)</dfn> are used to obtain a new Access Token or ID Token after the previous one has expired. The `refresh_token` will only be present in the response if you included the `offline_access` scope and enabled __Allow Offline Access__ for your API in the Dashboard.

::: warning
Refresh Tokens must be stored securely since they allow a user to remain authenticated essentially forever.
:::
