# OAuth 2.0

Call these endpoints to generate access tokens.

## Authorize

<h5 class="code-snippet-title">Examples</h5>

```shell
curl "GET http://${account.namespace}/api/authorize"
  -H "Authorization:"
```

```http
GET https://${account.namespace}/authorize
      ?response_type=
      &client_id=
      &connection=
      &redirect_uri=
      &state=
```

```shell
shell
```

```csharp
csharp
```

```javascript
javascript
```

> This request will return a 302 redirect to the login page.

Returns a redirect to the login page of the specified provider (passive authentication).

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `response_type`  | string     | `code` (server-side) or `token` (client -side) |
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of an identity provider configured to your app |
| `redirect_uri`   | URL        | the URL the user will be redirected to upon successful authentication |
| `state`          | string     | provided in the return |

<aside class="warning">
You must configure a <code>callback URL</code> in the management portal for your client application.
</aside>

### Remarks

* If no `connection` is specified, this will redirect to [Auth0 Login Page](${manage_url}/#/login_page) and show the Login widget using the first database connection.
* If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.
* Additional parameters can be sent that will be passed through to the provider, e.g. `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).
* The `state` parameter will be returned and can be used for XSRF and contextual information (like a return url).

### Use Cases

[Social Authentication](#social-authentication)

[Database & Active Directory / LDAP Authentication](#database-amp-active-directory-ldap-authentication)

[Enterprise Authentication (SAML and Others)](#enterprise-authentication-saml-and-others)

[Offline Access (Refresh Tokens)](#offline-access-refresh-tokens)

[Link Accounts](#link-accounts)

### Offline Access (Refresh Tokens)

This endpoint will trigger the login flow to request a refresh token. This will return a 302 redirect to the `connection` specifying an extra scope (`offline_access`) and a `device` id that can be used to identify the refresh token in the dashboard. This extra scope will return the usual response plus a refresh token that can be used to obtain a new JSON Web Token. The refresh token can be [revoked](/api/management/v1#!#delete--api-users--user_id--refresh_tokens--refresh_token-)).


<aside class="notice">
For more information, see: <a href="/refresh-token">Refresh Tokens</a>.
</aside>

#### Additional Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `device`         | string     | an id for identifying the refresh token |
| `scope`          | string     | `openid offline_access` |


## Access Token

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/access_token
Content-Type: 'application/json'
{
  "client_id":    "{client_id}",
  "access_token": "",
  "connection":   "",
  "scope":        "",
  ""
}
```

```shell
ruby
```

```javascript
python
```

```csharp
csharp
```

Given the social provider's `access_token` and the `connection`, this endpoint will authenticate the user with the provider and return a JSON with the `access_token` and an `id_token`. This endpoint only works for Facebook, Google, Twitter and Weibo.

<aside class="notice">
For more information, see: <a href="/tokens/id_token">Auth0 id_token</a>.
</aside>

> This command returns a JSON object in this format:

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `access_token`   | string     | the social provider's `access_token` |
| `connection`     | string     | the name of an identity provider configured to your app |
| `scope`          | string     | `openid` or `openid name email` |

## Resource Owner

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "${account.clientId}",
  "connection":  "",
  "grant_type":  "",
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
  --data '{ "client_id": "${account.clientId}", "connection": "", "grant_type": "", "username": "", "password": "", "scope": "", "id_token": "", "device": "" }'
```

```javascript
python
```

```csharp
csharp
```

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the `access_token` and an `id_token`.

<aside class="notice">
This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS. For more information, see: <a href="/protocols#oauth-resource-owner-password-credentials-grant">OAuth Resource Owner Password Credentials Grant</a>.
</aside>

> This command returns a JSON object in this format:

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your app |
| `connection`     | string     | the name of the AD connection configured to your app |
| `grant_type`     | string     | `password` |
| `username`       | string     | the user's username |
| `password`       | string     | the user's password |
| `scope`         | string     | `openid or openid name email or openid offline_access` |
| `id_token`       | string     |  |
| `device`         | string     |  |

## Token

<h5 class="code-snippet-title">Examples</h5>

```http
`POST https://${account.namespace}/oauth/token`
```

```shell
curl https://${account.namespace}/oauth/token --data "client_id=${account.clientId}&client_secret=${account.clientSecret}&type=web_server&grant_type=client_credentials"
```

```javascript
python
```

```csharp
csharp
```

An `access_token` is required to call the Auth0 API. You can generate one by authenticating with your global `client_id` and `client_secret`. The token will be valid for 24 hours.

<aside class="notice">
For more information, see: <a href="/tokens/access_token">Auth0 access_token</a>.
</aside>

> This command returns a JSON with a body in this format:

```JSON
{
  "access_token": "TOKEN",
  "token_type": "bearer"
}
```

### Query Parameters

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | your global `client_id` |
| `client_secret`  | string     | your global `client_secret` |
| `grant_type`     | string     | `client_credentials` |
| `type`     | string     | `web_server` (optional) |
| `audience`       | string     | the URL of your API endpoint (optional) |
