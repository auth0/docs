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

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the `access_token` and an `id_token`.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `connection` <br/><span class="label label-danger">Required</span> | The name of the connection configured to your client |
| `grant_type` <br/><span class="label label-danger">Required</span> | Use the value `password` |
| `username` <br/><span class="label label-danger">Required</span> | The user's username |
| `password` <br/><span class="label label-danger">Required</span> | The user's password |
| `scope` | Use `openid` to get an `id_token`, `openid profile email` to get an `id_token` and the user profile, or `openid offline_access` to get an `id_token` and a `refresh_token`. |
| `id_token` | Used to authenticate using a token instead of username/password, in [TouchID](/libraries/lock-ios/touchid-authentication) scenarios. |
| `device` | You should set this to a string, if you are requesting a refresh token (`scope=offline_access`). |


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test, and **Connection** to the name of the connection to use.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Resource Owner Endpoint**.


### Remarks

- This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS.
- The `profile` scope value requests access to the End-User's default profile Claims, which are: `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`.
- The `email` scope value requests access to the `email` and `email_verified` Claims.


### Error Codes

For the complete error code reference for this endpoint refer to [Errors > POST /oauth/ro](#post-oauth-ro).


### More Information

- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
