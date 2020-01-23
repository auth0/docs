# Get Token

Use this endpoint to:
- Get an <dfn data-key="access-token">Access Token</dfn> in order to call an API. Optionally, you can also retrieve an ID Token and a <dfn data-key="refresh-token">Refresh Token</dfn>.
- Refresh your Access Token using a Refresh Token you got during authorization.

Note that the only OAuth 2.0 flows that can retrieve a Refresh Token are:
- [Authorization Code Flow (Authorization Code)](/flows/concepts/auth-code)
- [Authorization Code Flow with PKCE (Authorization Code with PKCE)](/flows/concepts/auth-code-pkce)
- [Resource Owner Password](/api-auth/grant/password)
- [Device Authorization Flow](/flows/concepts/device-auth)
- Token Exchange\*

\* Only for certain native social profiles

## Authorization Code Flow

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'authorization_code',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     code: 'AUTHORIZATION_CODE',
     redirect_uri: '${account.callback}' }
   };

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

This is the flow that regular web apps use to access an API. Use this endpoint to exchange an Authorization Code for a Token.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Authorization Code, use `authorization_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `code` <br/><span class="label label-danger">Required</span> | The Authorization Code received from the initial `/authorize` call. |
| `redirect_uri`| This is required only if it was set at the [GET /authorize](#authorization-code-grant) endpoint. The values must match. |


### Test with Postman

<%= include('../../../_includes/_test-with-postman') %>


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

If you have just executed the [Authorization Code Grant](#authorization-code-grant), you should already have a code set at the **Authorization Code** field of the *OAuth2 / OIDC* tab. If so, click **OAuth2 Code Exchange**; otherwise, follow the instructions.

1. At the *Configuration* tab, set the **Application** field to the application you want to use for the test.

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from the [Authorization Code Grant](#authorization-code-grant). Click **OAuth2 Code Exchange**.


### More Information

- [Authorization Code Flow](/flows/concepts/auth-code)
- [Call API using Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code)


## Authorization Code Flow with PKCE

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&client_id=${account.clientId}&code_verifier=CODE_VERIFIER&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=${account.clientId}&code_verifier=CODE_VERIFIER&code=AUTHORIZATION_CODE&redirect_uri=${account.callback}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    grant_type:"authorization_code",
    client_id: "${account.clientId}",
    code_verifier: "CODE_VERIFIER",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "${account.callback}", } };

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

This is the flow that mobile apps use to access an API. Use this endpoint to exchange an Authorization Code for a Token.


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

1. At the *Configuration* tab, set the **Client** field to the application you want to use for the test.

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, set the field **Authorization Code** to the code you retrieved from [Authorization Code Grant](#authorization-code-grant-pkce-), and the **Code Verifier** to the key. Click **OAuth2 Code Exchange**.


### More Information

- [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
- [Call API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce)


## Client Credentials Flow

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

audience=API_IDENTIFIER&grant_type=client_credentials&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'audience=API_IDENTIFIER&grant_type=client_credentials&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     audience: 'API_IDENTIFIER',
     grant_type: 'client_credentials' }
   };

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

This is the OAuth 2.0 grant that server processes use to access an API. Use this endpoint to directly request an <dfn data-key="access-token">Access Token</dfn> by using the Client's credentials (a Client ID and a Client Secret).

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Client Credentials use `client_credentials`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` <br/><span class="label label-danger">Required</span> | Your application's Client Secret. |
| `audience` <br/><span class="label label-danger">Required</span> | The unique identifier of the target API you want to access. |


### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the application you want to use for the test.

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, click **OAuth2 Client Credentials**.


### More Information

- [Client Credentials Flow](/flows/concepts/client-credentials)
- [Call API using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
- [Setting up a Client Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)


## Resource Owner Password

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=USERNAME&password=PASSWORD&audience=API_IDENTIFIER&scope=SCOPE&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=password&username=USERNAME&password=PASSWORD&audience=API_IDENTIFIER&scope=SCOPE&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET"
 }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'password',
     username: 'USERNAME',
     password: 'PASSWORD',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' }
   };

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

