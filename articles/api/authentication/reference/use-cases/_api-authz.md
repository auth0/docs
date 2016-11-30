# API Authorization

## Authorize Client

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "audience": "",
  "scope": "",
  "response_type": "",
  "client_id": "${account.client_id}",
  "redirect_uri": "",
  "state": ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"audience": "", "scope": "", "response_type": "", "client_id": "${account.client_id}", "redirect_uri": "", "state": ""}'
```

```javascript

```

To begin an OAuth 2.0 Authorization flow, your Client application should first send the user to the authorization URL.

The purpose of this call is to obtain consent from the user to invoke the Resource Server (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. The Authorization Server will authenticate the user and obtain consent, unless consent has been previously given.

Note that if you alter the value in `scope`, the Authorization Server will require consent to be given again.


**Query Parameters**

Most of the parameters are the same regardless of the OAuth 2.0 flow you are implementing:
- [Authorization Code Grant](/api-auth/grant/authorization-code)
- [Authorization Code Grant using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce): requires the `code_challenge` and `code_challenge_method` parameters.
- [Implicit Grant](/api-auth/grant/implicit): requires the `nonce` parameter

To determine which flow is best suited for your case refer to: [Which OAuth 2.0 flow should I use?
](/api-auth/which-oauth-flow-to-use).

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `audience`       | string     | The target API for which the Client Application is requesting access on behalf of the user. Used for all flows. |
| `scope`          | string     | The scopes which you want to request authorization for. These must be separated by a space. Used for all flows. |
| `response_type`  | string     | Indicates to the Authorization Server which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant Flow, and `token` or `id_token token` for Implicit Grant. This will specify the type of token you will receive at the end of the flow. Used for all flows. |
| `client_id`      | string     | Your application's Client ID. Used for all flows. |
| `state`          | string     | An opaque value the client adds to the initial request that the Authorization Server (Auth0) includes when redirecting the back to the client. Used to prevent CSRF attacks. Used for all flows. |
| `redirect_uri`   | string     | The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. Used for all flows. |
| `code_challenge_method` | Method used to generate the challenge. Used only for [Authorization Code Grant Flow with PKCE](/api-auth/grant/authorization-code-pkce) flow. |
| `code_challenge` | string     | Generated challenge from the `code_verifier`. Used only for [Authorization Code Grant Flow with PKCE](/api-auth/grant/authorization-code-pkce) flow. |
| `nonce` | string  | A string value which will be included in the ID token response from Auth0, used to prevent token replay attacks. Used only for [Implicit Grant Flow](/api-auth/grant/implicit). |


Note the following:
* The [Resource Owner Password Grant](/api-auth/grant/password) and [Client Credentials](/api-auth/grant/client-credentials) are the only OAuth 2.0 flows that do not use this endpoint since there is no user authorization. Instead they invoke directly the `POST /oauth/token` endpoint to retrieve an access token.
* If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.
* Additional parameters can be sent that will be passed through to the provider, e.g. `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).
* The `state` parameter will be returned and can be used for XSRF and contextual information (like a return url).


## Get Tokens

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "client_id": "${account.client_id}",
  "client_secret": "${account.client_secret}",
  "grant_type": "client_credentials",
  "type": "web_server",
  "audience": ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "client_secret":"${account.clientSecret}", "type":"web_server", "grant_type":"client_credentials", "audience": ""}'
```

```javascript

```

An `access_token` is required to call the Auth0 API. You can generate one by authenticating with your global `client_id` and `client_secret`. The token will be valid for 24 hours.

The only OAuth 2.0 flows that can retrieve a refresh token are:
- Authorization Code Grant
- Authorization Code Grant Flow with PKCE
- Resource Owner Password Grant

> This command returns a JSON with a body in this format:

```JSON
{
  "access_token": "TOKEN",
  "token_type": "bearer"
}
```

**Query Parameters**

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | your global `client_id` |
| `client_secret`  | string     | your global `client_secret` |
| `grant_type`     | string     | `client_credentials` |
| `type`     | string     | `web_server` (optional) |
| `audience`       | string     | the URL of your API endpoint (optional) |

## Get Token Info

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/tokeninfo
Content-Type: 'application/json'
{
  "id_token": ""
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/tokeninfo' \
  --header 'content-type: application/json' \
  --data '{"id_token":""}'
```

```javascript

```

::: panel-warning Depreciation Notice
This endpoint will soon be depreciated. The `/userinfo` endpoint should be used instead to obtain user information.
:::

This endpoint validates a JSON Web Token (signature and expiration) and returns the user information associated with the user id `sub` property of the token.

<aside class="notice">
For more information, see: <a href="/user-profile/user-profile-details#api">User Profile: In-Depth Details - API</a>.
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

**Query Parameters**

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `id_token`       | object     | the `id_token` to use |

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
```

::: panel-warning Depreciation Notice
This endpoint will soon be depreciated. The `/oauth/token { grant_type: password }` should be used instead.
:::

Given the user's credentials, this endpoint will authenticate the user with the provider and return a JSON object with the `access_token` and an `id_token`.

<aside class="notice">
This endpoint only works for database connections, passwordless connections, Active Directory/LDAP, Windows Azure AD and ADFS. For more information, see: [Calling APIs from Highly Trusted Clients](/api-auth/grant/password).
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

**Query Parameters**

| Parameter        | Type       | Description |
|:-----------------|:-----------|:------------|
| `client_id`      | string     | the `client_id` of your client |
| `connection`     | string     | the name of the connection configured to your client |
| `grant_type`     | string     | `password` |
| `username`       | string     | the user's username |
| `password`       | string     | the user's password |
| `scope`          | string     | `openid` or `openid profile email` or `openid offline_access` |
| `id_token`       | string     |  |
| `device`         | string     |  |
