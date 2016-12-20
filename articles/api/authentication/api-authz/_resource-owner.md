# Resource Owner

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "connection": "CONNECTION",
  "grant_type": "password",
  "username": "USERNAME",
  "password": "PASSWORD",
  "scope": "SCOPE",
  "id_token": "ID_TOKEN",
  "device": "DEVICE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{ "client_id": "${account.clientId}", "connection": "CONNECTION", "grant_type": "password", "username": "USERNAME", "password": "PASSWORD", "scope": "SCOPE", "id_token": "ID_TOKEN", "device": "DEVICE" }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/ro',
  headers: { 'content-type': 'application/json', 'accept': 'application/json' },
  body:
   { connection: 'CONNECTION',
     grant_type: 'PASSWORD',
     username: 'USERNAME',
     client_id: '${account.clientId}',
     password: 'PASSWORD',
     scope: 'SCOPE',
     id_token: 'ID_TOKEN',
     device: 'DEVICE'},
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:

```JSON
{
  "access_token": "eyJz93a...",
  "id_token": "eyJ0XAi...",
  "token_type": "Bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#resource-owner"
}) %>

::: panel-warning Deprecation Notice
This endpoint will be deprecated. Customers will be notified and given ample time to migrate once an official deprecation notice is posted. The `/oauth/token { grant_type: password }` should be used instead.
:::

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the `access_token` and an `id_token`.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client |
| `grant_type`     | Use the value `password` |
| `username`       | The user's username |
| `password`       | The user's password |
| `scope`          | `openid` or `openid profile email` or `openid offline_access` |
| `id_token`       | |
| `device`         | |


### Remarks

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.
- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.
- The `email` scope value requests access to the `email` and `email_verified` Claims.


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).


### More Information

- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
