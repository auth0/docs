# Revoke Refresh Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/revoke
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "token": "YOUR_REFRESH_TOKEN",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/revoke' \
  --header 'content-type: application/json' \
  --data '{ "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}", "token": "YOUR_REFRESH_TOKEN" }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/revoke',
  headers: { 'content-type': 'application/json' },
  body: 
   { client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}',
     token: 'YOUR_REFRESH_TOKEN' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:

```JSON
HTTP/1.1 200 OK
(empty-response-body)
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/revoke",
  "link": "#revoke-refresh-token"
}) %>

Since refersh tokens never expire, you need to have a way to invalidate them in case they are compromised or you no longer need them. You can do use using this endpoint.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. The client should match the one the refresh token was issued for. |
| `client_secret` | Your application's Client Secret. Required for [confidential clients](/clients/client-types#confidential-clients). |
| `token` <br/><span class="label label-danger">Required</span> | The refresh token you want to revoke. |

### Remarks

- For non-confidential clients that cannot keep the `client_secret` safe (for example, mobile apps), the endpoint supports passing no `client_secret` but the client itself must have the property `tokenEndpointAuthMethod` set to `none`. You can do this either from the UI ([Dashboard > Clients > client Settings](${manage_url}/#/clients/${account.clientId}/settings)) or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/revoke](#post-oauth-revoke).

### More Information

- [Refresh Token](/tokens/refresh-token)
