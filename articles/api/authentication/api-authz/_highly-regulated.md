# Authorization Code Flow with Enhanced Privacy Protection

## Push Authorization Requests (PAR)

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/oauth/par",
  "link": "##push-authorization-requests-par-"
}) %>

```http
POST ${account.namespace}/oauth/par
Content-Type: 'application/x-www-form-urlencoded'
  audience={https://yourApi/}&
  response_type=code|code id_token&
  client_id={yourClientId}&
  redirect_uri={https://yourApp/callback}&
  state=STATE&
  scope=openid|profile|email&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256&
  nonce=NONCE&
  connection=CONNECTION&
  prompt=login|consent|none&
  organisation=ORGANIZATION
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://{yourDomain}/oauth/par,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    audience: '{https://yourApi/}',
    response_type: 'code|code id_token',
    client_id: '{yourClientId}',
    redirect_uri: '{https://yourApp/callback}',
    state: 'STATE',
    scope: 'openid|profile|email',
    authorization_details: JSON.stringify([{ type: 'my_type' }]),
    code_challenge: 'CODE_CHALLENGE',
    code_challenge_method: 'S256',
    nonce: 'NONCE',
    connection: 'CONNECTION',
    prompt: 'login|consent|none'
    organisation: 'ORGANIZATION'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

```shell
curl --request POST \
  --url 'https://{yourDomain}/oauth/par' \
  --header 'content-type: application/x-www-form-urlencoded' \
--data 'audience={https://yourApi/}response_type=code|code id_token&client_id={yourClientId}&redirect_uri={https://yourApp/callback}&state=STATE&scope=openid|profile|email&authorization_details='[{"type":"my_type"}]'
&code_challenge=CODE_CHALLENGE&code_challenge_method=S256&nonce=NONCE&connection=CONNECTION&prompt=login|consent|none&organisation=ORGANIZATION'

```

> RESPONSE SAMPLE:

``` json
/**
If the request is successful, `/oauth/par` responds with a `JSON` object containing the `request_uri` property, which can be used at the authorization endpoint, and the `expires_in` value, which indicates the number of seconds the `request_uri` is valid. 
*/

HTTP/1.1 201 Created
Content-Type: application/json

{
  "request_uri":
    "urn:ietf:params:oauth:request_uri:6esc_11ACC5bwc014ltc14eY22c",
  "expires_in": 30
}
```

::: note
Highly Regulated Identity is currently available for Enterprise customers under Limited Early Access. To learn more about this program, contact [Auth0 Support](http://support.auth0.com/). 
:::

Authorization Code Flow with [Pushed Authorization Requests (PAR)](/get-started/authentication-and-authorization-flow/authorization-code-flow/authorization-code-flow-with-par) uses the `/oauth/par` endpoint to allow applications to send the authorization parameters usually sent in a `GET` request to `/authorize`. PAR uses a POST method from the backend to keep parameter values secure. The `/oauth/par` endpoint accepts all authorization parameters which can be proivided to `/authorize`. Assuming the call to the `/oauth/par` endpoint is valid, Auth0 will respond with a `redirect_uri` value that can be used as a parameter for the `/authorize` endpoint.

Assuming the call to the `/oauth/par` endpoint is valid, Auth0 will respond with a `redirect_uri` value also used as a parameter for the `/authorize` endpoint. To learn more about configuring PAR, read [Configure Pushed Authorization Requests (PAR)](/get-started/applications/configure-par).

### Request Parameters
| Parameter        | Description |
|:-----------------|:------------|
|`authorization_details`| Requested permissions for each resource. Similar to scopes. To learn more, read [RAR reference documention](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow/authorization-code-flow-with-rar). |
|`audience`| The unique identifier of the target API you want to access. |
| `response_type` <br/><span class="label label-danger">Required</span> | Specifies the token type. We recommend you use `code` to request an authorization code, or code `id_token` to receive an authorization code and a [detached signature](https://openid.net/specs/openid-financial-api-part-2-1_0.html#id-token-as-detached-signature). |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `redirect_uri` <br/><span class="label label-danger">Required</span> | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. Specify the `redirect_uri` under your [Application's Settings](${manage_url}/#/applications).|
| `state` <br/><span class="label label-primary">Recommended</span> | An opaque value the application adds to the initial request that the authorization server includes when redirecting the back to the application. This value must be used by the application to prevent CSRF attacks. |
| `scope` <br/><span class="label label-primary">Recommended</span>| OIDC scopes and custom API scopes. For example: `openid read:timesheets`. Include `offline_access` to get a refresh token.|
| `code_challenge` <br/><span class="label label-primary">Recommended</span> | OIDC scopes and custom API scopes. For example: `openid read:timesheets`. Include `offline_access` to get a refresh token. |
| `code_challenge_method` <br/><span class="label label-primary">Recommended</span> | Method used to generate the challenge. The PKCE specification defines two methods, `S256` and plain, however, Auth0 supports only S256 since the latter is discouraged. [Authorization Code Flow with Proof Key for Code Exchange (PKCE)] (/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce).|
| `nonce` <br/><span class="label label-primary">Recommended</span> | A string value which will be included in the ID token response from Auth0, used to prevent token replay attacks. It is required for `response_type=id_token` token. |
| `connection` | The name of the connection configured to your application. If null, it will redirect to the [Auth0 Login Page](https://${account.namespace}/login) and show the Login Widget using the first database connection. |
| `prompt` | Can be used to force a particular prompt to display, e.g. `prompt=consent` will always display the consent prompt.|
| `organization` | ID of the organization to use when authenticating a user. When not provided, if your application is configured to **Display Organization Prompt**, the user will be able to enter the organization name when authenticating. |

### Remarks
- To make a call to the PAR endpoint, you must:
  - Set the request content type as `application/x-www-form-urlencoded`
  - Use `strings` for all passed parameters
  - Include an additional parameter for application authentication in the request (e.g. `client_secret`, or `client_assertion` and `client_assertion_type` for JSON Web Token Client Authentication, or pass a `client-certificate` and `client-certificate-ca-verified` header when using Mutual TLS).
- Use the `authorization_details` parameter to request permission for each resource. For example, you can specify an array of JSON objects to convey fine-grained information on the authorization. Each JSON object must contain a `type` attribute. The rest is up to you to define.

## Authorize

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/authorize",
  "link": "#redirect-from-par-to-authorize"
}) %>

```http
GET https://{yourDomain}/authorize
  request_uri={yourRequestUri}&
  client_id={yourClientId}
