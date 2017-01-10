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
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  state=STATE&
  additional-parameter=ADDITIONAL_PARAMETERS
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE&state=STATE
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant"
}) %>

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. Include `offline_access` to get a refresh token. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to the Authorization Server which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-danger">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |

### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `code`) and enable the **Audience** switch.

1. Click **OAuth / OIDC Login**. Following the redirect, the URL will contain the authorization code. Note, that the code will be set at the **Authorization Code** field so you can proceed with exchanging it for an access token.

### Remarks

- Include `offline_access` to the `scope` request parameter to get a refresh token from [POST /oauth/token](#authorization-code). Make sure that the **Allow Offline Access** field is enabled in the [API Settings]($(manage_url)/#/apis).
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).

### More Information

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Executing an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant)
- [Using the State Parameter](/protocols/oauth2/oauth-state)



## Authorization Code Grant (PKCE)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant-pkce-"
}) %>

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API. Before starting with this flow, you need to generate and store a `code_verifier`, and using that, generate a `code_challenge` that will be sent in the authorization request.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. Include `offline_access` to get a refresh token. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to the Authorization Server which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant (PKCE) Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-danger">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `code_challenge_method` <br/><span class="label label-danger">Required</span> | Method used to generate the challenge. The PKCE spec defines two methods, `S256` and `plain`, however, Auth0 supports only `S256` since the latter is discouraged. |
| `code_challenge` <br/><span class="label label-danger">Required</span> | Generated challenge from the `code_verifier`. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `code`) and enable the **Audience** and **PKCE** switches.

1. Click **OAuth / OIDC Login**. Following the redirect, the URL will contain the authorization code. Note, that the code will be set at the **Authorization Code** field, and the **Code Verifier** will be automatically set as well, so you can proceed with exchanging the code for an access token.


### Remarks

- Include `offline_access` to the `scope` request parameter to get a refresh token from [POST /oauth/token](#authorization-code-pkce-). Make sure that the **Allow Offline Access** field is enabled in the [API Settings]($(manage_url)/#/apis).
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)


## Implicit Grant

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=token|id_token token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  state=STATE&
  nonce=NONCE
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}#access_token=TOKEN&state=STATE&token_type=TYPE&expires_in=SECONDS
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#implicit-grant"
}) %>

This is the OAuth 2.0 grant that Client-side web apps utilize in order to access an API.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. |
| `response_type` <br/><span class="label label-danger">Required</span> | This will specify the type of token you will receive at the end of the flow. Use `id_token token` to get an `id_token`, or `token` to get both an `id_token` and an `access_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-danger">Recommended</span> | An opaque value the clients adds to the initial request that the authorization server includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `nonce` <br/><span class="label label-danger">Recommended</span> | A string value which will be included in the ID token response from Auth0, used to prevent token replay attacks. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `token`) and enable the **Audience** switch.

1. Click **OAuth / OIDC Login**.


### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` and `id_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.
- The Implicit Grant does not support the issuance of refresh tokens.


### More Information

- [Calling APIs from Client-side Web Apps](/api-auth/grant/implicit)
- [Executing the Implicit Grant Flow](/api-auth/tutorials/implicit-grant)
- [Using the State Parameter](/protocols/oauth2/oauth-state)
