# Authorize Client

To begin an OAuth 2.0 Authorization flow, your Client application should first send the user to the authorization URL.

The purpose of this call is to obtain consent from the user to invoke the API (specified in `audience`) and do certain things (specified in `scope`) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given. If you alter the value in `scope`, Auth0 will require consent to be given again.

The OAuth 2.0 flows that require user authorization are:
- [Authorization Code Grant](/api-auth/grant/authorization-code)
- [Authorization Code Grant using Proof Key for Code Exchange (PKCE)](/api-auth/grant/authorization-code-pkce)
- [Implicit Grant](/api-auth/grant/implicit)

On the other hand, the [Resource Owner Password Grant](/api-auth/grant/password) and [Client Credentials](/api-auth/grant/client-credentials) flows do not use this endpoint since there is no user authorization involved. Instead they invoke directly the `POST /oauth/token` endpoint to retrieve an Access Token.

Based on the OAuth 2.0 flow you are implementing, the parameters slightly change. To determine which flow is best suited for your case refer to: [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use).

## Authorization Code Grant

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  state=STATE
```

> RESPONSE SAMPLE

```text
HTTP/1.1 302 Found
Location: ${account.callback}?code=AUTHORIZATION_CODE&state=STATE
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant"
}) %>

This is the OAuth 2.0 grant that regular web apps utilize in order to access an API.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims), or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to Auth0 which OAuth 2.0 flow you want to perform. Use `code` for Authorization Code Grant Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that Auth0 includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (see Remarks for more info). |

### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `code`) and enable the **Audience** switch.

1. Click **OAuth / OIDC Login**. Following the redirect, the URL will contain the authorization code. Note, that the code will be set at the **Authorization Code** field so you can proceed with exchanging it for an Access Token.

### Remarks

- In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID Tokens or Access Tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`.
- Include `offline_access` to the `scope` request parameter to get a Refresh Token from [POST /oauth/token](#authorization-code). Make sure that the **Allow Offline Access** field is enabled in the [API Settings](${manage_url}/#/apis).
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. When an Access Token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's SSO session has not expired.

### More Information

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Executing an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant)
- [Using the State Parameter](/protocols/oauth2/oauth-state)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)


## Authorization Code Grant (PKCE)

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
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#authorization-code-grant-pkce-"
}) %>

This is the OAuth 2.0 grant that mobile apps utilize in order to access an API. Before starting with this flow, you need to generate and store a `code_verifier`, and using that, generate a `code_challenge` that will be sent in the authorization request.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). Include `offline_access` to get a Refresh Token. |
| `response_type` <br/><span class="label label-danger">Required</span> | Indicates to Auth0 which OAuth 2.0 Flow you want to perform. Use `code` for Authorization Code Grant (PKCE) Flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that Auth0 includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `code_challenge_method` <br/><span class="label label-danger">Required</span> | Method used to generate the challenge. The PKCE spec defines two methods, `S256` and `plain`, however, Auth0 supports only `S256` since the latter is discouraged. |
| `code_challenge` <br/><span class="label label-danger">Required</span> | Generated challenge from the `code_verifier`. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (see Remarks for more info). |


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `code`) and enable the **Audience** and **PKCE** switches.

1. Click **OAuth / OIDC Login**. Following the redirect, the URL will contain the authorization code. Note, that the code will be set at the **Authorization Code** field, and the **Code Verifier** will be automatically set as well, so you can proceed with exchanging the code for an Access Token.


### Remarks

- In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID Tokens or Access Tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`.
- Include `offline_access` to the `scope` request parameter to get a Refresh Token from [POST /oauth/token](#authorization-code-pkce-). Make sure that the **Allow Offline Access** field is enabled in the [API Settings](${manage_url}/#/apis).
- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. When an Access Token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's SSO session has not expired.


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)


## Implicit Grant

```http
GET https://${account.namespace}/authorize?
  audience=API_IDENTIFIER&
  scope=SCOPE&
  response_type=token|id_token|id_token token&
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
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#implicit-grant"
}) %>

This is the OAuth 2.0 grant that Client-side web apps utilize in order to access an API.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `audience` <br/> | The unique identifier of the target API you want to access. |
| `scope` | The scopes which you want to request authorization for. These must be separated by a space. You can request any of the [standard OIDC scopes](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users, such as `profile` and `email`, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, `read:contacts`). |
| `response_type` <br/><span class="label label-danger">Required</span> | This will specify the type of token you will receive at the end of the flow. Use `token` to get only an `access_token`, `id_token` to get only an `id_token` (if you don't plan on accessing an API), or `id_token token` to get both an `id_token` and an `access_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the clients adds to the initial request that Auth0 includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks. |
| `redirect_uri` | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `nonce` <br/><span class="label label-primary">Recommended</span> | A string value which will be included in the ID Token response from Auth0, [used to prevent token replay attacks](/api-auth/tutorials/nonce). It is required for `response_type=id_token token`. |
| `connection` | The name of the connection configured to your client. |
| `prompt` | To initiate a [silent authentication](/api-auth/tutorials/silent-authentication) request, use `prompt=none` (see Remarks for more info). |


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the fields **Audience** (to the unique identifier of the API you want to access), **Response Type** (set to `token`) and enable the **Audience** switch.

1. Click **OAuth / OIDC Login**.


### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).
- If `response_type=token`, after the user authenticates with the provider, this will redirect them to your application callback URL while passing the `access_token` in the address `location.hash`. This is used for Single Page Apps and on Native Mobile SDKs.
- The Implicit Grant does not support the issuance of Refresh Tokens. You can use [Silent Authentication](/api-auth/tutorials/silent-authentication) instead.
- In order to improve compatibility for client applications, Auth0 will now return profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). This means that in order to add custom claims to ID Tokens or Access Tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace `https://foo.com/` and you want to add a custom claim named `myclaim`, you would name the claim `https://foo.com/myclaim`, instead of `myclaim`.
- Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. When an Access Token has expired, silent authentication can be used to retrieve a new one without user interaction, assuming the user's SSO session has not expired.

### More Information

- [Calling APIs from Client-side Web Apps](/api-auth/grant/implicit)
- [Executing the Implicit Grant Flow](/api-auth/tutorials/implicit-grant)
- [Using the State Parameter](/protocols/oauth2/oauth-state)
- [Mitigate replay attacks when using the Implicit Grant](/api-auth/tutorials/nonce)
- [Silent Authentication](/api-auth/tutorials/silent-authentication)
