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

Use this endpoint to invalidate a <dfn data-key="refresh-token">Refresh Token</dfn> if it has been compromised.

The behaviour of this endpoint depends on the state of the [Refresh Token Revocation Deletes Grant](https://auth0.com/docs/tokens/refresh-tokens/revoke-refresh-tokens#refresh-tokens-and-grants) toggle.
If this toggle is enabled, then each revocation request invalidates not only the specific token, but all other tokens based on the same authorization grant. This means that **all Refresh Tokens that have been issued for the same user, application, and <dfn data-key="audience">audience</dfn> will be revoked**.
If this toggle is disabled, then only the refresh token is revoked, while the grant is left intact.

## Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is the application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | The `client_secret` of your application. Required when Client Secret Basic or Client Secret Post is the application authentication method. Specifically required for Regular Web Applications **only**. |
| `token` <br/><span class="label label-danger">Required</span> | The Refresh Token you want to revoke. |

## Remarks

- For non-confidential applications that cannot keep the Client Secret safe (for example, native apps), the endpoint supports passing no Client Secret but the application itself must have the property `tokenEndpointAuthMethod` set to `none`. You can do this either from the UI ([Dashboard > Applications > Application Settings](${manage_url}/#/applications)) or using the [Management API](/api/management/v2#!/Applications/patch_applications_by_id).

## Error Codes

For the complete error code reference for this endpoint, refer to [Errors > POST /oauth/revoke](#post-oauth-revoke).

## Learn More

- [Refresh Tokens](/tokens/concepts/refresh-tokens)