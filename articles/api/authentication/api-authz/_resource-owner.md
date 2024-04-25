# Resource Owner

```http
POST https://${account.namespace}/oauth/ro
Content-Type: application/json
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
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/ro",
  "link": "#resource-owner"
}) %>

::: warning
This endpoint is part of the legacy authentication pipeline and has been replaced in favor of the [Password Grant](#resource-owner-password). For more information on the latest authentication pipeline refer to [Introducing OIDC Conformant Authentication](/api-auth/intro).
:::

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the <dfn data-key="access-token">Access Token</dfn> and an ID Token.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Application ID. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the connection configured to your application |
| `grant_type` <br/><span class="label label-danger">Required</span> | Use the value `password` |
| `username` <br/><span class="label label-danger">Required</span> | The user's username |
| `password` <br/><span class="label label-danger">Required</span> | The user's password |
| <dfn data-key="scope">`scope`</dfn> | Use `openid` to get an ID Token, `openid profile email` to get an ID Token and the user profile, or `openid offline_access` to get an ID Token and a <dfn data-key="refresh-token">Refresh Token</dfn>. |
| `id_token` | Used to authenticate using a token instead of username/password, in [Touch ID](/libraries/lock-ios/touchid-authentication) scenarios. |
| `device` | You should set this to a string, if you are requesting a Refresh Token (`scope=offline_access`). |

### Remarks

- This endpoint only works for database connections, <dfn data-key="passwordless">passwordless</dfn> connections, Active Directory/LDAP, Windows Azure AD and ADFS.

- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.

- The `email` scope value requests access to the `email` and `email_verified` Claims.

### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).

### Learn More

- [Calling APIs from Highly Trusted Applications](/api-auth/grant/password)
