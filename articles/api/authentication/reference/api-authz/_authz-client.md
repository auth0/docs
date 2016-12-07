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
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "audience": "API_AUDIENCE",
  "scope": "SCOPE",
  "response_type": "code",
  "client_id": "${account.client_id}",
  "redirect_uri": "CALLBACK_URL",
  "state": "OPAQUE_VALUE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"audience":"API_AUDIENCE","scope":"SCOPE","response_type":"code","client_id": "${account.client_id}","redirect_uri":"CALLBACK_URL","state":"OPAQUE_VALUE"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/authorize',
  headers: { 'content-type': 'application/json' },
  body:
   { audience: 'API_AUDIENCE',
     scope: 'SCOPE',
     response_type: 'code',
     client_id: '${account.client_id}',
     redirect_uri: 'CALLBACK_URL',
     state: 'OPAQUE_VALUE'},
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE

```json
{
  "code": "7bhYf..."
}
```

<%= include('../../../../_includes/_http-method', {
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

### More Information

- [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code)
- [Executing an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant)

## Authorization Code Grant (PKCE)

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "audience": "API_AUDIENCE",
  "scope": "SCOPE",
  "response_type": "code",
  "client_id": "${account.client_id}",
  "code_challenge": "CODE_CHALLENGE",
  "code_challenge_method": "S256",
  "redirect_uri": "CALLBACK_URL"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"audience":"API_AUDIENCE","scope":"SCOPE","response_type":"code","client_id": "${account.client_id}","code_challenge":"CODE_CHALLENGE","code_challenge_method":"S256","redirect_uri":"CALLBACK_URL"}'
```

```javascript

```

> RESPONSE SAMPLE

```json
{
  "code": "7bhYf..."
}
```

<%= include('../../../../_includes/_http-method', {
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


### More Information

- [Calling APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)
- [Executing an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce)


## Implicit Grant

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize
Content-Type: 'application/json'
{
  "audience": "API_AUDIENCE",
  "scope": "SCOPE",
  "response_type": "token OR id_token token",
  "client_id": "${account.client_id}",
  "redirect_uri": "CALLBACK_URL",
  "state": "OPAQUE_VALUE",
  "nonce": "CRYPTOGRAPHIC_NONCE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/authorize' \
  --header 'content-type: application/json' \
  --data '{"audience":"API_AUDIENCE","scope":"SCOPE","response_type":"token OR id_token token","client_id": "${account.client_id}","redirect_uri":"CALLBACK_URL","state":"OPAQUE_VALUE","nonce":"CRYPTOGRAPHIC_NONCE"}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/authorize';
var params = '';
audience=API_AUDIENCE&scope=SCOPE&response_type=RESPONSE_TYPE&client_id= ${account.client_id}&redirect_uri=CALLBACK_URL&state=OPAQUE_VALUE&nonce=CRYPTOGRAPHIC_NONCE

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
  if (xhr.status == 200) {
    fetchProfile();
  } else {
    alert("Request failed: " + xhr.statusText);
  }
};

xhr.send(params);
```

<%= include('../../../../_includes/_http-method', {
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


### More Information

- [Calling APIs from Client-side Web Apps](/api-auth/grant/implicit)
- [Executing the Implicit Grant Flow](/api-auth/tutorials/implicit-grant)
