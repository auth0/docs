## Refresh Tokens

You have already received a <dfn data-key="refresh-token">Refresh Token</dfn> if you've been following this tutorial and completed the following:

* configured your API to allow offline access
* included the `offline_access` scope when you initiated the authentication request through the [authorize](/api/authentication/reference#authorize-application) endpoint

You can use the Refresh Token to get a new Access Token. Usually, a user will need a new Access Token only after the previous one expires or when gaining access to a new resource for the first time. It's bad practice to call the endpoint to get a new Access Token every time you call an API, and Auth0 maintains rate limits that will throttle the amount of requests to the endpoint that can be executed using the same token from the same IP.

To refresh your token, make a `POST` request to the `/oauth/token` endpoint in the Authentication API, using `grant_type=refresh_token`.

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
          "value": "refresh_token"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "refresh_token",
          "value": "YOUR_REFRESH_TOKEN"
        }
      ]
    }
}
```

#### Parameters

| Parameter Name  | Description |
|-----------------|-------------|
| `grant_type`    | Set this to "refresh_token". |
| `client_id`     | Your application's Client ID. You can find this value in your [Application Settings](${manage_url}/#/Applications/${account.clientId}/settings). |
| `refresh_token` | The Refresh Token to use. |
| `scope`         | (Optional) A space-delimited list of requested scope permissions. If not sent, the original scopes will be used; otherwise you can request a reduced set of scopes. Note that this must be URL encoded. |

### Response

If all goes well, you'll receive an `HTTP 200` response with a payload containing a new `access_token`, its lifetime in seconds (`expires_in`), granted `scope` values, and `token_type`. If the scope of the initial token included `openid`, then the response will also include a new `id_token`:

```json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

::: warning
You should validate your tokens before saving them. To learn how, see [Validate ID Tokens](/tokens/guides/validate-id-tokens) and [Validate Access Tokens](/tokens/guides/validate-access-tokens).
:::
