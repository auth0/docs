# Get Token

Use this endpoint to get an `access_token` in order to call an API. You can, optionally, retrieve an `id_token` and a `refresh_token` as well.

The only OAuth 2.0 flows that can retrieve a refresh token are:
- [Authorization Code Grant](/api-auth/grant/authorization-code)
- [Authorization Code Grant Flow with PKCE](/api-auth/grant/authorization-code-pkce)
- [Resource Owner Password Grant](/api-auth/grant/password)

## Authorization Code

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "grant_type": "authorization_code",
  "client_id": "${account.client_id}",
  "client_secret": "${account.client_secret}",
  "code": "YOUR_AUTHORIZATION_CODE",
  "redirect_uri": "https://myclientapp.com/callback"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "${account.clientId}","client_secret": "${account.clientSecret}","code": "YOUR_AUTHORIZATION_CODE","redirect_uri": "https://myclientapp.com/callback"}'
```

```javascript
```

> RESPONSE SAMPLE:

```JSON
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type`     | Denotes the flow you are using: `authorization_code`, `client_credentials` or `password`. |
| `client_id`      | Your application's Client ID. |
| `client_secret`  | Your application's Client Secret. |
| `code`  | The Authorization Code received from the initial `/authorize` call. |
| `redirect_uri`  | The URL must match exactly the `redirect_uri` passed to `/authorize`. |


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
  "client_id": "${account.client_id}",
  "code_verifier": "YOUR_GENERATED_CODE_VERIFIER",
  "code": "YOUR_AUTHORIZATION_CODE",
  "redirect_uri": "com.myclientapp://myclientapp.com/callback"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"authorization_code","client_id": "${account.clientId}","code_verifier": "YOUR_GENERATED_CODE_VERIFIER","code": "YOUR_AUTHORIZATION_CODE","redirect_uri": "com.myclientapp://myclientapp.com/callback"}'
```

```javascript
```

> RESPONSE SAMPLE:

```JSON
{
  "access_token": "eyJz93a...k4laUWw",
  "refresh_token": "GEbRxBN...edjnXbL",
  "id_token": "eyJ0XAi...4faeEoQ",
  "token_type": "Bearer"
}
```

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API.



### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type`     | Denotes the flow you are using: `authorization_code`, `client_credentials` or `password`. |
| `client_id`      | Your application's Client ID. |
| `code`  | The Authorization Code received from the initial `/authorize` call. |
| `code_verifier` | Cryptographically random key that was used to generate the `code_challenge` passed to `/authorize`. |
| `redirect_uri`  | The URL must match exactly the `redirect_uri` passed to `/authorize`. |


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)


## Client Credentials

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  audience: "{YOUR_API_IDENTIFIER}",
  grant_type: "client_credentials",
  client_id: "${account.clientId}",
  client_secret: "${account.clientSecret}"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"audience":"{YOUR_API_IDENTIFIER}", "grant_type":"client_credentials", "client_id":"${account.clientId}", "client_secret":"${account.clientSecret}"}'
```

```javascript
```

> RESPONSE SAMPLE:

```JSON
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer"
}
```

This is the OAuth 2.0 grant that server processes utilize in order to access an API.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type`     | Denotes the flow you are using: `authorization_code`, `client_credentials` or `password`. |
| `client_id`      | Your application's Client ID. |
| `client_secret`  | Your application's Client Secret. |
| `audience` | API Identifier that the client is requesting access to. |


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
  "grant_type":"password",
  "username":{RESOURCE_OWNER_USERNAME},
  "password":{RESOURCE_OWNER_PASSWORD},
  "audience":{YOUR_API_IDENTIFIER},
  "scope":{SCOPES},
  "client_id": ${account.clientId}
}
```

```shell
curl --request POST \
  --url '${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"grant_type":"password", "username":{RESOURCE_OWNER_USERNAME}, "password":{RESOURCE_OWNER_PASSWORD}, "audience":{YOUR_API_IDENTIFIER}, "scope":{SCOPES}, "client_id": ${account.clientId}}'
```

```javascript
```

> RESPONSE SAMPLE:

```JSON
{
  "access_token": "eyJz93a...k4laUWw",
  "token_type": "Bearer"
}
```

This is the OAuth 2.0 grant that highly trusted apps utilize in order to access an API. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type`     | Denotes the flow you are using: `authorization_code`, `client_credentials` or `password`. |
| `client_id`      | Your application's Client ID. |
| `audience` | API Identifier that the client is requesting access to. |
| `username` | Resource Owner's identifier. |
| `password` | Resource Owner's secret. |
| `scope` | String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace. |


### More Information

- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
