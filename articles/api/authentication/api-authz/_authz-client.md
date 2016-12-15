# Authorize Client

To begin an OAuth 2.0 Authorization flow, your Client application should first send the user to the authorization URL.

The purpose of this call is to obtain consent from the user to invoke the Resource Server (specified in `audience`) to do certain things (specified in `scope`) on behalf of the user. The Authorization Server will authenticate the user and obtain consent, unless consent has been previously given. If you alter the value in `scope`, the Authorization Server will require consent to be given again.

The OAuth 2.0 flows that require user authorization are:
- Authorization Code Grant
- Authorization Code Grant using Proof Key for Code Exchange (PKCE)
- Implicit Grant

On the other hand, the [Resource Owner Password Grant](/api-auth/grant/password) and [Client Credentials](/api-auth/grant/client-credentials) flows do not use this endpoint since there is no user authorization involved. Instead they invoke directly the `POST /oauth/token` endpoint to retrieve an access token.

Note also the following:
* Additional parameters can be sent that will be passed through to the provider, e.g. `access_type=offline` (for Google refresh tokens) , `display=popup` (for Windows Live popup mode).
* The `state` parameter will be returned and can be used for XSRF and contextual information (like a return url).

Based on the OAuth 2.0 flow you are implementing, the parameters slightly change. To determine which flow is best suited for your case refer to: [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use).

## Authorization Code Grant

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=YOUR_SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  connection=YOUR_CONNECTION&
  redirect_uri=http://YOUR_APP_URL/callback&
  state=YOUR_STATE&
  additional-parameter=YOUR_ADDITIONAL_PARAMETERS
```

> RESPONSE SAMPLE

```http
HTTP/1.1 302 Found
Location: https://YOUR_APP_URL/callback?code=RESPONSE_CODE&state=YOUR_STATE
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant"
}) %>

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API.

### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience`       | The target API for which the Client Application is requesting access on behalf of the user. |
| `scope`          | The scopes which you want to request authorization for. These must be separated by a space. |
| `response_type`  | Indicates to the Authorization Server which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant Flow. |
| `client_id`      | Your application's Client ID. |
| `state`          | An opaque value the client adds to the initial request that the Authorization Server (Auth0) includes when redirecting the back to the client. Used to prevent CSRF attacks. |
| `redirect_uri`   | The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. |

### Remarks

- Include `offline_access` to the `scope` request parameter to get a refresh token from [POST /oauth/token](#authorization-code).

### More Information

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Executing an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant)

## Authorization Code Grant (PKCE)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=YOUR_SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=http://YOUR_APP_URL/callback&
  code_challenge=YOUR_CODE_CHALLENGE&
  code_challenge_method=S256
```

> RESPONSE SAMPLE

```http
HTTP/1.1 302 Found
Location: https://YOUR_APP_URL/callback?code=RESPONSE_CODE
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant-pkce-"
}) %>

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API. Before starting with this flow, you need to generate and store a `code_verifier`, and using that, generate a `code_challenge` that will be sent in the authorization request.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience`       | The target API for which the Client Application is requesting access on behalf of the user. |
| `scope`          | The scopes which you want to request authorization for. These must be separated by a space. |
| `response_type`  | Indicates to the Authorization Server which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant (PKCE) Flow. |
| `client_id`      | Your application's Client ID. |
| `redirect_uri`   | The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. |
| `code_challenge_method` | Method used to generate the challenge. The PKCE spec defines two methods, `S256` and `plain`, however, Auth0 supports only `S256` since the latter is discouraged. |
| `code_challenge` | Generated challenge from the `code_verifier`. |


### Remarks

- Include `offline_access` to the `scope` request parameter to get a refresh token from [POST /oauth/token](#authorization-code-pkce-).


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)


## Implicit Grant

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=YOUR_SCOPE&
  response_type=token|id_token token&
  client_id=${account.clientId}&
  redirect_uri=http://YOUR_APP_URL/callback&
  state=YOUR_STATE&
  nonce=YOUR_NONCE
```

> RESPONSE SAMPLE

```http
HTTP/1.1 302 Found
Location: http://YOUR_APP_URL/callback#access_token=TOKEN&state=STATE&token_type=TYPE&expires_in=SECONDS
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#implicit-grant"
}) %>

This is the OAuth 2.0 grant that Client-side web apps utilize in order to access an API.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience`       | The target API for which the Client Application is requesting access on behalf of the user. |
| `scope`          | The scopes which you want to request authorization for. These must be separated by a space. |
| `response_type`  | This will specify the type of token you will receive at the end of the flow. Use `id_token token` to get an `id_token`, or `token` to get both an `id_token` and an `access_token`. |
| `client_id`      | Your application's Client ID. |
| `state`          | An opaque value the client adds to the initial request that the Authorization Server (Auth0) includes when redirecting the back to the client. Used to prevent CSRF attacks. |
| `redirect_uri`   | The URL to which the Authorization Server (Auth0) will redirect the User Agent (Browser) after authorization has been granted by the User. |
| `nonce` | A string value which will be included in the ID token response from Auth0, used to prevent token replay attacks. |


### Remarks

- If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.

- The Implicit Grant does not support the issuance of refresh tokens.


### More Information

- [Calling APIs from Client-side Web Apps](/api-auth/grant/implicit)
- [Executing the Implicit Grant Flow](/api-auth/tutorials/implicit-grant)
