# Revoke Refresh Token

```http
POST https://${account.namespace}/oauth/revoke
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "token": "YOUR_REFRESH_TOKEN",
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/revoke' \
  --header 'content-type: application/json' \
  --data '{ "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET", "token": "YOUR_REFRESH_TOKEN" }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/revoke',
  headers: { 'content-type': 'application/json' },
  body: 
   { client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
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

Use this endpoint to invalidate a Refresh Token if it has been compromised.

Each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, client, and audience will be revoked**.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. The client should match the one the Refresh Token was issued for. |
| `client_secret` | Your application's Client Secret. Required for [confidential clients](/clients/client-types#confidential-clients). |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

### Remarks

- For non-confidential clients that cannot keep the Client Secret safe (for example, native apps), the endpoint supports passing no Client Secret but the client itself must have the property `tokenEndpointAuthMethod` set to `none`. You can do this either from the UI ([Dashboard > Clients > client Settings](${manage_url}/#/clients/${account.clientId}/settings)) or using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id).

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/revoke](#post-oauth-revoke).

### More Information

- [Refresh Token](/tokens/refresh-token)