:::warning
This flow should only be used from highly-trusted applications that **cannot do redirects**. If you can use redirect-based flows from your app, we recommend using the [Authorization Code Flow](#regular-web-app-login-flow) instead.
:::

This is the OAuth 2.0 grant that highly-trusted apps use to access an API. In this flow, the end-user is asked to fill in credentials (username/password), typically using an interactive form in the user-agent (browser). This information is sent to the backend and from there to Auth0. It is therefore imperative that the application is absolutely trusted with this information. For [single-page applications and native/mobile apps](/flows/concepts/auth-code-pkce), we recommend using web flows instead.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Resource Owner Password use  `password`. To add realm support use `http://auth0.com/oauth/grant-type/password-realm`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `audience` | The unique identifier of the target API you want to access. |
| `username` <br/><span class="label label-danger">Required</span> | Resource Owner's identifier. |
| `password` <br/><span class="label label-danger">Required</span> | Resource Owner's secret. |
| `scope` | String value of the different <dfn data-key="scope">scopes</dfn> the application is asking for. Multiple scopes are separated with whitespace. |
| `realm` | String value of the realm the user belongs. Set this if you want to add realm support at this grant. For more information on what realms are refer to [Realm Support](/api-auth/grant/password#realm-support). |

### Request headers

| Parameter        | Description |
|:-----------------|:------------|
| `auth0-forwarded-for` | End-user IP as a string value. Set this if you want brute-force protection to work in server-side scenarios. For more information on how and when to use this header, refer to [Using resource owner password from server-side](/api-auth/tutorials/using-resource-owner-password-from-server-side). |

### Test with Authentication API Debugger

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the application you want to use for the test.

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, set the **Username** and **Password**, and click **Password Grant**.


### Remarks

- The <dfn data-key="scope">scopes</dfn> issued to the application may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the application in this grant. You can customize the scopes returned in a rule. For more information, refer to [Calling APIs from Highly Trusted Applications](/api-auth/grant/password).
- To add realm support set the `grant_type` to `http://auth0.com/oauth/grant-type/password-realm`, and the `realm` to the realm the user belongs. This maps to a connection in Auth0. For example, if you have configured a database connection for your internal employees and you have named the connection `employees`, then use this value. For more information on how to implement this refer to: [Realm Support](/api-auth/tutorials/password-grant#realm-support).
- In addition to username and password, Auth0 may also require the end-user to provide an additional factor as proof of identity before issuing the requested scopes. In this case, the request described above will return an `mfa_required` error along with an `mfa_token`. You can use these tokens to request a challenge for the possession factor and validate it accordingly. For details refer to [Resource Owner Password and MFA](#resource-owner-password-and-mfa).

### More Information
- [Calling APIs from Highly-Trusted Applications](/api-auth/grant/password)
- [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
- [Multi-factor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password)

## Device Authorization Flow

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=${account.clientId}&device_code=YOUR_DEVICE_CODE&grant_type=urn:ietf:params:oauth:grant-type:device_code
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${account.clientId}&device_code=YOUR_DEVICE_CODE&grant_type=urn:ietf:params:oauth:grant-type:device_code'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { client_id: '${account.clientId}',
     device_code: 'YOUR_DEVICE_CODE',
     grant_type: 'urn:ietf:params:oauth:grant-type:device_code' }
   };

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
   "access_token": "eyJz93a...k4laUWw",
   "id_token": "eyJ...0NE",
   "refresh_token": "eyJ...MoQ",
   "scope": "...",
   "expires_in": 86400,
   "token_type": "Bearer"
}
```

```JSON
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
 { 
  // Can be retried
  "error": "authorization_pending",
  "error_description": "User has yet to authorize device code."
 }
```

```JSON
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
 { 
  // Can be retried
  "error": "slow_down",
  "error_description": "You are polling faster than the specified interval of 5 seconds."
 }
```

```JSON
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
 { 
    // Cannot be retried; transaction failed
    "error": "access_denied|invalid_grant|...",
    "error_description": "Failure: User cancelled the confirmation prompt or consent page; the code expired; there was an error."
 }
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#device-auth"
}) %>

