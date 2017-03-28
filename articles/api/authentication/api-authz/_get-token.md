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
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `audience` | The unique identifier of the target API you want to access. |
| `username` <br/><span class="label label-danger">Required</span> | Resource Owner's identifier. |
| `password` <br/><span class="label label-danger">Required</span> | Resource Owner's secret. |
| `scope` | String value of the different scopes the client is asking for. Multiple scopes are separated with whitespace. |
| `realm` | String value of the realm the user belongs. Set this if you want to add realm support at this grant. For more information on what realms are refer to [Realm Support](/api-auth/grant/password#realm-support). |


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the **Callback URL** and set it as part of the **Allowed Callback URLs** of your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings).

1. At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Password Grant**.


### Remarks

- The scopes issued to the client may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the client in this grant. You can customize the scopes returned in a rule. For more information, refer to [Calling APIs from Highly Trusted Clients](/api-auth/grant/password).
- To add realm support set the `grant_type` to `http://auth0.com/oauth/grant-type/password-realm`, and the `realm` to the realm the user belongs. This maps to a connection in Auth0. For example, if you have configured a database connection for your internal employees and you have named the connection `employees`, then use this value. For more information on how to implement this refer to: [Realm Support](/api-auth/tutorials/password-grant#realm-support).

### MFA and Resource Owner Password
Apart from username and password, the authorization server may also require the end-user to provide a possession factor
as proof of identity before issuing the requested scopes. In such case, the request described above
will return `mfa_required` error together with an `mfa_token`. You can use these tokens to request a challenge for possession
factor and validate it accordingly.

> MFA REQUIRED RESPONSE SAMPLE:

```JSON
HTTP/1.1 403 Forbidden
Content-Type: application/json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "eyJ0eXAiOiJKV1QiLCJhbGci....D3QCiQ"
}
```

#### MFA Challenge Request (OPTIONAL)
Based on the previous response the resource owner must provide a possession factor in order to get the
requested scopes. The first step is to request a MFA Challenge, `mfa/challenge` endpoint let you
request a challenge based on the challenge types supported by the client app and the end-user.
The challenge type indicates the channel or mechanism that will be used to get the challenge and so to
prove posession. Supported challenge types are:

a. otp: One time password generated by an app properly setup with a seed or a
token generation hardware. You don't need any extra channel to get the information
needed as proof of possession, you can get it directly from the app / specialized hardware.

a. oob: the proof of possession requires a side channel to succeed, there are many different
channels, example of them are push notification based authenticators and sms based authenticators.
Depending on the channel and the authenticator chosen at the moment of enrollment, you
may need to provide a `binding_code` used to bind the side channel and the channel you
are executing the flow on.

The response to this challenge request depends on the type of challenge issued. We have three different options:
a. OTP Challenge type: for this challenge type your client application must prompt end-user to get an otp
code generated by a propertly setup app and continue the flow on (mfa-otp)[#] grant type.

a. OOB Challenge without binding method (e.g. Push based MFA): in this case the proof of posession will be driven entirely in a side channel
(e.g. push notification based authenticators), the response will include an `oob_code` that your client application
must use it to periodically check for the resolution of the transaction. Continue the flow on (mfa-oob)[#] grant type.

a. OOB Challenge with prompt binding method (e.g. SMS Based MFA): the challenge will be sent through a side channel, your client application
will need to prompt the user for the `binding_code` (that was included as part of the challenge sent) and provide this code
and the `oob_code` got as response for this request to prove possesion.


<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/mfa/challenge
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "client_secret": "${account.clientSecret}",
  "mfa_token": "MFA_TOKEN",
  "challenge_type": "oob otp"
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
  "http_method": "POST",
  "path": "/mfa/challenge",
  "link": "#resource-owner-password"
}) %>

##### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `mfa_token` <br/><span class="label label-danger">Required</span> | Token got together with `mfa_required` error for Resource Owner Password flow. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `challenge_type` | A whitespace separated list of the challenges types accepted by your application. Accepted challenge types are "oob" or "otp". Excluding this parameter means that your client application accepts all supported challenge types.|


NOTE 1: If you already know that `otp` is supported by the end-user and you don't want to request
a different factor, you can skip this step an go directly to (Verifying OTP challenge and getting the tokens step)[#]

NOTE 2: This mechanism does not support enrollment, the end-user must be enrolled with
the preferred method before being able to execute this flow. In such case you will
get the following error:

```JSON
HTTP/1.1 401 Forbidden
Content-Type: application/json
{
  "error": "unsupported_challenge_type",
  "error_description": "User is not enrolled with {provider_name}"
}
```

NOTE 3: The authorization server will choose the resulting challenge type based on the types the end user is enrolled with
and the ones that the app supports. If your app does not support any of the challenge types the user has enrolled with, an
`unsupported_challenge_type` error will be returned.

#### Verify MFA using OTP
To verify MFA using an OTP code your app must prompt the user to get the otp code, and then make a request to `oauth/token`
with `grant_type=http://auth0.com/oauth/grant-type/mfa-otp` including the collected otp code and the `mfa_token` you got as
part of `mfa_required` error. The response is going to be the same as the one for `password` or `http://auth0.com/oauth/grant-type/password-realm`
grant types.

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

##### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token you got from `mfa_required` error. |
| `otp` <br/><span class="label label-danger">Required</span> | OTP Code provided by the user. |

#### Verify MFA using an OOB challenge
To verify MFA using an OOB challenge (e.g. Push / SMS) your app must make a request to `oauth/token`
with `grant_type=http://auth0.com/oauth/grant-type/mfa-oob` including the `oob_code` you got from challenge response and the `mfa_token` you got as
part of `mfa_required` error.
The response to this request depends on the status of the underlying challenge verification:

* If the challenge have been accepted and verified: is going to be the same as the one for `password` or `http://auth0.com/oauth/grant-type/password-realm`
grant types.

* If the challenge has been rejected, you will get an `invalid_grant` error which means that the challenge was rejected by the user. In such case you should stop
polling, this response is final.

* If the challenge verification is still pending (meaning it has not been accepted nor rejected) you will get an `authorization_pending` error, meaning that
you must retry the same request a few seconds later to get the result. If you make too many requests per minute you will end up getting an `slow_down` error meaning that you should slow down your request rate.

When challenge response includes a `binding_method: prompt` your app needs to prompt the user for the `binding_code` and send it as part of the request,
the `binding_code` is a piece of information (usually a 6 digit number similar to an otp) included as part of the challenge sent. This piece of information
must be ommited if challenge response did not included a `binding_method`. In this case the response will be immediate, i.e. you will get an
`invalid_grant` or an access token as response.

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

##### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-oob`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token you got from `mfa_required` error. |
| `oob_code` <br/><span class="label label-danger">Required</span> | The oob code got from challenge request. |
| `binding_code`| A code used to bind the side channel (used to deliver the challenge) with the main channel you are using to authenticate, this is usually an otp-like code delivered as part of the challenge message. |

#### Verify MFA using a recovery code
Some MFA providers (currently only Guardian) support using a recovery code to login. This method is supposed to be used
to authenticate when the device you enrolled is not handy or you cannot get the challenge or accept it.
To verify MFA using a recovery code your app must prompt the user to get the recovery code, and then make a request to `oauth/token`
with `grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code` including the collected recovery code and the `mfa_token` you got as
part of `mfa_required` error. If the recovery code is accepted the response is going to be the same as the one for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types, it might also include a `recovery_code` field, in such case, your
application must show that field to the end-user for him to store securely; the old recovery code will stop working.

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

##### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. Do not set this parameter if your client is not highly trusted (for example, SPA). |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The mfa token you got from `mfa_required` error. |
| `recovery_code` <br/><span class="label label-danger">Required</span> | Recovery code provided by end-user. |

### More Information
- [Calling APIs from Highly Trusted Clients](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
