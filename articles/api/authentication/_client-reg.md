# Dynamic Client Registratioin

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oidc/register
Content-Type: application/json
{
  "client_name": "YOUR-NEW-CLIENT-NAME",
  "redirect_uris": [],
  "token_endpoint_auth_method": "client_secret_post"
}
```

```shell
curl --request POST \
  --url https://${account.namespace}/dbconnections/change_password \
  --header 'content-type: application/json' \
  --data '{"client_id": "${account.clientId}","email": "EMAIL", "password": "", "connection": "CONNECTION"}'
```

> RESPONSE SAMPLE:

```json
HTTP/1.1 201 Created
Content-Type: application/json
{
  "client_name": "My Dynamic Client",
  "client_id": "8SXWY6j3afl2CP5ntwEOpMdPxxy49Gt2",
  "client_secret": "Q5O...33P",
  "redirect_uris": [
    "https://client.example.com/callback",
    "https://client.example.com/callback2"
  ],
  "client_secret_expires_at": 0
}
```

With a name and the necessary callback URLs, you can dynamically register a client with Auth0.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_name`<br/><span class="label label-danger">Required</span> | The name of the Dynamic Client to be created. |
| `redirect_uris`<br/><span class="label label-danger">Required</span> | An array of URLs that Auth0 will deem valid to call at the end of an Authentication flow. |
| `token_endpoint_auth_method` | Default value is `client_secret_post`, but it can also be `none` |