This is the OAuth 2.0 grant that input-constrained devices use to access an API. Poll this endpoint using the interval returned with your [device code](/api/authentication#get-device-code) to directly request an Access Token using the application's credentials (a Client ID) and a device code.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Device Authorization, use `urn:ietf:params:oauth:grant-type:device_code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `device_code` <br/><span class="label label-danger">Required</span> | The device code previously returned from the [/oauth/device/code endpoint](/api/authentication#device-authorization-flow). |

### Remarks
- Because you will be polling this endpoint (using the `interval` from the initial response to determine frequency) while waiting for the user to go to the verification URL and enter their user code, you will likely receive at least one failure before receiving a successful response. See sample responses for possible responses.

### More Information

- [Device Authorization Flow](/flows/concepts/device-auth)
- [Call API using the Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth)
- [Setting up a Device Code Grant using the Management Dashboard](/api-auth/config/using-the-auth0-dashboard)

## Refresh Token

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=refresh_token&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&refresh_token=YOUR_REFRESH_TOKEN'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'refresh_token',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     refresh_token: 'YOUR_REFRESH_TOKEN'}
   };

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

Use this endpoint to refresh an <dfn data-key="access-token">Access Token</dfn> using the <dfn data-key="refresh-token">Refresh Token</dfn> you got during authorization.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. To refresh a token, use  `refresh_token`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `refresh_token` <br/><span class="label label-danger">Required</span> | The Refresh Token to use. |


### Test this endpoint

<%= include('../../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the **Client** field to the client you want to use for the test.

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Callback URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *OAuth2 / OIDC* tab, set the field **Refresh Token** to the Refresh Token you have. Click **OAuth2 Refresh Token Exchange**.

### More Information

- [Refresh Tokens](/tokens/concepts/refresh-tokens)

## Token Exchange for Native Social

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=SUBJECT_TOKEN&subject_token_type=SUBJECT_TOKEN_TYPE&client_id=${account.clientId}&audience=API_IDENTIFIER&scope=SCOPE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=SUBJECT_TOKEN&subject_token_type=SUBJECT_TOKEN_TYPE&client_id=${account.clientId}&audience=API_IDENTIFIER&scope=SCOPE'
 }'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
     subject_token: 'SUBJECT_TOKEN',
     subject_token_type: 'SUBJECT_TOKEN_TYPE',
     client_id: '${account.clientId}',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
   };

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
  "access_token": "eyJz93a...k4laUWw",
  "id_token": "eyJ...0NE",
  "refresh_token": "eyJ...MoQ",
  "expires_in":86400,
  "token_type":"Bearer"
}
```

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#token-exchange-native-social"
}) %>

:::warning
This flow is intended for use with native social interactions **only**. Use of this flow outside of a native social setting is highly discouraged.
:::

When a non-browser-based solution (such as a mobile platform's SDK) authenticates the user, the authentication will commonly result in artifacts being returned to application code. In such situations, this grant type allows for the Auth0 platform to accept artifacts from trusted sources and issue tokens in response. In this way, apps making use of non-browser-based authentication mechanisms (as are common in native apps) can still retrieve Auth0 tokens without asking for further user interaction.

Artifacts returned by this flow (and the contents thereof) will be determined by the `subject_token_type` and configuration settings of the tenant.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For Token Exchange for Native Social, use `urn:ietf:params:oauth:grant-type:token-exchange`. |
| `subject_token` <br/><span class="label label-danger">Required</span> | Externally-issued identity artifact, representing the user. |
| `subject_token_type` <br/><span class="label label-danger">Required</span> | Identifier that indicates the type of `subject_token`. Currently supported native social values are: `http://auth0.com/oauth/token-type/apple-authz-code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `audience` | The unique identifier of the target API you want to access. |
| `scope` | String value of the different <dfn data-key="scope">scopes</dfn> the application is requesting. Multiple scopes are separated with whitespace. |
| `user_profile` <br/><span class="label label-info">Only For `apple-authz-code`</span>  | Optional element used for native iOS interactions for which profile updates can occur.  Expected parameter value will be JSON in the form of: `{ name: { firstName: 'John', lastName: 'Smith }}` |

### Request headers

| Parameter        | Description |
|:-----------------|:------------|
| `auth0-forwarded-for` | End-user IP as a string value. Set this if you want brute-force protection to work in server-side scenarios. For more information on how and when to use this header, refer to [Using resource owner password from server-side](/api-auth/tutorials/using-resource-owner-password-from-server-side). |

### Remarks

- The <dfn data-key="scope">scopes</dfn> issued to the application may differ from the scopes requested. In this case, a `scope` parameter will be included in the response JSON.
- If you don't request specific scopes, all scopes defined for the audience will be returned due to the implied trust to the application in this grant. You can customize the scopes returned in a rule. For more information, refer to [Calling APIs from Highly Trusted Applications](/api-auth/grant/password).

### More Information
- [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
- [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)

