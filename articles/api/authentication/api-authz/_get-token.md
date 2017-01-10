# Get Token

Use this endpoint to:
- Get an `access_token` in order to call an API. You can, optionally, retrieve an `id_token` and a `refresh_token` as well.
- Refresh your access token, using a refresh token you got during authorization.

Note that the only OAuth 2.0 flows that can retrieve a refresh token are:
- [Authorization Code](/api-auth/grant/authorization-code)
- [Authorization Code with PKCE](/api-auth/grant/authorization-code-pkce)
- [Resource Owner Password](/api-auth/grant/password)

## Authorization Code

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "grant_type": "authorization_code",
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": ${account.callback}
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "${account.clientId}","client_secret": "${account.clientSecret}","code": "AUTHORIZATION_CODE","redirect_uri": "${account.callback}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'authorization_code',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}',
     code: 'AUTHORIZATION_CODE',
     redirect_uri: '${account.callback}' },
  json: true };

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
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#authorization-code"
}) %>

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API. Use this endpoint to exchange an Authorization Code for a Token.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Authorization Code use  `authorization_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `code` <br/><span class="label label-danger">Required</span> | The Authorization Code received from the initial `/authorize` call. |
| `redirect_uri`| This is required only if it was set at the [GET /authorize](#authorization-code-grant) endpoint. The values must match. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

If you have just executed the [Authorization Code Grant](#authorization-code-grant) you should already have a code set at the **Authorization Code** field of the *OAuth2 / OIDC* tab. If so, click **OAuth2 Code Exchange**, otherwise follow the instructions.

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from [Authorization Code Grant](#authorization-code-grant). Click **OAuth2 Code Exchange**.


### More Information

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Executing an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant)


## Authorization Code (PKCE)

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "grant_type": "authorization_code",
  "client_id": "${account.clientId}",
  "code_verifier": "CODE_VERIFIER",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "com.myclientapp://myclientapp.com/callback"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "${account.clientId}","code_verifier": "CODE_VERIFIER","code": "AUTHORIZATION_CODE","redirect_uri": "com.myclientapp://myclientapp.com/callback"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"grant_type":"authorization_code","client_id": "${account.clientId}","code_verifier": "CODE_VERIFIER","code": "AUTHORIZATION_CODE","redirect_uri": "com.myclientapp://myclientapp.com/callback", }' };

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
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#authorization-code-pkce-"
}) %>

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API. Use this endpoint to exchange an Authorization Code for a Token.



### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Authorization Code (PKCE) use  `authorization_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `code` <br/><span class="label label-danger">Required</span> | The Authorization Code received from the initial `/authorize` call. |
| `code_verifier` <br/><span class="label label-danger">Required</span> | Cryptographically random key that was used to generate the `code_challenge` passed to `/authorize`. |
| `redirect_uri` | This is required only if it was set at the [GET /authorize](#authorization-code-grant-pkce-) endpoint. The values must match. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

If you have just executed the [Authorization Code Grant (PKCE)](#authorization-code-grant-pkce-) you should already have the **Authorization Code** and **Code Verifier** fields, of the *OAuth2 / OIDC* tab, set. If so, click **OAuth2 Code Exchange**, otherwise follow the instructions.

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from [Authorization Code Grant](#authorization-code-grant-pkce-), and the **Code Verifier** to the key. Click **OAuth2 Code Exchange**.


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)


## Client Credentials

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  audience: "API_IDENTIFIER",
  grant_type: "client_credentials",
  client_id: "${account.clientId}",
  client_secret: "${account.clientSecret}"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"audience":"API_IDENTIFIER", "grant_type":"client_credentials", "client_id":"${account.clientId}", "client_secret":"${account.clientSecret}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}',
     audience: 'API_IDENTIFIER',
     grant_type: 'client_credentials' },
  json: true };

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
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#client-credentials"
}) %>

This is the OAuth 2.0 grant that server processes utilize in order to access an API. Use this endpoint to directly request an `access_token` by using the Client Credentials (a Client Id and a Client Secret).

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Client Credentials use `client_credentials`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 Client Credentials**.


### More Information

- [Calling APIs from a Service](/api-auth/grant/client-credentials)
- [Setting up a Client Credentials Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)


## Resource Owner Password

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "grant_type": "password",
  "username": "USERNAME",
  "password": "PASSWORD",
  "audience": "API_IDENTIFIER",
  "scope": "SCOPE",
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}"
}
```

```shell
curl --request POST \
  --url '${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"password", "username":"USERNAME", "password":"PASSWORD", "audience":"API_IDENTIFIER", "scope":"SCOPE", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"
 }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'password',
     username: 'USERNAME',
     password: 'PASSWORD',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

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
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password"
}) %>

This is the OAuth 2.0 grant that highly trusted apps utilize in order to access an API. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Resource Owner Password use  `password`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/> | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |
| `username` <br/><span class="label label-danger">Required</span> | Resource Owner's identifier. |
| `password` <br/><span class="label label-danger">Required</span> | Resource Owner's secret. |
| `scope` | String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Password Grant**.


### Remarks

- The scopes issued to the client may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.

### More Information

- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)


## Refresh Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "grant_type": "refresh_token",
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "refresh_token": "YOUR_REFRESH_TOKEN"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"refresh_token","client_id": "${account.clientId}","client_secret": "${account.clientSecret}","refresh_token": "YOUR_REFRESH_TOKEN"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'refresh_token',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}',
     refresh_token: 'YOUR_REFRESH_TOKEN'},
  json: true };

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
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#refresh-token"
}) %>

Use this endpoint to refresh an access token, using the refresh token you got during authorization.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. To refresh a token use  `refresh_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `refresh_token` <br/><span class="label label-danger">Required</span> | The refresh token to use. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the field **Refresh Token** to the refresh token you have. Click **OAuth2 Refresh Token Exchange**.


### More Information

- [Refresh Token](/tokens/refresh_token)