```

After calling the `/oauth/par` endpoint, redirect the end user to the `/authorize` endpoint using a `GET` call.

:::note
The `/authorize` endpoint will respond based on the parameters passed to the `/oauth/par` endpoint. If you request a `response_type`, you should receive an authorization code to use at the `/oauth/token` endpoint.
:::

### Request Parameters
| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `request_uri` <br/><span class="label label-danger">Required</span> | The `request_uri` value that was received from the `/oauth/par` endpoint. |
 
## Exchange an Authorization Code for a Token

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#exchange-an-authorization-code-for-a-token"
}) %>

```http
POST https://{yourDomain}/oauth/par
Content-Type: 'application/x-www-form-urlencoded'
  grant_type=code|code id_token&
  client_id={yourClientId}&
  code=CODE&
 redirect_uri={https://yourApp/callback}&
 code_verifier=CODE_VERIFIER
```

```javascript
curl --request POST \
  --url 'https://{yourDomain}/oauth/par' \
  --header 'content-type: application/x-www-form-urlencoded' \
--data 'grant_type=authorization_code& client_id={yourClientId}& code=CODE&redirect_uri={https://yourApp/callback}&code_verifier=CODE_VERIFIER'
```

```shell
var request = require("request");

var options = { method: 'POST',
  url: 'https://{yourDomain}/oauth/token,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: { 
    grant_type: 'authorization_code',
    client_id: '{yourClientId}',
    code: 'CODE',
    redirect_uri: '{https://yourApp/callback}',
    code_verifier: 'CODE_VERIFIER'
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:
``` json
/**
The `/oauth/token` endpoint will respond with a JSON object containing an `id_token` property, and potentially also a `refresh_token` if one was requested.
*/
HTTP/1.1 200 OK
Content-Type: application/json
{
   "refresh_token":"GEbRxBN...edjnXbL",
    "access_token":"eybRxBN...edjnXZQ",  
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400,
  "authrorization_details":[
    {
      "type":"my_type",
      "other_attributes_of_my_type":"value"}
  ]
},
  
  
```

When users are redirected back to your callback, you need to make a `POST` call to the `oauth/token` endpoint to exchange an authorization code for an access and/or an ID token.

### Request Parameters
| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow. Assuming you have an authorization code from the `/authorize` endpoint, use `authorization_code`. |
| `code` | The authorization code from the initial `/authorize` call. |
| `client_id` <br/><span class="label label-danger">Required</span> | The `client_id` of your application. |
| `request_uri` <br/><span class="label label-danger">Required</span> | This is required only if it was set at the `GET` `/oauth/par` endpoint. The values from `/authorize` must match the value you set at `/oauth/token`. |
| `code_verifier` <br/><span class="label label-primary">Recommended</span> | Cryptographically random key used to generate the `code_challenge` passed to `/oauth/par`. If the `code_challenge` parameter is passed in the call to `/oauth/par`, this is required. |

### Remarks

To make a call to `/oauth/token` endpoint, you must:
- Set the request content type as `application/x-www-form-urlencoded`
- Use `strings` for all passed parameters
- Include an additional parameter for application authentication in the request (e.g. `client_secret`, or `client_assertion` and `client_assertion_type` for JSON Web Token Client Authentication, or pass a `client-certificate` and `client-certificate-ca-verified` header when using Mutual TLS).