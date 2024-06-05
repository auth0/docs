# Refresh Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'refresh_token',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     refresh_token: 'YOUR_REFRESH_TOKEN'}
   };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:

```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#refresh-token"
}) %>

Use this endpoint to refresh an <dfn data-key="access-token">Access Token</dfn> using the <dfn data-key="refresh-token">Refresh Token</dfn> you got during authorization.

## Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. To refresh a token, use  `refresh_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. Required when the **Token Endpoint Authentication Method** field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `refresh_token` <br/><span class="label label-danger">Required</span> | The refresh token to use. |
| `scope` | A space-delimited list of requested scope permissions. If not sent, the original scopes will be used; otherwise you can request a reduced set of scopes. Note that this must be URL encoded. |

## Learn More

- [Refresh Tokens](/tokens/concepts/refresh-tokens)
