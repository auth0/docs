# Client Credential Flow
## Get Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

audience=API_IDENTIFIER&grant_type=client_credentials&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'audience=API_IDENTIFIER&grant_type=client_credentials&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     audience: 'API_IDENTIFIER',
     grant_type: 'client_credentials' }
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
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#client-credentials"
}) %>

This is the OAuth 2.0 grant that server processes use to access an API. Use this endpoint to directly request an <dfn data-key="access-token">access token</dfn> by using the application's credentials (a Client ID and a Client Secret).

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Client Credentials use `client_credentials`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |

### Learn More

- [Client Credentials Flow](/flows/concepts/client-credentials)
- [Call API using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
- [Setting up a Client Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)