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
  "http_badge": "badge-success",
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


### Test with Postman

<%= include('../../../_includes/_test-with-postman') %>


### Test with Authentication API Debugger

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
  "http_badge": "badge-success",
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


### Test with Authentication API Debugger

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
  "http_badge": "badge-success",
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


### Test with Authentication API Debugger

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
  --url 'https://${account.namespace}/oauth/token' \
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
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password"
}) %>

This is the OAuth 2.0 grant that highly trusted apps utilize in order to access an API. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form in the user-agent (browser). This information is later on sent to the client and Auth0. It is therefore imperative that the client is absolutely trusted with this information.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Resource Owner Password use  `password`. To add realm support use `http://auth0.com/oauth/grant-type/password-realm`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `audience` | The unique identifier of the target API you want to access. |
| `username` <br/><span class="label label-danger">Required</span> | Resource Owner's identifier. |
| `password` <br/><span class="label label-danger">Required</span> | Resource Owner's secret. |
| `scope` | String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace. |
| `realm` | String value of the realm the user belongs. Set this if you want to add realm support at this grant. For more information on what realms are refer to [Realm Support](/api-auth/grant/password#realm-support). |

### Request headers

| Parameter        | Description |
|:-----------------|:------------|
| `auth0-forwarded-for` | End-user IP as a string value. Set this if you want brute-force protection to work in server-side scenarios. For more information on how and when to use this header, refer to [Using resource owner password from server-side](/api-auth/tutorials/using-resource-owner-password-from-server-side). |

### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Password Grant**.


### Remarks

- The scopes issued to the client may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the client in this grant. You can customize the scopes returned in a rule. For more information, refer to [Calling APIs from Highly Trusted Clients](/api-auth/grant/password).
- To add realm support set the `grant_type` to `http://auth0.com/oauth/grant-type/password-realm`, and the `realm` to the realm the user belongs. This maps to a connection in Auth0. For example, if you have configured a database connection for your internal employees and you have named the connection `employees`, then use this value. For more information on how to implement this refer to: [Realm Support](/api-auth/tutorials/password-grant#realm-support).
- In addition to username and password, Auth0 may also require the end-user to provide an additional factor as proof of identity before issuing the requested scopes. In this case, the request described above will return an `mfa_required` error along with an `mfa_token`. You can use these tokens to request a challenge for the possession factor and validate it accordingly. For details refer to [Resource Owner Password and MFA](#resource-owner-password-and-mfa).

### More Information
- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)

## Resource Owner Password and MFA

In addition to username and password, you may also ask your users to provide an additional factor as proof of identity before issuing the requested tokens.

The first step, is to request a challenge based on the challenge types supported by the Client application and the end-user (see next paragraph). This is an optional step, since it is not required if you already know that `otp` is supported.

Next, you have to verify the MFA, using the `/oauth/token` endpoint and the challenge type specified in the first step: an OTP code, a recovery code, or an OOB challenge.

### MFA Challenge Request

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/mfa/challenge
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "mfa_token": "MFA_TOKEN",
  "challenge_type": "oob|otp"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/mfa/challenge' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "challenge_type":"oob otp", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/mfa/challenge',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     challenge_type: 'oob otp',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"otp",
}
```

> RESPONSE SAMPLE FOR OOB WITHOUT BINDING METHOD:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"oob",
  "oob_code": "abcde...dasg"
}
```

> RESPONSE SAMPLE FOR OOB WITH BINDING METHOD:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"oob",
  "binding_method":"prompt",
  "oob_code": "abcde...dasg"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/mfa/challenge",
  "link": "#resource-owner-password-and-mfa"
}) %>

This endpoint lets you request a challenge based on the challenge types supported by the Client application and the end user. The challenge type indicates the channel or mechanism on which to get the challenge and thus prove possession.

For details on the supported challenge types refer to [Multifactor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password).

#### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `mfa_token` <br/><span class="label label-danger">Required</span> | Token got together with `mfa_required` error for Resource Owner Password flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `challenge_type` | A whitespace-separated list of the challenges types accepted by your application. Accepted challenge types are `oob` or `otp`. Excluding this parameter means that your client application accepts all supported challenge types. |

#### Remarks

- If you already know that `otp` is supported by the end-user and you don't want to request a different factor, you can skip this step an go directly to __Verify MFA using OTP__ below.
- This mechanism does not support enrollment, the end-user must be enrolled with the preferred method before being able to execute this flow. Otherwise, you will get a `unsupported_challenge_type` error.
- Auth0 will choose the challenge type based on the types the end user is enrolled with and the ones that the app supports. If your app does not support any of the challenge types the user has enrolled with, an `unsupported_challenge_type` error will be returned.

