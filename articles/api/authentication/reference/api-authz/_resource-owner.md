# Resource Owner

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "connection":  "",
  "grant_type":  "password",
  "username":    "",
  "password":    "",
  "scope":       "",
  "id_token":    "",
  "device":      ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/ro' \
  --header 'accept: application/json' \
  --header 'content-type: application/json' \
  --data '{ "client_id": "${account.clientId}", "connection": "", "grant_type": "password", "username": "", "password": "", "scope": "", "id_token": "", "device": "" }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/ro',
  headers: { 'content-type': 'application/json', 'accept': 'application/json' },
  body:
   { connection: 'CONNECTION',
     grant_type: 'password',
     username: '',
     client_id: '${account.clientId}',
     password: '',
     scope: '',
     id_token: '',
     device: ''},
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

<%= include('../../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#resource-owner"
}) %>

::: panel-warning Deprecation Notice
This endpoint will be deprecated soon. The `/oauth/token { grant_type: password }` should be used instead.
:::

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the `access_token` and an `id_token`.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id`      | the `client_id` of your client |
| `connection`     | the name of the connection configured to your client |
| `grant_type`     | `password` |
| `username`       | the user's username |
| `password`       | the user's password |
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