#### More Information

- [Multifactor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password)
- [Multifactor Authentication in Auth0](/multifactor-authentication)

### Verify MFA using OTP

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-otp",
  "otp": "OTP_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "otp":"OTP_CODE", "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-otp", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     otp: 'OTP_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
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
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password-and-mfa"
}) %>

To verify MFA using an OTP code your app must prompt the user to get the OTP code, and then make a request to `/oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-otp` including the collected OTP code and the `mfa_token` you received as part of `mfa_required` error. The response is going to be the same as the one for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.

#### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token you received from `mfa_required` error. |
| `otp` <br/><span class="label label-danger">Required</span> | OTP Code provided by the user. |


### Verify MFA using an OOB challenge

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-oob",
  "oob_code": "OOB_CODE",
  "binding_code": "BINDING_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "oob_code": "OOB_CODE", "binding_code": "BINDING_CODE", "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-oob", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     oob_code: "OOB_CODE",
     binding_code: "BINDING_CODE"
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR PENDING CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "error":"authorization_pending",
  "error_description":"Authorization pending: please repeat the request in a few seconds."
}
```

> RESPONSE SAMPLE FOR VERIFIED CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

> RESPONSE SAMPLE FOR REJECTED CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "error":"invalid_grant",
  "error_description":"MFA Authorization rejected."
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password-and-mfa"
}) %>

To verify MFA using an OOB challenge (e.g. Push / SMS) your app must make a request to `/oauth/token`
with `grant_type=http://auth0.com/oauth/grant-type/mfa-oob`. Include the `oob_code` you received from the challenge response, as well as the `mfa_token` you received as part of `mfa_required` error.

The response to this request depends on the status of the underlying challenge verification:
- If the challenge has been accepted and verified: it will be the same as for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.
- If the challenge has been rejected, you will get an `invalid_grant` error, meaning that the challenge was rejected by the user. At this point you should stop polling, as this response is final.
- If the challenge verification is still pending (meaning it has not been accepted nor rejected) you will get an `authorization_pending` error, meaning that you must retry the same request a few seconds later. If you request too frequently you will get a `slow_down` error.

When the challenge response includes a `binding_method: prompt` your app needs to prompt the user for the `binding_code` and send it as part of the request. The `binding_code` is a usually a 6 digit number (similar to an OTP) included as part of the challenge.  No `binding_code` is necessary if the challenge response did not include a `binding_method`. In this scenario the response will be immediate; you will receive an `invalid_grant` or an `access_token` as response.

#### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-oob`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token you received from the `mfa_required` error. |
| `oob_code` <br/><span class="label label-danger">Required</span> | The oob code received from the challenge request. |
| `binding_code`| A code used to bind the side channel (used to deliver the challenge) with the main channel you are using to authenticate. This is usually an OTP-like code delivered as part of the challenge message. |

### Verify MFA using a recovery code

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/oauth/token
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code",
  "recovery_code": "RECOVERY_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "recovery_code":"RECOVERY_CODE", "grant_type": "grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code", "client_id": "${account.clientId}", "client_secret": "${account.clientSecret}"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     recovery_code: 'RECOVERY_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-recover-code',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400,
  "recovery_code": "abcdefg"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#resource-owner-password-and-mfa"
}) %>

Some MFA providers (such as Guardian) support using a recovery code to login. This method is supposed to be used to authenticate when the device you enrolled is not available, or you cannot received the challenge or accept it, for instance, due to connectivity issues.

To verify MFA using a recovery code your app must prompt the user for the recovery code, and then make a request to `oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code`. Include the collected recovery code and the `mfa_token` from the `mfa_required` error. If the recovery code is accepted the response will be the same as for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types. It might also include a `recovery_code` field, which the Client application must display to the end-user to be stored securely for future use.

#### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token from the `mfa_required` error. |
| `recovery_code` <br/><span class="label label-danger">Required</span> | Recovery code provided by the end-user. |

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
  "http_badge": "badge-success",
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
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `refresh_token` <br/><span class="label label-danger">Required</span> | The refresh token to use. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the field **Refresh Token** to the refresh token you have. Click **OAuth2 Refresh Token Exchange**.


### More Information

- [Refresh Token](/tokens/preview/refresh-token)
